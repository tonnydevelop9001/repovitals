import type { GitHubRepository, GitHubLanguages, RepositoryData } from '../types/github';
import { AppError, NotFoundError, RateLimitError } from '../utils/errors';

const API_BASE = 'https://api.github.com';

async function fetchWithHandling(url: string, options: RequestInit = {}): Promise<Response> {
  const token = localStorage.getItem('github_token');
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    ...(options.headers as Record<string, string>),
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const limit = response.headers.get('x-ratelimit-limit');
  const remaining = response.headers.get('x-ratelimit-remaining');
  const reset = response.headers.get('x-ratelimit-reset');
  
  if (limit && remaining) {
    window.dispatchEvent(new CustomEvent('github-rate-limit-updated', {
      detail: { limit: parseInt(limit, 10), remaining: parseInt(remaining, 10), reset: reset ? parseInt(reset, 10) : 0 }
    }));
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new NotFoundError();
    }
    
    if (response.status === 403) {
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
    // Get repository details
    const repoResponse = await fetchWithHandling(`${API_BASE}/repos/${owner}/${repo}`);
    const repoData: GitHubRepository = await repoResponse.json();

    // Get language statistics
    let languages: GitHubLanguages = {};
    try {
      const langResponse = await fetchWithHandling(`${API_BASE}/repos/${owner}/${repo}/languages`);
      languages = await langResponse.json();
    } catch (e) {
      console.warn('Failed to fetch languages', e);
    }

    // Check if README exists
    let hasReadme = false;
    try {
      await fetchWithHandling(`${API_BASE}/repos/${owner}/${repo}/readme`);
      hasReadme = true;
    } catch (e) {
      if (!(e instanceof NotFoundError)) {
        console.warn('Failed to fetch README', e);
      }
    }

    // Check if GitHub workflows are configured
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

    // Check if contributing guide is present
    let hasContributing = false;
    try {
      await fetchWithHandling(`${API_BASE}/repos/${owner}/${repo}/contents/CONTRIBUTING.md`);
      hasContributing = true;
    } catch (e) {
      if (!(e instanceof NotFoundError)) console.warn('Failed to fetch CONTRIBUTING.md', e);
    }

    // Check if security policy is present
    let hasSecurity = false;
    try {
      await fetchWithHandling(`${API_BASE}/repos/${owner}/${repo}/contents/SECURITY.md`);
      hasSecurity = true;
    } catch (e) {
      if (!(e instanceof NotFoundError)) console.warn('Failed to fetch SECURITY.md', e);
    }

    return {
      repo: repoData,
      languages,
      hasReadme,
      hasWorkflows,
      hasContributing,
      hasSecurity
    };
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new AppError('Network error: Unable to reach GitHub API. Please check your connection.');
    }
    throw error;
  }
}
