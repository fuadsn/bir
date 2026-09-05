export const PROJECTS_ORGANIZATION = "BuilderinResidencyTinkerspace";

export type GitHubRepository = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  default_branch: string;
  updated_at: string;
  archived: boolean;
  fork: boolean;
};

export type Project = GitHubRepository & {
  readmeMarkdown: string | null;
  readmePath: string | null;
  preview: string | null;
};
