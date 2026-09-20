import type { Route } from "./+types/qr";
import { projectSlug, projectTitle, qrSrc } from "../lib/projects";
import { loadProjects } from "../lib/projects.server";

export async function loader({ request }: Route.LoaderArgs) {
  const { origin } = new URL(request.url);
  const projects = await loadProjects();
  return {
    cards: projects.map((project, index) => ({
      number: String(index + 1).padStart(2, "0"),
      name: projectTitle(project.name),
      slug: projectSlug(project.name),
      url: `${origin}/hardware/${projectSlug(project.name)}`,
    })),
  };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Weekly log QR codes" }, { name: "robots", content: "noindex, nofollow" }];
}

/** Unlisted, not secret: keep it out of search results too. */
export function headers() {
  return { "X-Robots-Tag": "noindex, nofollow" };
}

export default function QrSheet({ loaderData }: Route.ComponentProps) {
  return (
    <main className="hardware-page hw-page qr-sheet">
      <div className="hw-container">
        <header className="qr-sheet__head">
          <p className="hw-label">Builder in Residence · Hardware</p>
          <h1 className="hw-h2">Scan to read the weekly log</h1>
        </header>

        <ul className="qr-sheet__grid">
          {loaderData.cards.map((card) => (
            <li className="qr-card" key={card.url}>
              <img className="qr-card__code" src={qrSrc(card.url)} alt={`QR code linking to ${card.name}`} width="600" height="600" loading="eager" />
              <p className="hw-label qr-card__no">Build {card.number}</p>
              <h2 className="qr-card__name">{card.name}</h2>
              <p className="qr-card__url">{card.url.replace(/^https?:\/\//, "")}</p>
              <a className="hw-label qr-card__single" href={`/hardware/${card.slug}/qr`}>One per page</a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
