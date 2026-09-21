import type { Route } from "./+types/hardware";
import { SiteNav } from "../components/site-nav";
import { ProjectsShowcase } from "../components/projects-showcase";
import type { Project } from "../lib/projects";
import { loadProjects } from "../lib/projects.server";
import { builders, media, mentors, type Person } from "../lib/people";

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

type Week = { week: string; title: string; focus: string; deliverable: string; checkpoint?: string };

const phases: Array<{ id: string; label: string; title: string; note: string; weeks: Week[] }> = [
  {
    id: "define",
    label: "Phase A",
    title: "Define",
    note: "Arrive, find the idea, and defend an architecture you can actually build.",
    weeks: [
      { week: "00", title: "Arrive & connect", focus: "Understand the residency, meet the cohort, and begin shaping the project you will build.", deliverable: "A first project direction" },
      { week: "01", title: "Define the idea", focus: "Learn the role of TinkerHub and TinkerSpace, share an early brief, gather mentor input, and finalise your idea.", deliverable: "Idea + architecture presentation" },
      { week: "02", title: "Architecture review", focus: "Present to domain experts, get technical direction, and learn how to document a replicable project.", deliverable: "Documented project plan", checkpoint: "Checkpoint 01 · Idea & architecture" },
    ],
  },
  {
    id: "build",
    label: "Phase B",
    title: "Build",
    note: "Get to a prototype, break it in public, and rebuild it with the room's help.",
    weeks: [
      { week: "03", title: "Start building", focus: "Present to new makers, learn practical electronics workflows, and work deeply enough to find the real problems.", deliverable: "Build log + problem list" },
      { week: "04", title: "Unblock the prototype", focus: "Bring a working fragment, surface pain points, and use the room to rethink, find collaborators, and solve them.", deliverable: "Demo-ready prototype" },
      { week: "05", title: "Show the prototype", focus: "Demo to partners, supporters, and the maker community; share learnings and collect feedback for the next iteration.", deliverable: "Halfway prototype demo", checkpoint: "Checkpoint 02 · Closed-room demo" },
    ],
  },
  {
    id: "ship",
    label: "Phase C",
    title: "Ship",
    note: "Move off the breadboard, give the build a body, and put it in front of people.",
    weeks: [
      { week: "06", title: "Finalise the build", focus: "Turn feedback into a final prototype with closed-room mentor support. Learn the basics of PCB design and fabrication.", deliverable: "Finalised prototype plan" },
      { week: "07", title: "Make it physical", focus: "Present the final electronics design, move beyond the breadboard where appropriate, and learn casing and body design.", deliverable: "PCB/brownboard + enclosure" },
      { week: "08", title: "Polish & prepare", focus: "Present the near-final project, resolve remaining issues, and prepare the story and video for demo day.", deliverable: "Final presentation + video" },
      { week: "09", title: "Demo & celebrate", focus: "Share the finished work publicly, meet partners and the community, and reflect on the growth of the cohort.", deliverable: "Public demo day", checkpoint: "Checkpoint 03 · Demo day" },
    ],
  },
];

const inPublic: Array<[string, string]> = [
  ["Introduction to 3D printing", "A working session on the machines in the space, so the enclosure is not the thing that stops you."],
  ["Attend a Tinkering With session", "Sit in on someone else's build and learn how they debug it."],
  ["Host a Maker Thursday", "Run the weekly community checkpoint once. Teach what you just learned."],
  ["Make a deep-dive video", "Pick one component, take it apart, and explain it to everyone who comes next."],
];

type Org = { name: string; href: string; logo: string; width: number; height: number; showName?: boolean };

const partner: Org = { name: "Circuit Digest", href: "https://circuitdigest.com", logo: "/sponsors/circuit-digest.webp", width: 832, height: 240 };

const organisers: Org[] = [
  { name: "MakerGram", href: "https://makergram.com", logo: "/sponsors/makergram.webp", width: 560, height: 501 },
  // The mark has no wordmark, so the name is printed beside it.
  { name: "TinkerSpace", href: "https://tinkerhub.org", logo: "/sponsors/tinkerspace.png", width: 109, height: 111, showName: true },
];

function OrgCard({ org, lead = false }: { org: Org; lead?: boolean }) {
  return (
    <a className={`hw-sponsors__card${lead ? " hw-sponsors__card--lead" : ""}`} href={org.href} target="_blank" rel="noreferrer">
      <img src={org.logo} alt={org.showName ? "" : org.name} width={org.width} height={org.height} loading="lazy" />
      {org.showName && <span>{org.name}</span>}
    </a>
  );
}

function People({ people, dense = false }: { people: Person[]; dense?: boolean }) {
  return (
    <ul className={`hw-people${dense ? " hw-people--dense" : ""}`}>
      {people.map((person) => (
        <li key={person.name}>
          <img src={person.photo} alt={person.name} width="720" height="900" loading="lazy" />
          <p>{person.name}</p>
        </li>
      ))}
    </ul>
  );
}

