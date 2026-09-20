import type { Route } from "./+types/project-qr";
import { projectSlug, projectTitle, qrSrc } from "../lib/projects";
import { loadProjects } from "../lib/projects.server";

export async function loader({ request, params }: Route.LoaderArgs) {
  const projects = await loadProjects();
  const project = projects.find((candidate) => projectSlug(candidate.name) === params.project);
  if (!project) throw new Response("Project not found", { status: 404 });

  const { origin } = new URL(request.url);
  return {
    name: projectTitle(project.name),
    description: project.description,
    url: `${origin}/hardware/${projectSlug(project.name)}`,
  };
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: loaderData ? `${loaderData.name} — QR` : "Project QR" },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

/** Unlisted, not secret: keep it out of search results too. */
export function headers() {
  return { "X-Robots-Tag": "noindex, nofollow" };
}

export default function ProjectQr({ loaderData }: Route.ComponentProps) {
  const { name, description, url } = loaderData;
  return (
    <main className="hardware-page hw-page qr-single">
      <div className="qr-card qr-card--single">
        <img className="qr-card__code" src={qrSrc(url, 900)} alt={`QR code linking to the weekly log for ${name}`} width="900" height="900" loading="eager" />
        <p className="hw-label qr-card__no">Weekly log</p>
        <h1 className="qr-card__name">{name}</h1>
        {description && <p className="qr-card__blurb">{description}</p>}
        <p className="qr-card__url">{url.replace(/^https?:\/\//, "")}</p>
      </div>
    </main>
  );
}
