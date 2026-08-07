import type { Route } from "./+types/nights-and-weekends";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nights & Weekends — Builder in Residence" },
    {
      name: "description",
      content:
        "A four-week live experimentation studio for founders learning to find evidence, test demand, and make better product decisions.",
    },
  ];
}

const weeks = [
  {
    number: "01",
    question: "Is this problem actually real?",
    topics: [
      "Assumption thinking",
      "Problem discovery",
      "Customer conversations",
      "Observation",
      "Evidence gathering",
      "Signal vs noise",
    ],
    output: "Problem Evidence Board",
  },
  {
    number: "02",
    question: "What is the cheapest way to find out if this could work?",
    topics: [
      "Hypothesis design",
      "Riskiest assumptions",
      "Experiment design",
      "Experiment ladder",
      "MVP vs experiment",
      "Willingness to act or pay",
    ],
    output: "Experiment Card + First Experiment",
  },
  {
    number: "03",
    question: "What should change because of what we learned?",
    topics: [
      "Evidence analysis",
      "Behaviour vs opinions",
      "Failure analysis",
      "Product and offer iteration",
      "Pricing and positioning",
      "Continue / change / kill",
    ],
    output: "Version 0 → Version 1 → Version 2",
  },
  {
    number: "04",
    question: "Can I repeatedly find customers and keep learning?",
    topics: [
      "Distribution experiments",
      "Customer acquisition",
      "Conversion",
      "Feedback loops",
      "Experiment prioritisation",
      "Weekly learning rhythm",
    ],
    output: "Personal Experiment System",
  },
];

const modules = [
  ["01", "Builder → Experimenter", "Move from building on instinct to learning through evidence."],
  ["02", "Problem Discovery", "Understand real problems, behaviour and the questions worth asking."],
  ["03", "Customer Conversations", "Extract insight, identify patterns and separate signal from noise."],
  ["04", "Hypothesis Design", "Turn beliefs into tests with explicit evidence thresholds."],
  ["05", "Experiment Design", "Choose the smallest credible test before reaching for an MVP."],
  ["06", "Demand Validation", "Test action, commitment, pilots, pre-orders and payment."],
  ["07", "Evidence & Learning", "Read results clearly and learn without defending the idea."],
  ["08", "Iteration & Decisions", "Continue, modify, pivot or kill based on what the test showed."],
  ["09", "Product Iteration", "Change product, offer, audience, pricing or model with intent."],
  ["10", "Distribution Experiments", "Find customers and test channels before scaling marketing."],
  ["11", "Customer Conversion", "Turn interest into conversations, demos, pilots and payments."],
  ["12", "Founder Operating System", "Build a repeatable hypothesis-to-decision practice."],
] as const;

const resources = [
  ["Conversation", "Problem interview guide", "Questions, prompts and a note-taking structure for useful customer conversations."],
  ["Experiment", "Experiment card", "A one-page canvas for the hypothesis, test, threshold, cost and decision."],
  ["Demand", "Pricing resource pack", "Ways to test willingness to pay without sitting through a two-hour pricing class."],
  ["Evidence", "Problem evidence board", "A shared surface for assumptions, observations, patterns and open questions."],
  ["Decision", "Continue / change / kill log", "A clear record of what the evidence changed and what happens next."],
  ["Rhythm", "Weekly operating template", "A practical cadence for choosing and running the next highest-value test."],
] as const;

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function BrandMark() {
  return (
    <a className="nw-brand" href="/" aria-label="Builder in Residence home">
      <img src="/bir-logo-trimmed.png" alt="" />
      <span>
        Builder in Residence
        <small>Programs / 02</small>
      </span>
    </a>
  );
}

