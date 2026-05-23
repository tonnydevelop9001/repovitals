export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  try {
    let cleanUrl = url.trim();

    // Ensure it has a protocol to parse nicely, unless it's just github.com/...
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = `https://${cleanUrl}`;
    }

    const parsedUrl = new URL(cleanUrl);

    // Only allow github.com or www.github.com
    if (parsedUrl.hostname !== 'github.com' && parsedUrl.hostname !== 'www.github.com') {
      return null;
    }

    const parts = parsedUrl.pathname.split('/').filter(Boolean);

    if (parts.length < 2) {
      return null;
    }

    const owner = parts[0];
    let repo = parts[1];

    // Remove .git suffix if present
    if (repo.endsWith('.git')) {
      repo = repo.slice(0, -4);
    }

    return { owner, repo };
  } catch {
    return null;
  }
}
