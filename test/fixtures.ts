import { GitHubRepository, RepositoryData } from '../src/types/github';

export const mockRepo: GitHubRepository = {
  name: 'next.js',
  full_name: 'vercel/next.js',
  owner: {
    login: 'vercel',
    avatar_url: 'https://avatars.githubusercontent.com/u/14985020?v=4',
    html_url: 'https://github.com/vercel',
  },
  html_url: 'https://github.com/vercel/next.js',
  description: 'The React Framework',
  homepage: 'https://nextjs.org',
  stargazers_count: 120000,
  watchers_count: 120000,
  forks_count: 25000,
  language: 'TypeScript',
  has_issues: true,
  has_projects: true,
  has_downloads: true,
  has_wiki: true,
  has_pages: false,
  has_discussions: true,
  archived: false,
  disabled: false,
  pushed_at: new Date().toISOString(), // recent activity
  created_at: '2016-10-25T11:00:00Z',
  updated_at: new Date().toISOString(),
  default_branch: 'canary',
  visibility: 'public',
  license: {
    key: 'mit',
    name: 'MIT License',
    spdx_id: 'MIT',
    url: 'https://api.github.com/licenses/mit'
  },
  topics: ['react', 'nextjs', 'framework']
};

export const mockRepoData: RepositoryData = {
  repo: mockRepo,
  languages: {
    TypeScript: 80000,
    JavaScript: 15000,
    CSS: 5000
  },
  hasReadme: true,
  hasWorkflows: true,
  hasContributing: true,
  hasSecurity: true
};
