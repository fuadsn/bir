import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Builder in Residence — Kochi" },
    {
      name: "description",
      content:
        "A five-week residency in Kochi for independent builders ready to turn ambitious ideas into work that ships.",
    },
  ];
}

function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ResidencyMark() {
  return (
    <a className="brand" href="/" aria-label="Builder in Residence home">
      <img src="/bir-logo-trimmed.png" alt="" className="brand-logo" />
    </a>
  );
}

function HeroArtwork() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="art-orbit art-orbit--wide" />
      <div className="art-orbit art-orbit--tight" />
      <div className="art-sun" />
      <div className="art-grid" />
      <div className="art-stair">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="art-door">
        <span />
      </div>
      <div className="art-pass">
        <span>Builder residency</span>
        <strong>05 weeks</strong>
        <small>Kochi · 2026</small>
      </div>
      <div className="art-spark art-spark--one">✦</div>
      <div className="art-spark art-spark--two">✦</div>
      <div className="art-stamp">
        <span>Live</span>
        <span>Build</span>
        <span>Ship</span>
      </div>
    </div>
  );
}

function ResidencyAssets() {
  return (
    <div className="residency-assets" aria-hidden="true">
      <div className="residency-asset residency-calendar">
        <div className="calendar-top">
          <span>Residency</span>
          <span>05</span>
        </div>
        <div className="calendar-grid">
          {Array.from({ length: 20 }, (_, index) => (
            <i key={index} />
          ))}
        </div>
        <strong>Weeks in motion</strong>
      </div>

      <div className="residency-asset residency-room">
        <span className="room-window" />
        <span className="room-bed">
          <i />
        </span>
        <strong>Room to focus</strong>
        <small>Live + build together</small>
      </div>

      <div className="residency-asset residency-location">
        <span className="location-pin" />
        <span>
          Kochi
          <small>Kerala, India</small>
        </span>
      </div>

      <div className="residency-asset residency-demo">
        <span>Every Friday</span>
        <strong>Demo night</strong>
        <i>↗</i>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="hero-shell">
      <header className="site-header">
        <ResidencyMark />

        <div className="header-note" aria-label="Applications status">
          <span className="status-dot" />
          Applications open
        </div>

        <a className="header-cta" href="#apply">
          Apply now
          <ArrowUpRight />
        </a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-eyebrow">
          <p>Five weeks of deliberate building</p>
        </div>

        <HeroArtwork />
        <ResidencyAssets />

        <h1 id="hero-title" className="hero-title">
          <span className="title-line title-line--one">Builder</span>
          <span className="title-line title-line--two">
            <em>in</em> Residence
          </span>
        </h1>

        <div className="hero-footer" id="apply">
          <p className="hero-copy">
            Five focused weeks in Kochi for independent builders ready to turn
            ambitious ideas into work that ships.
          </p>

          <button className="primary-cta" type="button">
            <span>Apply for the residency</span>
            <span className="cta-arrow">
              <ArrowUpRight />
            </span>
          </button>
        </div>
      </section>

      <div className="edge-ticker" aria-hidden="true">
        <div className="edge-ticker-track">
          <span className="ticker-sequence">
            <b>Build what matters</b><i>✦</i>
            <b>Find your people</b><i>✦</i>
            <b>Ship the work</b><i>✦</i>
            <b>Build what matters</b><i>✦</i>
            <b>Find your people</b><i>✦</i>
            <b>Ship the work</b><i>✦</i>
            <b>Build what matters</b><i>✦</i>
            <b>Find your people</b><i>✦</i>
            <b>Ship the work</b><i>✦</i>
            <b>Build what matters</b><i>✦</i>
          </span>
          <span className="ticker-sequence">
            <b>Build what matters</b><i>✦</i>
            <b>Find your people</b><i>✦</i>
            <b>Ship the work</b><i>✦</i>
            <b>Build what matters</b><i>✦</i>
            <b>Find your people</b><i>✦</i>
            <b>Ship the work</b><i>✦</i>
            <b>Build what matters</b><i>✦</i>
            <b>Find your people</b><i>✦</i>
            <b>Ship the work</b><i>✦</i>
            <b>Build what matters</b><i>✦</i>
          </span>
        </div>
      </div>
    </main>
  );
}
