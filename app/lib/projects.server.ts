import { PROJECTS_ORGANIZATION, type GitHubRepository, type Project, type ProjectDocs, type ProjectWeek } from "./projects";

const API_ROOT = "https://api.github.com";
const RAW_ROOT = "https://raw.githubusercontent.com";
const CACHE_FOR_MS = 30 * 60 * 1000;
const README_PATHS = ["README.md", "readme.md", ".github/README.md", "docs/README.md"];

const KNOWN_REPOSITORIES = [
  "OpenMove",
  "MOMO-AI-Alzheimers-Companion",
  "FIORA",
  "AquaNav_",
  "CuBaffle-A-deployable-baffle-for-CubeSats",
  "AURABot",
  "WATCH_WING",
  "InfiniteInferno",
  "ResQmesh",
  "MARS-Modular-Autonomous-Rover-System",
] as const;

// Matched against the repo name with case and separators stripped, by prefix,
// so renames like "IESA" -> "IESA-v2" stay excluded.
const EXCLUDED_REPOSITORIES = ["bir_template_repo", "iesa", "smartrest", "blisterbot", "organizersnotes"];

let projectsCache: { expiresAt: number; projects: Promise<Project[]> } | null = null;

function githubHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "builder-in-residence-showcase",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

function lastCommitAt(repository: GitHubRepository) {
  return Date.parse(repository.pushed_at ?? "") || 0;
}

function isExcluded(repository: GitHubRepository) {
  const name = repository.name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return EXCLUDED_REPOSITORIES.some((excluded) => name.startsWith(excluded.replace(/[^a-z0-9]/g, "")));
}

/**
 * The commits Atom feed is served by github.com, not the REST API, so it still
 * answers when the API budget is spent — enough to rank repos by recency.
 */
async function latestCommitAt(repository: GitHubRepository) {
  try {
    const response = await fetch(`https://github.com/${repository.full_name}/commits/${repository.default_branch}.atom`);
    if (!response.ok) return null;
    return (await response.text()).match(/<updated>([^<]+)<\/updated>/)?.[1] ?? null;
  } catch {
    return null;
  }
}

async function fallbackRepositories(): Promise<GitHubRepository[]> {
  const repositories: GitHubRepository[] = KNOWN_REPOSITORIES.map((name) => ({
    name,
    full_name: `${PROJECTS_ORGANIZATION}/${name}`,
    html_url: `https://github.com/${PROJECTS_ORGANIZATION}/${name}`,
    description: null,
    language: null,
    default_branch: "main",
    pushed_at: null,
    archived: false,
    fork: false,
  }));

  await Promise.all(
    repositories.map(async (repository) => {
      repository.pushed_at = await latestCommitAt(repository);
    }),
  );
  return repositories.sort((a, b) => lastCommitAt(b) - lastCommitAt(a));
}

async function discoverRepositories() {
  try {
    const response = await fetch(`${API_ROOT}/orgs/${PROJECTS_ORGANIZATION}/repos?per_page=100&type=public`, {
      headers: githubHeaders(),
    });
    if (!response.ok) return fallbackRepositories();
    return ((await response.json()) as GitHubRepository[])
      .filter((repository) => !isExcluded(repository))
      .sort((a, b) => lastCommitAt(b) - lastCommitAt(a));
  } catch {
    return fallbackRepositories();
  }
}

async function loadReadme(repository: GitHubRepository) {
  const branches = [...new Set([repository.default_branch, "main", "master"])];
  for (const branch of branches) {
    for (const path of README_PATHS) {
      const response = await fetch(`${RAW_ROOT}/${repository.full_name}/${branch}/${path}`);
      if (response.ok) return { markdown: await response.text(), path, branch };
    }
  }
  return null;
}

