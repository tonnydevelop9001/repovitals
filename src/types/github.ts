export interface GitHubRepository {
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  description: string | null;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  archived: boolean;
  disabled: boolean;
  pushed_at: string | null;
  created_at: string;
  updated_at: string;
  default_branch: string;
  visibility: string;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string | null;
  } | null;
  topics: string[];
}

export type GitHubLanguages = Record<string, number>;

export interface GitHubRepoContent {
  type: string;
  encoding: string;
  size: number;
  name: string;
  path: string;
  content?: string;
  sha: string;
  url: string;
  git_url: string;
  html_url: string;
  download_url: string;
}

export interface RepositoryData {
  repo: GitHubRepository;
  languages: GitHubLanguages;
  hasReadme: boolean;
  hasWorkflows: boolean;
  hasContributing: boolean;
  hasSecurity: boolean;
}
