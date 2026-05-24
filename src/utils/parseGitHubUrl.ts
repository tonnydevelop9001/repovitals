export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  try {
    let cleanUrl = url.trim();

    // Remove trailing slashes
    while (cleanUrl.endsWith('/')) {
      cleanUrl = cleanUrl.slice(0, -1);
    }

    // Check if it's already a full GitHub URL or starts with github.com
    const githubRegex = /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^/]+)\/([^/]+)/i;
    const match = cleanUrl.match(githubRegex);
    if (match) {
      let repo = match[2];
      if (repo.endsWith('.git')) {
        repo = repo.slice(0, -4);
      }
      return { owner: match[1], repo };
    }

    // If it's a non-GitHub URL with a protocol, reject it
    if (/^https?:\/\//i.test(cleanUrl)) {
      return null;
    }

    // Otherwise, check if it's in owner/repo format
    const parts = cleanUrl.split('/').filter(Boolean);
    if (parts.length >= 2) {
      const owner = parts[0];
      let repo = parts[1];
      if (repo.endsWith('.git')) {
        repo = repo.slice(0, -4);
      }
      
      // Basic validation for owner and repo names to avoid random text
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

