export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  try {
    let cleanUrl = url.trim();

    // strip trailing slashes
    while (cleanUrl.endsWith('/')) {
      cleanUrl = cleanUrl.slice(0, -1);
    }

    // match full github.com urls
    const githubRegex = /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^/]+)\/([^/]+)/i;
    const match = cleanUrl.match(githubRegex);
    if (match) {
      let repo = match[2];
      if (repo.endsWith('.git')) {
        repo = repo.slice(0, -4);
      }
      return { owner: match[1], repo };
    }

    // ignore non-github protocol links
    if (/^https?:\/\//i.test(cleanUrl)) {
      return null;
    }

    // fallback to owner/repo string format
    const parts = cleanUrl.split('/').filter(Boolean);
    if (parts.length >= 2) {
      const owner = parts[0];
      let repo = parts[1];
      if (repo.endsWith('.git')) {
        repo = repo.slice(0, -4);
      }
      
      // filter out invalid characters in repo names
      const nameRegex = /^[a-zA-Z0-9-_.]+$/;
      if (nameRegex.test(owner) && nameRegex.test(repo)) {
        return { owner, repo };
      }
    }

    return null;
  } catch {
    return null;
  }
}

