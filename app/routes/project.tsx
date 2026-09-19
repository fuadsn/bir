import Markdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Route } from "./+types/project";
import { SiteNav } from "../components/site-nav";
import { formatCommitDate, projectSlug, projectTitle, type Project } from "../lib/projects";
import { loadProjects, loadProjectDocs } from "../lib/projects.server";

export async function loader({ params }: Route.LoaderArgs) {
  const projects = await loadProjects();
  const project = projects.find((candidate) => projectSlug(candidate.name) === params.project);
  if (!project) throw new Response("Project not found", { status: 404 });

  const index = projects.indexOf(project);
  const docs = await loadProjectDocs(project).catch(() => null);
  return {
    project,
    docs: docs ?? { overview: null, weeks: [] },
    docsError: docs ? null : "The weekly log could not be loaded from GitHub just now.",
    number: String(index + 1).padStart(2, "0"),
    next: projects[(index + 1) % projects.length],
  };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [{ title: "Project — Builder in Residence" }];
  const name = projectTitle(loaderData.project.name);
  return [
    { title: `${name} — Builder in Residence` },
    { name: "description", content: loaderData.project.description ?? `The weekly build log for ${name}.` },
  ];
}

/** Rewrites relative links/images in a docs file to the repo they came from. */
function docsUrl(project: Project, base: string, url: string, key: string) {
  const safeUrl = defaultUrlTransform(url);
  if (!safeUrl || /^(?:[a-z]+:|#|\/\/)/i.test(safeUrl)) return safeUrl;
  // A link to a sibling week file is a link to that entry on this page.
  const week = key === "href" ? safeUrl.match(/(?:^|\/)week[-_ ]?(\d+)\.md$/i) : null;
  if (week) return `#week-${week[1].padStart(2, "0")}`;
  const root =
    key === "src"
      ? `https://raw.githubusercontent.com/${project.full_name}/${project.default_branch}/${base}`
      : `${project.html_url}/blob/${project.default_branch}/${base}`;
  return new URL(safeUrl, root).href;
}

function Doc({ project, base, children }: { project: Project; base: string; children: string }) {
  return (
    <div className="project-readme">
      <Markdown remarkPlugins={[remarkGfm]} urlTransform={(url, key) => docsUrl(project, base, url, key)}>
        {children}
      </Markdown>
    </div>
  );
}

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 19 19 5M9 5h10v10" /></svg>;
}

export default function ProjectPage({ loaderData }: Route.ComponentProps) {
  const { project, docs, docsError, number, next } = loaderData;
  const name = projectTitle(project.name);
  const written = docs.weeks.filter((week) => !week.empty).length;
  const updated = formatCommitDate(project.pushed_at);

  return <main className="hardware-page hw-page hw-project">
    <SiteNav current="hardware" />

    <header className="hw-project__head">
      <div className="hw-container">
        <p className="hw-label hw-project__crumb">
          <a href="/hardware#hardware-projects-title">Project index</a>
          <span aria-hidden="true">/</span>
          <span>Build {number}</span>
        </p>
        <h1 className="hw-project__title">{name}</h1>
        {project.description && <p className="hw-lead">{project.description}</p>}

        <dl className="hw-project__meta">
          <div>
            <dt className="hw-label">Status</dt>
            <dd className={`project__status ${project.archived ? "is-archived" : "is-active"}`}>{project.archived ? "Archived" : "Active"}</dd>
          </div>
          <div>
            <dt className="hw-label">Weekly log</dt>
            <dd>{docsError ? "Unavailable" : docs.weeks.length ? `${written} of ${docs.weeks.length} weeks written up` : "Not published yet"}</dd>
          </div>
          {updated && <div><dt className="hw-label">Last commit</dt><dd>{updated}</dd></div>}
          <div>
            <dt className="hw-label">Source</dt>
            <dd><a className="hw-link" href={project.html_url} target="_blank" rel="noreferrer">GitHub <Arrow /></a></dd>
          </div>
        </dl>
      </div>
    </header>

    <section className="hw-section hw-project__log" aria-labelledby="log-title">
      <div className="hw-container">
        <header className="hw-section-head">
          <p className="hw-label">Weekly log</p>
          <h2 className="hw-h2" id="log-title">Nine weeks, written down as they happened.</h2>
        </header>

        {docsError ? (
          <p className="hw-project__empty">
            {docsError} Read it on{" "}
            <a className="hw-link" href={`${project.html_url}/tree/${project.default_branch}/docs`} target="_blank" rel="noreferrer">GitHub</a>{" "}
            in the meantime.
          </p>
        ) : docs.weeks.length === 0 ? (
          <p className="hw-project__empty">
            This project has not published its weekly log yet. It appears here as soon as{" "}
            <a className="hw-link" href={`${project.html_url}/tree/${project.default_branch}/docs`} target="_blank" rel="noreferrer">docs/</a>{" "}
            has its first <span className="hw-mono">week-01.md</span>.
          </p>
        ) : (
          <div className="hw-project__body">
            <nav className="hw-project__weeks" aria-label="Weeks">
              {docs.weeks.map((week) => (
                <a className={`hw-label${week.empty ? " is-empty" : ""}`} key={week.number} href={`#week-${week.number}`}>
                  <span>Week {week.number}</span>
                </a>
              ))}
            </nav>

            <div className="hw-project__entries">
              {docs.weeks.map((week) => (
                <article className={`hw-entry${week.empty ? " hw-entry--empty" : ""}`} id={`week-${week.number}`} key={week.number}>
                  <p className="hw-label hw-entry__no">Week {week.number}</p>
                  <h3 className="hw-entry__title">{week.title}</h3>
                  {week.empty ? (
                    <p className="hw-entry__pending">
                      Not written up yet —{" "}
                      <a className="hw-link" href={`${project.html_url}/blob/${project.default_branch}/${week.path}`} target="_blank" rel="noreferrer">
                        {week.path}
                      </a>{" "}
                      is still the blank template.
                    </p>
                  ) : (
                    <Doc project={project} base="docs/">{week.markdown}</Doc>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>

    <footer className="hw-close">
      <div className="hw-container">
        <div className="hw-close__cta">
          <p className="hw-label">Next build</p>
          <h2 className="hw-h2">{projectTitle(next.name)}</h2>
          <a className="hw-btn hw-btn--inverse" href={`/hardware/${projectSlug(next.name)}`}>Read the log</a>
        </div>
        <p className="hw-label hw-close__doc">
          <span>Doc. BIR-HW-09 · Rev. 2026.1</span>
          <span>TinkerHub · TinkerSpace Kochi</span>
        </p>
      </div>
    </footer>
  </main>;
}