function ExperimentLoop() {
  return (
    <div className="nw-loop" aria-label="The four-week experiment loop">
      <div className="nw-loop__orbit">
        <span className="nw-loop__node nw-loop__node--one">Hypothesis</span>
        <span className="nw-loop__node nw-loop__node--two">Experiment</span>
        <span className="nw-loop__node nw-loop__node--three">Evidence</span>
        <span className="nw-loop__node nw-loop__node--four">Decision</span>
        <div className="nw-loop__core">
          <span>04 weeks</span>
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
          <a href="#method">Method</a>
          <a href="#curriculum">Curriculum</a>
          <a href="#resources">Resources</a>
        </nav>
        <a className="nw-header-cta" href="#apply">
          Join the next cohort
          <ArrowUpRight />
        </a>
      </header>

      <section className="nw-hero" aria-labelledby="nw-title">
        <div className="nw-hero__copy">
          <p className="nw-kicker">Build after hours. Test in the real world.</p>
          <h1 id="nw-title">
            <span>Nights</span>
            <em>&amp; Weekends</em>
          </h1>
          <p className="nw-hero__lede">
            Stop polishing assumptions. Learn how to turn a belief into a test,
            find evidence with real people, and decide what to build next.
          </p>

          <div className="nw-hero__actions">
            <a className="nw-button nw-button--light" href="#program">
              Explore the program
              <ArrowUpRight />
            </a>
            <p>
              For founders building<br />before or after work.
            </p>
          </div>
        </div>

        <div className="nw-hero__visual">
          <ExperimentLoop />
        </div>

        <div className="nw-hero__meta" aria-label="Program highlights">
          <div><span>Duration</span><strong>04 weeks</strong></div>
          <div><span>Format</span><strong>Live + in the field</strong></div>
          <div><span>Outcome</span><strong>A repeatable experiment system</strong></div>
        </div>
      </section>

      <section className="nw-intro" id="method">
        <div className="nw-section-label">
          <span>01</span>
          <p>The operating principle</p>
        </div>
        <div className="nw-intro__statement">
          <p className="nw-overline">This is not a four-week lecture series.</p>
          <h2>You do not learn experimentation by watching someone experiment.</h2>
          <p>
            The program separates what needs to be understood, what needs to be
            practised, and what simply needs to be available when you need it.
          </p>
        </div>

        <div className="nw-principle-output">
          <span>Output / 01</span>
          <strong>A belief turned into a testable question.</strong>
          <p>Assumption → Experiment → Evidence → Decision</p>
        </div>

      </section>

      <section className="nw-example" aria-labelledby="example-title">
        <div className="nw-example__prompt">
          <blockquote id="example-title">
            <span className="nw-quote-cue">When you say</span>
            <span className="nw-quote-line">“I need to test whether</span>
            <span className="nw-quote-line">people will pay.”</span>
          </blockquote>
          <p className="nw-example__description">
            You open the resource pack, choose an appropriate test, then come
            into the studio and test pricing with real people.
          </p>
        </div>
        <div className="nw-example__answer">
          <article className="nw-resource-highlight">
            <span>Use this resource</span>
            <strong>Pricing &amp; commitment</strong>
            <small>Pick a test. Set a threshold. Go to the market.</small>
          </article>
          <div className="nw-example__evidence">
            <span>Evidence to collect</span>
            <strong>A deposit, pre-order, pilot, or payment.</strong>
          </div>
        </div>
      </section>

      <section className="nw-program" id="program">
        <div className="nw-section-label">
          <span>02</span>
          <p>The four-week program</p>
        </div>
        <div className="nw-program__heading">
          <h2>From assumption to<br />a repeatable practice.</h2>
          <p>
            Every week moves from a live mental model to an experiment in the
            field, then back to the studio with evidence.
          </p>
        </div>

        <div className="nw-weeks">
          {weeks.map((week) => (
            <article className="nw-week" key={week.number}>
              <div className="nw-week__top">
                <span>Week {week.number}</span>
                <i aria-hidden="true">↘</i>
              </div>
              <h3>{week.question}</h3>
              <ul>
                {week.topics.map((topic) => <li key={topic}>{topic}</li>)}
              </ul>
              <div className="nw-week__output">
                <span>Working output</span>
                <strong>{week.output}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="nw-curriculum" id="curriculum">
        <div className="nw-section-label">
          <span>03</span>
          <p>Curriculum</p>
        </div>
        <div className="nw-curriculum__heading">
          <h2>The skills behind<br />better experiments.</h2>
          <p>
            The modules give you the judgement to choose the right test not a
            checklist that assumes every idea needs the same playbook.
          </p>
        </div>

        <div className="nw-module-list">
          {modules.map(([number, title, description]) => (
            <article className="nw-module" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="nw-library" id="resources">
        <div className="nw-section-label nw-section-label--light">
          <span>04</span>
          <p>Resource library</p>
        </div>
        <div className="nw-library__heading">
          <div>
            <p className="nw-overline">Use it when the experiment needs it.</p>
            <h2>The tactic stays on the shelf until it becomes useful.</h2>
          </div>
          <p>
            Short, practical packs help you execute without turning studio time
            into a library of how to classes.
          </p>
        </div>

        <div className="nw-resource-grid">
          {resources.map(([category, name, description], index) => (
            <article className="nw-resource" key={name}>
              <div>
                <span>{String(index + 1).padStart(2, "0")} / {category}</span>
                <i>Included</i>
              </div>
              <h3>{name}</h3>
              <p>{description}</p>
              <strong aria-hidden="true">↗</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="nw-onboarding">
        <div className="nw-section-label">
          <span>05</span>
          <p>Onboarding</p>
        </div>
        <div className="nw-onboarding__grid">
          <div className="nw-onboarding__heading">
            <p className="nw-overline">A starting point, not an evaluation.</p>
            <h2>Know where belief ends and evidence begins.</h2>
            <p className="nw-onboarding__intro">
              The baseline helps each builder see where they currently stand
              and choose the assumption that most needs to be tested first.
            </p>
          </div>
          <ol>
            <li>
              <span>01</span>
              <div><strong>Describe the current reality</strong><p>What you have built, who it is for, what has worked, what has failed and what remains uncertain.</p></div>
            </li>
            <li>
              <span>02</span>
              <div><strong>Score confidence against evidence</strong><p>Rate every major assumption by how strongly you believe it and how much real-world evidence supports it.</p></div>
            </li>
            <li>
              <span>03</span>
              <div><strong>Create the assumption map</strong><p>Separate what you believe, know, do not know and need to prove—then identify your #1 riskiest assumption.</p></div>
            </li>
          </ol>
        </div>
      </section>

      <section className="nw-final" id="apply">
        <div className="nw-final__eyebrow">
          <span><strong>06 /</strong> Next cohort</span>
          <span>Applications opening soon</span>
        </div>
        <div className="nw-final__content">
          <h2>
            Build after hours.
          </h2>
          <div className="nw-final__footer">
            <p>
              <span>Four weeks to replace “I think” with</span>
              <strong>“here is what we learned.”</strong>
            </p>
            <a className="nw-button nw-button--dark" href="#nw-title">
              Register your interest
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
