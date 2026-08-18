import type { Route } from "./+types/nights-and-weekends";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nights & Weekends — TinkerSpace" },
    {
      name: "description",
      content:
        "You already build. We make it count. A five-week cohort at TinkerSpace, Kochi: take what you've built into the real world every week and come back with evidence.",
    },
  ];
}

const weeks = [
  ["01", "Find the belief.", "What are you assuming to be true?"],
  ["02", "Put it in front of people.", "Stop asking what people might do. Watch what they actually do."],
  ["03", "Ask for something real.", "Attention. Commitment. Usage. Money."],
  ["04", "Follow the evidence.", "Change the thing, change the audience, or kill the assumption."],
  ["05", "Run the loop yourself.", "Leave knowing how to test the next thing without us."],
] as const;

const faqs = [
  ["Who is this for?", "Builders who are already working on something after hours — developers, designers, indie hackers — alongside a job, college, freelance work or another commitment."],
  ["Do I need a working product?", "You need something real enough to put in front of people: a product, a working prototype, or a concrete offer. An idea alone isn't enough."],
  ["Do I need to quit my job?", "No. You keep your job. You keep your life. You give us your nights and your weekends."],
  ["How much time does it take?", "Three to four touchpoints a week at TinkerSpace — a live session, an in-studio working block and a short evidence check-in — plus the fieldwork you do between them."],
  ["What happens during the five weeks?", "Each week you take one assumption, put it in front of real people, ask for something real, and come back with evidence. By week five you're running the loop on your own."],
  ["Is this online or in person?", "In person, at TinkerSpace, Kochi."],
  ["How much does it cost?", "Pricing is announced with each cohort. Apply and we'll send you the details."],
  ["When does the next cohort start?", "Applications for the next cohort are opening soon. Apply now and we'll be in touch with dates."],
] as const;

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function BrandMark() {
  return (
    <a className="nw-brand" href="#nw-title" aria-label="Nights and Weekends">
      <span>
        Nights &amp; Weekends
        <small>with TinkerSpace</small>
      </span>
    </a>
  );
}

function ExperimentLoop() {
  return (
    <div className="nw-loop" aria-label="The weekly experiment loop">
      <div className="nw-loop__orbit">
        <span className="nw-loop__node nw-loop__node--one">Hypothesis</span>
        <span className="nw-loop__node nw-loop__node--two">Experiment</span>
        <span className="nw-loop__node nw-loop__node--three">Evidence</span>
        <span className="nw-loop__node nw-loop__node--four">Decision</span>
        <div className="nw-loop__core">
          <span>05 weeks</span>
          <strong>Learn</strong>
          <small>Repeat weekly</small>
        </div>
      </div>
    </div>
  );
}

export default function NightsAndWeekends() {
  return (
    <main className="nw-page">
      <header className="nw-header">
        <BrandMark />
        <nav className="nw-nav" aria-label="Nights and Weekends navigation">
          <a href="/">Builder in Residence</a>
        </nav>
        <a className="nw-header-cta" href="#apply">
          Join the Cohort
          <Arrow />
        </a>
      </header>

      <section className="nw-hero" aria-labelledby="nw-title">
        <div className="nw-hero__copy">
          <p className="nw-kicker"><span aria-hidden="true" />TinkerSpace presents</p>
          <h1 id="nw-title">
            <span>Nights</span>
            <em>&amp; Weekends</em>
          </h1>
          <p className="nw-hero__tag">You already build. We make it count.</p>
          <p className="nw-hero__lede"><strong>Five weeks. Real people. Real money. Real evidence.</strong></p>
          <div className="nw-hero__actions">
            <a className="nw-button nw-button--light" href="#apply">
              Apply now
              <Arrow />
            </a>
          </div>
        </div>

        <div className="nw-hero__visual">
          <ExperimentLoop />
        </div>
      </section>

      <section className="nw-story" id="why">
        <h2>Nights &amp; Weekends exists to support and connect ambitious builders.</h2>
        <p>
          Traditionally, ambitious builders get trapped in the building. You spend
          weeks refining the product, changing the landing page, adding another
          feature, talking about validation — while the real question remains
          unanswered: does anyone actually want this?
        </p>
        <h3>Nights &amp; Weekends is a five-week cohort designed to get you out of your head and into the field.</h3>
        <h2>Every week, you take something you've built into the real world, learn from what happens, and come back with evidence.</h2>
      </section>

      <section className="nw-isolated" aria-label="The deal">
        <p className="nw-isolated__keep">
          <span>You keep your job.</span>
          <span>You keep your life.</span>
        </p>
        <p className="nw-isolated__give">
          You give us your <em>nights and weekends.</em>
        </p>
      </section>

      <section className="nw-manifesto" id="weeks">
        <h2>Stop validating.<br />Start testing.</h2>
        <ol>
          {weeks.map(([n, title, body]) => (
            <li key={n}>
              <span>Week {n}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <div className="nw-manifesto__gate">
          <p>If you want lectures, this isn't it.</p>
          <p>If you want five weeks of actually putting your assumptions in front of real people, <strong>keep going.</strong></p>
        </div>
        <div className="nw-manifesto__habit">
          <h3>The program ends. The habit doesn't.</h3>
          <p>You leave with a system for running this loop on your own, indefinitely.</p>
        </div>
      </section>

      <section className="nw-who" id="who">
        <p className="nw-overline">Who this is for</p>
        <h2>You're already building.</h2>
        <ul>
          <li>You're working on something after hours.</li>
          <li>You have a job, college, freelance work or another commitment.</li>
          <li>You don't need another course telling you how to build.</li>
          <li>You need to know whether the thing you're building deserves more of your time.</li>
        </ul>
        <p className="nw-who__punch">That's what these five weeks are for.</p>
      </section>

      <section className="nw-world" aria-labelledby="world-title">
        <p>stop refining it in your head.</p>
        <h2 id="world-title">Put it in the world.</h2>
        <blockquote>
          Five weeks. Live in the field.<br />Come back with evidence.
        </blockquote>
      </section>

      <section className="nw-faq" id="faq">
        <h2>questions?</h2>
        <div>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}<Arrow /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="nw-final" id="apply">
        <div className="nw-final__eyebrow">
          <span><strong>N&amp;W</strong> nights &amp; weekends</span>
          <span>TinkerSpace, Kochi</span>
        </div>
        <div className="nw-final__content">
          <h2>Stop waiting for someday.</h2>
          <div className="nw-final__footer">
            <p>
              <span>Five weeks.</span>
              <strong>Real people. Real money. Real evidence.</strong>
            </p>
            <a className="nw-button nw-button--dark" href="#nw-title">
              Apply now
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      <footer className="nw-footer">
        <BrandMark />
        <p className="nw-footer__line">Build after hours.</p>
        <nav className="nw-footer__links" aria-label="Footer">
          <a href="/">Builder in Residence</a>
          <a href="#apply">Join the Cohort</a>
          <a href="https://instagram.com/tinkerspace" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://twitter.com/tinkerspace" target="_blank" rel="noreferrer">Twitter</a>
        </nav>
      </footer>
    </main>
  );
}
