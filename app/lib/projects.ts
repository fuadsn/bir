export const PROJECTS_ORGANIZATION = "BuilderinResidencyTinkerspace";

export type GitHubRepository = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  default_branch: string;
  pushed_at: string | null;
  archived: boolean;
  fork: boolean;
};

export type Project = GitHubRepository & {
  readmeMarkdown: string | null;
  readmePath: string | null;
  preview: string | null;
};

export type ProjectWeek = {
  /** Two-digit week number as it appears in the file name. */
  number: string;
  title: string;
  markdown: string;
  path: string;
  /** The file exists but is still the unfilled template. */
  empty: boolean;
};

export type ProjectDocs = {
  overview: { markdown: string; path: string } | null;
  weeks: ProjectWeek[];
};

export function projectSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function projectTitle(name: string) {
  return name.replaceAll("-", " ").replaceAll("_", " ").trim();
}

export function formatCommitDate(pushedAt: string | null) {
  if (!pushedAt) return null;
  const at = new Date(pushedAt);
  if (Number.isNaN(at.valueOf())) return null;
  // Fixed locale and zone so the server and the client agree.
  return at.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
}

// ponytail: the QR pixels come from goqr.me, so printing needs network. Swap in
// a `qrcode` dependency and render the SVG in the loader if that ever bites.
export function qrSrc(url: string, size = 600) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=0&format=svg&data=${encodeURIComponent(url)}`;
}
