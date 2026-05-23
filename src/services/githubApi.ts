import type { GitHubRepository, GitHubLanguages, RepositoryData } from '../types/github';
import { AppError, NotFoundError, RateLimitError } from '../utils/errors';

const API_BASE = 'https://api.github.com';

async function fetchWithHandling(url: string, options: RequestInit = {}): Promise<Response> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Accept': 'application/vnd.github+json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new NotFoundError();
    }
    
    if (response.status === 403) {
      const limit = response.headers.get('x-ratelimit-limit');
      const remaining = response.headers.get('x-ratelimit-remaining');
      const reset = response.headers.get('x-ratelimit-reset');
      
      if (limit && remaining === '0' && reset) {
        throw new RateLimitError(limit, remaining, reset);
      }
    }

    throw new AppError(`GitHub API Error: ${response.status} ${response.statusText}`);
  }

  return response;
}

export async function fetchRepositoryData(owner: string, repo: string): Promise<RepositoryData> {
  try {
    // 1. Fetch main repo data
    const repoResponse = await fetchWithHandling(`${API_BASE}/repos/${owner}/${repo}`);
    const repoData: GitHubRepository = await repoResponse.json();

    // 2. Fetch languages
    let languages: GitHubLanguages = {};
    try {
      const langResponse = await fetchWithHandling(`${API_BASE}/repos/${owner}/${repo}/languages`);
      languages = await langResponse.json();
    } catch (e) {
      console.warn('Failed to fetch languages', e);
    }

    // 3. Check for README
    let hasReadme = false;
    try {
      await fetchWithHandling(`${API_BASE}/repos/${owner}/${repo}/readme`);
      hasReadme = true;
    } catch (e) {
      if (!(e instanceof NotFoundError)) {
        console.warn('Failed to fetch README', e);
      }
    }

    // 4. Check for workflows
    let hasWorkflows = false;
    try {
      const workflowsResponse = await fetchWithHandling(`${API_BASE}/repos/${owner}/${repo}/contents/.github/workflows`);
      const workflowsData = await workflowsResponse.json();
      hasWorkflows = Array.isArray(workflowsData) && workflowsData.length > 0;
    } catch (e) {
      if (!(e instanceof NotFoundError)) {
        console.warn('Failed to fetch workflows', e);
      }
    }

    return {
      repo: repoData,
      languages,
      hasReadme,
      hasWorkflows
    };
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new AppError('Network error: Unable to reach GitHub API. Please check your connection.');
    }
    throw error;
  }
}
