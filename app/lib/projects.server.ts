import { PROJECTS_ORGANIZATION, type GitHubRepository, type Project } from "./projects";

const API_ROOT = "https://api.github.com";
const RAW_ROOT = "https://raw.githubusercontent.com";
const CACHE_FOR_MS = 30 * 60 * 1000;
const README_PATHS = ["README.md", "readme.md", ".github/README.md", "docs/README.md"];

const KNOWN_REPOSITORIES = [
  "OpenMove",
  "MOMO-AI-Alzheimers-Companion",
  "FIORA",
  "Aquanav",
  "CubeSat-Deployable-Optical-Baffle",
  "IESA",
  "AURABot",
  "WATCH_WING",
  "SmartRest",
  "InfiniteInferno",
  "ResQmesh",
  "MARS-Modular-Autonomous-Rover-System",
  "Bir_template_repo",
  "BlisterBot--A-LLM-powered-medicine-dispenser",
] as const;

let projectsCache: { expiresAt: number; projects: Project[] } | null = null;

function githubHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "builder-in-residence-showcase",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

function fallbackRepositories(): GitHubRepository[] {
  return KNOWN_REPOSITORIES.map((name) => ({
    name,
    full_name: `${PROJECTS_ORGANIZATION}/${name}`,
    html_url: `https://github.com/${PROJECTS_ORGANIZATION}/${name}`,
    description: null,
    language: null,
    default_branch: "main",
    updated_at: "1970-01-01T00:00:00Z",
    archived: false,
    fork: false,
  }));
}

async function discoverRepositories() {
  try {
    const response = await fetch(`${API_ROOT}/orgs/${PROJECTS_ORGANIZATION}/repos?per_page=100&type=public`, {
      headers: githubHeaders(),
    });
    if (!response.ok) return fallbackRepositories();
    return ((await response.json()) as GitHubRepository[])
      .filter((repository) => !repository.fork)
      .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
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

export async function loadProjects() {
  if (projectsCache && projectsCache.expiresAt > Date.now()) return projectsCache.projects;

  const repositories = await discoverRepositories();
  const projects = await Promise.all(
    repositories.map(async (repository): Promise<Project> => {
      const readme = await loadReadme(repository);
      return {
        ...repository,
        default_branch: readme?.branch ?? repository.default_branch,
        readmeMarkdown: readme?.markdown ?? null,
        readmePath: readme?.path ?? null,
        preview: readme ? readmePreview(readme.markdown) : null,
      };
    }),
  );

  projectsCache = { expiresAt: Date.now() + CACHE_FOR_MS, projects };
  return projects;
}
