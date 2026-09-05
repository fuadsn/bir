import { PROJECTS_ORGANIZATION, type Project } from "../lib/projects";
import Markdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 19 19 5M9 5h10v10" /></svg>;
}

function projectUrl(project: Project, url: string, key: string) {
  const safeUrl = defaultUrlTransform(url);
  if (!safeUrl || /^(?:[a-z]+:|#|\/\/)/i.test(safeUrl)) return safeUrl;

  const readmePath = project.readmePath ?? "README.md";
  if (key === "src") {
    return new URL(safeUrl, `https://raw.githubusercontent.com/${project.full_name}/${project.default_branch}/${readmePath}`).href;
  }
  return new URL(safeUrl, `${project.html_url}/blob/${project.default_branch}/${readmePath}`).href;
}

export function ProjectsShowcase({ projects, error, titleId = "projects-list-title" }: { projects: Project[]; error: string | null; titleId?: string }) {
  return (
    <section className="projects-showcase" aria-labelledby={titleId}>
      <div className="projects-showcase__heading">
        <p>Explore the work</p>
        <h2 id={titleId}>Every hardware build.<br />The README included.</h2>
      </div>
      {error ? <p className="projects-error">{error} <a href={`https://github.com/orgs/${PROJECTS_ORGANIZATION}/repositories`}>View the projects on GitHub.</a></p> : null}
      <div className="projects-list">
        {projects.map((project, index) => (
          <details className="project" key={project.full_name}>
            <summary>
              <span className="project__number">{String(index + 1).padStart(2, "0")}</span>
              <div className="project__intro">
                <h3>{project.name.replaceAll("-", " ")}</h3>
                <p>{project.description ?? project.preview ?? "Open the project to explore its documentation."}</p>
              </div>
              <div className="project__meta"><span>Hardware project</span><span>{project.archived ? "Archived" : "Active"}</span></div>
              <span className="project__toggle" aria-hidden="true">+</span>
            </summary>
            <div className="project__details">
              <div className="project__details-head"><p>Project documentation</p><a href={project.html_url} target="_blank" rel="noreferrer">Open repository <Arrow /></a></div>
              {project.readmeMarkdown ? <div className="project-readme"><Markdown remarkPlugins={[remarkGfm]} urlTransform={(url, key) => projectUrl(project, url, key)}>{project.readmeMarkdown}</Markdown></div> : <p className="project-readme project-readme--empty">This repository does not have a README yet.</p>}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
