import type { Route } from "./+types/hardware";
import { SiteNav } from "../components/site-nav";
import { ProjectsShowcase } from "../components/projects-showcase";
import type { Project } from "../lib/projects";
import { loadProjects } from "../lib/projects.server";

export async function loader({}: Route.LoaderArgs) {
  try {
    return { projects: await loadProjects(), projectsError: null };
  } catch (error) {
    return {
      projects: [] as Project[],
      projectsError: error instanceof Error ? error.message : "The projects could not be loaded.",
    };
  }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hardware Residency Curriculum — TinkerSpace Kochi" },
    { name: "description", content: "The nine-week Builder in Residence hardware curriculum at TinkerSpace Kochi." },
  ];
}

const curriculum = [
  ["00", "Arrive & connect", "Understand the residency, meet the cohort, and begin shaping the project you will build.", "A first project direction"],
  ["01", "Define the idea", "Learn the role of TinkerHub and TinkerSpace, share an early brief, gather mentor input, and finalise your idea.", "Idea + architecture presentation"],
  ["02", "Architecture review", "Present to domain experts, get technical direction, and learn how to document a replicable project.", "Documented project plan", "Checkpoint 01 · Idea & architecture"],
  ["03", "Start building", "Present to new makers, learn practical electronics workflows, and work deeply enough to find the real problems.", "Build log + problem list"],
  ["04", "Unblock the prototype", "Bring a working fragment, surface pain points, and use the room to rethink, find collaborators, and solve them.", "Demo-ready prototype"],
  ["05", "Show the prototype", "Demo to partners, supporters, and the maker community; share learnings and collect feedback for the next iteration.", "Halfway prototype demo", "Checkpoint 02 · Closed-room prototype demo"],
  ["06", "Finalise the build", "Turn feedback into a final prototype with closed-room mentor support. Learn the basics of PCB design and fabrication.", "Finalised prototype plan"],
  ["07", "Make it physical", "Present the final electronics design, move beyond the breadboard where appropriate, and learn casing and body design.", "PCB/brownboard + enclosure direction"],
  ["08", "Polish & prepare", "Present the near-final project, resolve remaining issues, and prepare the story and video for demo day.", "Final presentation + video demo"],
  ["09", "Demo & celebrate", "Share the finished work publicly, meet partners and the community, and reflect on the growth of the cohort.", "Public demo day", "Checkpoint 03 · Demo day"],
] as const;

export default function Hardware({ loaderData }: Route.ComponentProps) {
  return <main className="hardware-page">
    <SiteNav current="hardware" />
    <section className="curriculum" aria-labelledby="curriculum-title">
      <div className="curriculum-intro">
        <p className="curriculum-kicker">Builder in Residence · Hardware</p>
        <h2 id="curriculum-title">Nine weeks from first sketch to demo day.</h2>
        <p>Sundays are dedicated mentor catch-ups. Maker Thursdays are the weekly community checkpoint, beginning in Week 3.</p>
      </div>
      <ol className="curriculum-grid">
        {curriculum.map(([week, title, focus, deliverable, checkpoint]) => <li className="curriculum-card" key={week}><div className="curriculum-card__top"><span>Week {week}</span>{checkpoint && <b>{checkpoint}</b>}</div><h3>{title}</h3><p>{focus}</p><footer><span>Leave with</span><strong>{deliverable}</strong></footer></li>)}
      </ol>
      <div className="curriculum-extras"><div><p className="curriculum-kicker">Also part of the residency</p><h3>Learn in public. Contribute to the room.</h3></div><ul><li>Introduction to 3D Printing</li><li>Attend a Tinkering With session</li><li>Host a Maker Thursday</li><li>Make a deep-dive video on one component</li></ul></div>
      <div className="curriculum-outcomes"><p className="curriculum-kicker">What you take with you</p><p>A strong portfolio project, practical circuit, firmware, CAD and documentation skills—and a lasting habit of contributing to maker communities.</p></div>
    </section>
    <ProjectsShowcase projects={loaderData.projects} error={loaderData.projectsError} titleId="hardware-projects-title" />
  </main>;
}