export default function Hardware({ loaderData }: Route.ComponentProps) {
  return <main className="hardware-page hw-page">
    <SiteNav current="hardware" />

    <section className="hw-hero">
      <div className="hw-hero__copy">
        <p className="hw-label hw-hero__doc"><span>Doc. BIR-HW-09</span><span>Rev. 2026.1</span></p>
        <h1 className="hw-hero__title">Hardware<br />Residency</h1>
        <p className="hw-lead">A nine-week in-residence programme at TinkerSpace Kochi for people who build things that plug in, move, sense and ship.</p>
        <div className="hw-hero__actions">
          <a className="hw-btn" href="#schedule">Read the nine-week schedule</a>
          <a className="hw-btn hw-btn--secondary" href="#hardware-projects-title">See what got built</a>
        </div>
      </div>
      <figure className="hw-hero__art">
        <img src="/hardware-board.webp" alt="Isometric blueprint drawing of a development board, annotated with its GPIO interface, mounting holes, MCU core and an 86 mm overall dimension" width="1160" height="900" />
      </figure>
    </section>

    <section className="hw-section hw-schedule" id="schedule" aria-labelledby="curriculum-title">
      <div className="hw-container">
        <header className="hw-section-head">
          <p className="hw-label">Section 01 — Schedule</p>
          <h2 className="hw-h2" id="curriculum-title">Nine weeks from first sketch to demo day.</h2>
          <p className="hw-lead">Three phases, ten weeks, three checkpoints. Sundays are dedicated mentor catch-ups; Maker Thursdays are the weekly community checkpoint from week 03.</p>
        </header>

        {phases.map(phase => (
          <section className="hw-phase" key={phase.id}>
            <div className="hw-phase__head">
              <p className="hw-label">{phase.label}</p>
              <h3 className="hw-phase__title">{phase.title}</h3>
              <p className="hw-phase__note">{phase.note}</p>
              <p className="hw-label hw-phase__range">Weeks {phase.weeks[0].week}–{phase.weeks[phase.weeks.length - 1].week}</p>
            </div>
            <ol className="hw-weeks">
              {phase.weeks.map(({ week, title, focus, deliverable, checkpoint }) => (
                <li className="hw-week" key={week}>
                  <p className="hw-label hw-week__no">Week {week}</p>
                  <div className="hw-week__body">
                    <h4 className="hw-h3">{title}</h4>
                    <p>{focus}</p>
                    {checkpoint && <p className="hw-week__checkpoint hw-mono">{checkpoint}</p>}
                  </div>
                  <p className="hw-week__deliverable">
                    <span className="hw-label">Leave with</span>
                    <span>{deliverable}</span>
                  </p>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </section>

    <section className="hw-section hw-room" aria-labelledby="mentors-title">
      <div className="hw-container">
        <header className="hw-section-head">
          <p className="hw-label">Section 02 — Mentors</p>
          <h2 className="hw-h2" id="mentors-title">The people in the room when it stops working.</h2>
          <p className="hw-lead">Domain experts and makers who sit with residents through architecture reviews, checkpoints and the week everything breaks.</p>
        </header>
        <People people={mentors} />
      </div>
    </section>

    <section className="hw-section hw-room hw-room--builders" aria-labelledby="builders-title">
      <div className="hw-container">
        <header className="hw-section-head">
          <p className="hw-label">Section 03 — Builders</p>
          <h2 className="hw-h2" id="builders-title">This year&rsquo;s residents.</h2>
          <p className="hw-lead">{builders.length} builders, nine weeks, one documented hardware project each.</p>
        </header>
        <People people={builders} dense />
      </div>
    </section>

    <section className="hw-section hw-room hw-room--media" aria-labelledby="media-title">
      <div className="hw-container">
        <header className="hw-section-head">
          <p className="hw-label">Section 04 — Media</p>
          <h2 className="hw-h2" id="media-title">The people who documented it.</h2>
          <p className="hw-lead">Photos, video and the story of the cohort, from Maker Thursdays through demo day.</p>
        </header>
        <People people={media} />
      </div>
    </section>

    <section className="hw-section hw-public" aria-labelledby="in-public-title">
      <div className="hw-container">
        <header className="hw-section-head">
          <p className="hw-label">Section 05 — Learn in public</p>
          <h2 className="hw-h2" id="in-public-title">The build is yours. The learning belongs to the room.</h2>
          <p className="hw-lead">Alongside your own project, every resident contributes four things back to the space.</p>
        </header>
        <ol className="hw-public__grid">
          {inPublic.map(([title, copy], i) => (
            <li key={title}>
              <p className="hw-label">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="hw-h3">{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
        <p className="hw-public__outcome">A strong portfolio project, practical circuit, firmware, CAD and documentation skills—and a lasting habit of contributing to maker communities.</p>
      </div>
    </section>

    <ProjectsShowcase projects={loaderData.projects} error={loaderData.projectsError} titleId="hardware-projects-title" />

    <section className="hw-section hw-sponsors" aria-labelledby="sponsors-title">
      <div className="hw-container">
        <header className="hw-section-head">
          <p className="hw-label">Section 07 — Partners</p>
          <h2 className="hw-h2" id="sponsors-title">Partners and organisers.</h2>
        </header>
        <div className="hw-sponsors__row">
          <div className="hw-sponsors__group">
            <p className="hw-label">Partnered with</p>
            <OrgCard org={partner} lead />
          </div>
          <div className="hw-sponsors__group">
            <p className="hw-label">Organised by</p>
            <div className="hw-sponsors__pair">
              {organisers.map(org => <OrgCard key={org.name} org={org} />)}
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer className="hw-close">
      <div className="hw-container">
        <div className="hw-close__cta">
          <p className="hw-label">Next cohort</p>
          <h2 className="hw-h2">Bring an idea that needs a circuit.</h2>
          <a className="hw-btn hw-btn--inverse" href="/#apply">Start an application</a>
        </div>
        <p className="hw-label hw-close__doc"><span>Doc. BIR-HW-09 · Rev. 2026.1</span><span>TinkerHub · TinkerSpace Kochi</span></p>
      </div>
    </footer>
  </main>;
}
