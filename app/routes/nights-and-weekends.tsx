import type { Route } from "./+types/nights-and-weekends";
import { SiteNav } from "../components/site-nav";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nights & Weekends — TinkerSpace" },
    { name: "description", content: "Five weeks at TinkerSpace, Kochi for finding out whether anyone actually wants what you are building." },
  ];
}

const APPLY_URL = "https://airtable.com/appoFMc8Ox08jKyRt/shr0R5FAJCnCb4MHR";

const weeks = [
  ["00", "Before we start.", "A short onboarding where you write down what you believe and how much of it you've tested. Most people find the gap uncomfortable."],
  ["01", "Name the belief.", "Somewhere underneath the product is an assumption you've never checked. This week you find it."],
  ["02", "Take it to people.", "Less about what someone says they would do, more about watching what they actually do."],
  ["03", "Ask for something real.", "Their time, their commitment, their money. Something that costs them to say yes to."],
  ["04", "Change what the evidence says to change.", "The product, the price, the customer, or your own mind."],
  ["05", "Carry it on your own.", "You share what you found, including the parts that went badly, and leave running the loop yourself."],
] as const;

const faqs = [
  ["Who is this for?", "Developers, designers and indie hackers in and around Kochi who are building something after hours, alongside a job, college or freelance work."],
  ["Do I need a working product?", "You need something real enough to put in front of a person: a product, a working prototype, or an offer you could sell today. An idea on its own is too early for this."],
  ["Do I need to quit my job?", "No. You keep your job. You keep your life. You give us your nights and your weekends."],
  ["How much time does it take?", "Three sessions a week at TinkerSpace, always in the evening, with the week's schedule shared before the week begins. Add the fieldwork you do in between. The space is open around the clock, and the people who get the most out of this are in it most days."],
  ["Who runs the sessions?", "A different founder each week, matched to the question that week is built around. A program lead stays with the cohort the whole way through and knows every project in the room."],
  ["What do I walk away with?", "Evidence about your own product, gathered by you. A version of it that changed because of what you found. And a weekly loop you can keep running after the cohort ends."],
  ["Is this online or in person?", "In person, at TinkerSpace, Kochi."],
  ["How much does it cost?", "The cohort is free."],
  ["When does the next cohort start?", "The next cohort starts in September 2026. Applications are open now."],
] as const;

function Arrow() { return <span aria-hidden="true" className="nw2-arrow">↗</span>; }

function ApplyButton({ dark = false }: { dark?: boolean }) {
  return <a className={`nw2-button ${dark ? "nw2-button--dark" : ""}`} href={APPLY_URL} target="_blank" rel="noreferrer">Apply to the cohort <Arrow /></a>;
}

export default function NightsAndWeekends() {
  return (
    <main className="nw3-page">
      <SiteNav current="nights-and-weekends" />

      <section className="nw2-hero" id="top" aria-labelledby="nw2-title">
        <div className="nw2-hero__copy">
          <p className="nw2-overline">TinkerSpace presents <i /></p>
          <h1 id="nw2-title">Nights <em>&amp; Weekends</em></h1>
          <p className="nw2-hero__tag">You built it after hours.<br />Now take it outside.</p>
          <p className="nw2-hero__sub">Five weeks of finding out whether anyone actually wants it.</p>
          <ApplyButton dark />
        </div>
        <div className="nw2-hero__art nw3-hero-art" aria-label="A three-dimensional representation of the weekly evidence loop">
          <div className="nw3-sculpture" aria-hidden="true">
            <div className="nw3-cube nw3-cube--one"><i /><b /></div>
            <div className="nw3-cube nw3-cube--two"><i /><b /></div>
            <div className="nw3-cube nw3-cube--three"><i /><b /></div>
          </div>
        </div>
      </section>

      <section className="nw2-intro" id="how">
        <p className="nw2-overline">A room for the work after work</p>
        <h2>Most people who build something never find out whether anyone wants it.</h2>
        <div className="nw2-intro__body"><p>The building goes well, because building is the part you're already good at. Months pass and the product genuinely improves. The number of people outside your laptop who have used it stays about where it started. There's encouragement along the way, from friends and group chats and posts that do well, and none of it costs the people saying it anything.</p><p><strong>Nights &amp; Weekends is five weeks of finding out, in a room with other people doing the same thing.</strong></p></div>
      </section>

      <section className="nw2-statement"><p>Every week you take one belief about what you're building to real people, and you come back with what actually happened.</p><div><strong>You give us your <em>nights and weekends.</em></strong></div></section>

      <section className="nw2-weeks" id="weeks" aria-labelledby="weeks-title">
        <div className="nw2-section-head"><p className="nw2-overline">The curriculum</p><h2 id="weeks-title">The five weeks.</h2></div>
        <ol>{weeks.map(([number, title, body]) => <li key={number}><span className="nw2-week-number">Week {number}</span><div><h3>{title}</h3><p>{body}</p></div><i aria-hidden="true">↗</i></li>)}</ol>
      </section>

      <section className="nw2-no-lectures">
        <div className="nw3-room-heading"><p className="nw2-overline">What happens in the room</p><h2>There are<br /><em>no lectures.</em></h2></div>
        <div className="nw3-room-copy"><p className="nw3-room-kicker">Bring back what happened.</p><p>A founder joins the room every week to press on what you brought back. They’re there for your evidence, not to tell their own story.</p></div>
        <footer><p className="nw3-room-kicker">What you leave with</p><h3>The five weeks end.<br />The habit stays.</h3><p>You leave able to run this loop on your own, for this product and for whatever you build after it.</p></footer>
      </section>

      <section className="nw2-who"><p className="nw2-overline">Who this is for</p><h2>You're already<br />building something.</h2><ul><li>You have a product, a prototype, or a real offer that someone could use today.</li><li>You have a job, or college, or freelance work, and this happens around it.</li><li>Very few people outside your own circle have given you an honest reaction to it.</li><li>You want to know whether it deserves the next six months of your evenings.</li></ul><p className="nw2-who__ending">That's what these five weeks are for.</p></section>

      <section className="nw2-pull"><p>it's been in your head long enough.</p><h2>Take it outside.</h2><blockquote>Five weeks. Real people. Real evidence.<br /><span>A room full of people doing the same thing on the same nights.</span></blockquote></section>

      <section className="nw2-faq" id="faq"><div><p className="nw2-overline">The details</p><h2>Questions?</h2><p className="nw2-faq__aside">Starting September 2026<br />TinkerSpace, Kochi<br /><strong>Free to join</strong></p></div><div className="nw2-faq__list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<Arrow /></summary><p>{answer}</p></details>)}</div></section>

      <section className="nw2-final"><p className="nw2-overline">Starting September 2026 · Kochi</p><h2>Take the next thing<br /><em>outside.</em></h2><p>Five weeks. One loop you can keep running.</p><ApplyButton dark /></section>
      <footer className="nw2-footer"><a className="nw2-brand" href="#top"><b>N&amp;W</b><span>with TinkerSpace</span></a><span>Built for the work after work.</span><a href="/">Builder in Residence</a></footer>
    </main>
  );
}
