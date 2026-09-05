type SiteRoute = "home" | "hardware" | "nights-and-weekends";

const links: Array<[SiteRoute, string, string]> = [
  ["home", "Home", "/"],
  ["hardware", "Hardware", "/hardware"],
  ["nights-and-weekends", "Nights & Weekends", "/nights-and-weekends"],
];

export function SiteNav({ current }: { current: SiteRoute }) {
  return (
    <header className="shared-site-nav">
      <a className="shared-site-nav__brand" href="/" aria-label="Builder in Residence home">
        <img src="/bir-logo-trimmed.png" alt="" />
        <span>Builder in Residence</span>
      </a>

      <nav aria-label="Main navigation">
        {links.map(([route, label, href]) => (
          <a key={route} href={href} aria-current={current === route ? "page" : undefined}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
