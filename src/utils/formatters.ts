import type { RepositoryData } from '../types/github';
import type { HealthScoreResult } from '../types/health';

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 1000));

  if (diffInSeconds < 60) return 'just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}y ago`;
}

export function generateSingleMarkdownReport(
  repoData: RepositoryData,
  healthResult: HealthScoreResult
): string {
  const { repo } = repoData;
  const lines = [
    `### 🩺 RepoVitals Health Report: [${repo.full_name}](${repo.html_url})`,
    `**Health Score:** \`${healthResult.score}/100\` (${healthResult.grade})`,
    ``,
    `| Metric / Check | Status | Score | Description |`,
    `| :--- | :---: | :---: | :--- |`,
  ];

  for (const criterion of healthResult.criteria) {
    const status = criterion.passed ? '✅ Passed' : '❌ Failed';
    lines.push(
      `| **${criterion.label}** | ${status} | \`${criterion.pointsEarned}/${criterion.maxPoints}\` | ${criterion.explanation} |`
    );
  }

  lines.push('');
  if (healthResult.suggestions.length > 0) {
    lines.push(`**Suggestions for Improvement:**`);
    for (const suggestion of healthResult.suggestions) {
      lines.push(`- ${suggestion}`);
    }
    lines.push('');
  }

  lines.push(`*Report generated via [RepoVitals](https://github.com/tonnydevelop9001/repovitals).*`);
  return lines.join('\n');
}

export function generateCompareMarkdownReport(
  reposData: RepositoryData[],
  healthResults: HealthScoreResult[]
): string {
  const lines = [
    `### 🩺 RepoVitals Health Comparison`,
    ``,
    `| Metric | ${reposData.map(d => `[${d.repo.full_name}](${d.repo.html_url})`).join(' | ')} |`,
    `| :--- | ${reposData.map(() => ':---:').join(' | ')} |`,
    `| **Health Score** | ${healthResults.map(r => `**\`${r.score}/100\`** (${r.grade})`).join(' | ')} |`,
    `| **Primary Language** | ${reposData.map(d => d.repo.language || 'N/A').join(' | ')} |`,
    `| **Stars** | ${reposData.map(d => d.repo.stargazers_count.toLocaleString()).join(' | ')} |`,
    `| **Forks** | ${reposData.map(d => d.repo.forks_count.toLocaleString()).join(' | ')} |`,
    `| **Open Issues** | ${reposData.map(d => {
      const openIssues = ('open_issues_count' in d.repo)
        ? (d.repo as unknown as { open_issues_count: number }).open_issues_count
        : 0;
      return openIssues.toLocaleString();
    }).join(' | ')} |`,
    `| **License** | ${reposData.map(d => d.repo.license?.spdx_id || 'None').join(' | ')} |`,
    `| **CI/CD Configured** | ${reposData.map(d => d.hasWorkflows ? '✅ Yes' : '❌ No').join(' | ')} |`,
    `| **README Present** | ${reposData.map(d => d.hasReadme ? '✅ Yes' : '❌ No').join(' | ')} |`,
  ];

  lines.push('');
  lines.push(`*Report generated via [RepoVitals](https://github.com/tonnydevelop9001/repovitals).*`);
  return lines.join('\n');
}

