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

export function generateAIPrompt(
  repoData: RepositoryData,
  healthResult: HealthScoreResult
): string {
  const { repo } = repoData;
  const languagesStr = Object.entries(repoData.languages)
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name)
    .join(', ');

  const suggestionsStr = healthResult.suggestions.length > 0
    ? healthResult.suggestions.map(s => `- ${s}`).join('\n')
    : 'No major issues found.';

  const prompt = [
    `I am auditing the GitHub repository "${repo.full_name}" and want a deep architectural, maintenance, and suitability review. Here is the metadata and health checks collected:`,
    ``,
    `- **Repository**: ${repo.full_name} (${repo.html_url})`,
    `- **Description**: ${repo.description || 'No description provided.'}`,
    `- **Primary Stack/Languages**: ${languagesStr || 'N/A'}`,
    `- **Health Score**: ${healthResult.score}/100 (${healthResult.grade})`,
    `- **README**: ${repoData.hasReadme ? 'Present' : 'Missing'}`,
    `- **License**: ${repo.license?.name || 'None detected'}`,
    `- **Workflows (CI/CD)**: ${repoData.hasWorkflows ? 'Configured' : 'None detected'}`,
    `- **Archived**: ${repo.archived ? 'Yes' : 'No'}`,
    `- **Stars**: ${repo.stargazers_count.toLocaleString()}`,
    `- **Forks**: ${repo.forks_count.toLocaleString()}`,
    `- **Default Branch**: ${repo.default_branch}`,
    `- **Last Push**: ${repo.pushed_at ? new Date(repo.pushed_at).toDateString() : 'Unknown'}`,
    ``,
    `**Heuristic suggestions flagged by RepoVitals:**`,
    suggestionsStr,
    ``,
    `Based on this information, please provide a comprehensive audit covering:`,
    `1. **Maintenance & Abandonment Risk**: Analyze the push activity, default branch setup, and archived state.`,
    `2. **Licensing & Compliance**: Evaluate the open-source license and compliance risk.`,
    `3. **Ecosystem & Community Health**: Assess stars, forks, and issues enablement to gauge developer community support.`,
    `4. **CI/CD & Documentation**: Evaluate the maturity based on the README and workflow configurations.`,
    `5. **Final Recommendation**: Provide a structured "Use / Use with Caution / Avoid" recommendation for production use.`
  ].join('\n');

  return prompt;
}

export function generateCompareAIPrompt(
  reposData: RepositoryData[],
  healthResults: HealthScoreResult[]
): string {
  const prompt = [
    `I am comparing two GitHub repositories to decide which one is better suited for my project. Please write a comparative analysis based on the following metadata:`,
    ``,
    ...reposData.map((d, index) => {
      const { repo } = d;
      const res = healthResults[index];
      const languagesStr = Object.entries(d.languages)
        .sort((a, b) => b[1] - a[1])
        .map(([name]) => name)
        .join(', ');
      
      const suggestionsStr = res.suggestions.length > 0
        ? res.suggestions.map(s => `- ${s}`).join('\n')
        : 'No major issues found.';

      return [
        `### Repository ${index + 1}: ${repo.full_name}`,
        `- **URL**: ${repo.html_url}`,
        `- **Description**: ${repo.description || 'No description'}`,
        `- **Languages**: ${languagesStr || 'N/A'}`,
        `- **Score**: ${res.score}/100 (${res.grade})`,
        `- **License**: ${repo.license?.name || 'None'}`,
        `- **CI/CD Configured**: ${d.hasWorkflows ? 'Yes' : 'No'}`,
        `- **README**: ${d.hasReadme ? 'Present' : 'Missing'}`,
        `- **Stars**: ${repo.stargazers_count.toLocaleString()}`,
        `- **Forks**: ${repo.forks_count.toLocaleString()}`,
        `- **Last Push**: ${repo.pushed_at ? new Date(repo.pushed_at).toDateString() : 'Unknown'}`,
        `**Key issues identified:**`,
        suggestionsStr,
        ``
      ].join('\n');
    }),
    `Based on this side-by-side data, please provide:`,
    `1. A comparison of their maintenance health and activity.`,
    `2. A comparison of their license compliance and documentation maturity.`,
    `3. A final recommendation on which library to choose, listing pros and cons for each.`
  ].join('\n');

  return prompt;
}

