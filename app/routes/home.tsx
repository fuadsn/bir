import type { Route } from "./+types/home";
import { SiteNav } from "../components/site-nav";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Builder in Residence — Kochi" },
    {
      name: "description",
      content:
        "A nine-week hardware residency at TinkerSpace Kochi for builders turning ambitious electronics ideas into demonstrable projects.",
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
        <strong>09 weeks</strong>
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
    <div className="residency-assets">
      <div className="residency-asset residency-calendar" aria-hidden="true">
        <div className="calendar-top">
          <span>Residency</span>
          <span>09</span>
        </div>
        <div className="calendar-grid">
          {Array.from({ length: 20 }, (_, index) => (
            <i key={index} />
          ))}
        </div>
        <strong>Weeks in motion</strong>
      </div>

      <div className="residency-asset residency-room" aria-hidden="true">
        <span className="room-window" />
        <span className="room-bed">
          <i />
        </span>
        <strong>Room to focus</strong>
        <small>Live + build together</small>
      </div>

      <div className="residency-asset residency-location" aria-hidden="true">
        <span className="location-pin" />
        <span>
          Kochi
          <small>Kerala, India</small>
        </span>
      </div>

      <a
        className="residency-asset residency-demo"
        href="/nights-and-weekends"
        aria-label="Explore the Nights and Weekends program"
      >
        <span>Explore the program</span>
        <strong>Nights &amp; Weekends</strong>
        <i>↗</i>
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <main className="hero-shell">
      <SiteNav current="home" />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-eyebrow">
          <p>Nine weeks of deliberate hardware building</p>
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
            Nine focused weeks at TinkerSpace Kochi for builders ready to turn
            an electronics idea into work they can demonstrate.
          </p>

          <a className="primary-cta" href="/hardware">
            <span>Explore hardware</span>
            <span className="cta-arrow">
              <ArrowUpRight />
            </span>
          </a>
        </div>
      </section>

    </main>
  );
}