function readmePreview(markdown: string) {
  const paragraphs = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter((paragraph) => paragraph && !/^(#|!\[|\[!\[|[-*+]\s|\d+\.\s)/.test(paragraph));
  const preview = paragraphs[0]
    ?.replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .trim();
  if (!preview) return null;
  return preview.length > 320 ? `${preview.slice(0, 317).trimEnd()}…` : preview;
}

async function fetchProjects(): Promise<Project[]> {
  const repositories = await discoverRepositories();
  return Promise.all(
    repositories.map(async (repository): Promise<Project> => {
      const readme = await loadReadme(repository);
      return {
        ...repository,
        default_branch: readme?.branch ?? repository.default_branch,
        readmeMarkdown: readme ? inlineHtmlImages(readme.markdown) : null,
        readmePath: readme?.path ?? null,
        preview: readme ? readmePreview(readme.markdown) : null,
      };
    }),
  );
}

export function loadProjects() {
  if (projectsCache && projectsCache.expiresAt > Date.now()) return projectsCache.projects;

  // Cache the promise, not the result, so requests arriving mid-fetch join this
  // run instead of starting their own.
  const entry = { expiresAt: Date.now() + CACHE_FOR_MS, projects: fetchProjects() };
  projectsCache = entry;
  entry.projects.catch(() => {
    if (projectsCache === entry) projectsCache = null;
  });
  return entry.projects;
}

const docsCache = new Map<string, { expiresAt: number; docs: Promise<ProjectDocs> }>();

/** "# Week 3: Counting pennies" -> title + the body without that heading. */
function splitLeadingHeading(markdown: string) {
  const match = markdown.match(/^\s*#\s+(.+?)\s*$/m);
  if (!match || markdown.slice(0, match.index ?? 0).trim()) return { title: null, body: markdown };
  return { title: match[1].replace(/[*_`]/g, "").trim(), body: markdown.slice((match.index ?? 0) + match[0].length) };
}

/**
 * The docs template ships every week pre-filled with empty scaffolding
 * ("## Links" / "- Code:" / a lone "-"). Drop the placeholders, and the
 * headings left with nothing under them, so unwritten weeks read as unwritten
 * instead of as a wall of empty sections.
 */
const PLACEHOLDER_LINE = [
  /^[-*+]\s*$/, // an empty bullet
  /^[-*+]\s+[\w][\w /&()-]*:\s*$/, // "- Code:" with no value
  /^\*\*[^*]+:\*\*\s*$/, // "**Goal this week:**" with no value
  /^[\w][\w /&()-]*:\s*$/, // "Photos / CAD:" with no value
  /^(tbd|todo|n\/a|-{2,})$/i,
];

/**
 * Residents paste GitHub's raw <img> tags into their logs. react-markdown drops
 * raw HTML, so the photos vanished; pull each run of them out into its own
 * markdown image paragraph instead.
 */
function inlineHtmlImages(markdown: string) {
  return markdown
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/(?:<img\b[^>]*>\s*)+/gi, (run) => {
      const images = [...run.matchAll(/<img\b[^>]*>/gi)].flatMap(([tag]) => {
        const src = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1];
        if (!src) return [];
        const alt = (tag.match(/\balt\s*=\s*["']([^"']*)["']/i)?.[1] ?? "").replace(/[\[\]]/g, "").trim();
        return [`![${alt}](${src})`];
      });
      return images.length ? `\n\n${images.join(" ")}\n\n` : "";
    });
}

function pruneTemplate(source: string) {
  const markdown = inlineHtmlImages(source);
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const kept: string[] = [];
  let heading: string | null = null;
  let headingHasContent = false;
  let inCode = false;

  const flush = () => {
    if (heading && !headingHasContent) kept.splice(kept.lastIndexOf(heading), 1);
    heading = null;
    headingHasContent = false;
  };

  for (const line of lines) {
    if (/^\s*```/.test(line)) inCode = !inCode;
    const text = line.trim();

    if (!inCode && /^#{2,6}\s+/.test(text)) {
      flush();
      heading = line;
      kept.push(line);
      continue;
    }
    if (!inCode && (!text || text === "---" || PLACEHOLDER_LINE.some((pattern) => pattern.test(text)))) {
      if (text && text !== "---") continue; // a placeholder: drop it entirely
      kept.push(line);
      continue;
    }

    kept.push(line);
    if (heading) headingHasContent = true;
  }
  flush();

  return kept
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/(^|\n)(---\s*\n)+/g, "$1")
    .trim();
}

/** docs/week-00.md … docs/week-12.md — the convention the template ships with. */
const WEEK_CANDIDATES = Array.from({ length: 13 }, (_, i) => `week-${String(i).padStart(2, "0")}.md`);
const OVERVIEW_CANDIDATES = ["index.md", "README.md", "readme.md"];

type DocsFile = { name: string; path: string; markdown: string };

async function readRaw(project: Project, path: string) {
  const response = await fetch(`${RAW_ROOT}/${project.full_name}/${project.default_branch}/${path}`);
  return response.ok ? response.text() : null;
}

/** Preferred: ask the API what is actually in docs/, so odd file names still work. */
async function listViaApi(project: Project): Promise<DocsFile[] | null> {
  const response = await fetch(`${API_ROOT}/repos/${project.full_name}/contents/docs?ref=${project.default_branch}`, {
    headers: githubHeaders(),
  });
  if (response.status === 404) return [];
  if (!response.ok) return null; // rate limited or down — fall back to raw

  const entries = (await response.json()) as Array<{ name: string; type: string; path: string; download_url: string | null }>;
  if (!Array.isArray(entries)) return null;

  const wanted = entries.filter((entry) => entry.type === "file" && entry.name.toLowerCase().endsWith(".md"));

  const files = await Promise.all(
    wanted.map(async (entry): Promise<DocsFile[]> => {
      const body = entry.download_url ? await fetch(entry.download_url).then((r) => (r.ok ? r.text() : null)) : await readRaw(project, entry.path);
      return body === null ? [] : [{ name: entry.name, path: entry.path, markdown: body }];
    }),
  );
  return files.flat();
}

/** Fallback: probe the known file names straight off raw.githubusercontent.com. */
async function listViaRaw(project: Project): Promise<DocsFile[]> {
  const names = [...OVERVIEW_CANDIDATES, ...WEEK_CANDIDATES];
  const files = await Promise.all(
    names.map(async (name): Promise<DocsFile[]> => {
      const path = `docs/${name}`;
      const markdown = await readRaw(project, path);
      return markdown === null ? [] : [{ name, path, markdown }];
    }),
  );
  return files.flat();
}

async function fetchDocs(project: Project): Promise<ProjectDocs> {
  const files = (await listViaApi(project)) ?? (await listViaRaw(project));

  const overviewFile = files.find((file) => /^(index|readme)\.md$/i.test(file.name));
  const weekFiles = files
    .filter((file) => /^week[-_ ]?\d+\.md$/i.test(file.name))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  const weeks = weekFiles.map((file): ProjectWeek => {
    const number = file.name.match(/(\d+)/)?.[1].padStart(2, "0") ?? "";
    const { title, body } = splitLeadingHeading(file.markdown);
    // "Week 3: Counting pennies" -> "Counting pennies"; the number is already a label.
    const trimmed = title?.replace(/^week\s*0*\d+\s*[:—–-]\s*/i, "").trim();
    const markdown = pruneTemplate(body);
    return {
      number,
      title: trimmed || title || `Week ${number}`,
      markdown,
      path: file.path,
      empty: markdown === "",
    };
  });

  return {
    overview: overviewFile
      ? { markdown: pruneTemplate(splitLeadingHeading(overviewFile.markdown).body), path: overviewFile.path }
      : null,
    weeks,
  };
}

export function loadProjectDocs(project: Project) {
  const cached = docsCache.get(project.full_name);
  if (cached && cached.expiresAt > Date.now()) return cached.docs;

  const entry = { expiresAt: Date.now() + CACHE_FOR_MS, docs: fetchDocs(project) };
  docsCache.set(project.full_name, entry);
  entry.docs.catch(() => {
    if (docsCache.get(project.full_name) === entry) docsCache.delete(project.full_name);
  });
  return entry.docs;
}
