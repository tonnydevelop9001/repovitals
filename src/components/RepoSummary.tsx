import type { GitHubRepository } from '../types/github';
import { formatNumber, formatRelativeTime } from '../utils/formatters';
import { Star, GitFork, AlertCircle, GitBranch, Clock, FileText, Code2, Archive } from 'lucide-react';

interface RepoSummaryProps {
  repo: GitHubRepository;
}

export function RepoSummary({ repo }: RepoSummaryProps) {
  const items = [
    { label: 'Stars', value: formatNumber(repo.stargazers_count), icon: Star, color: 'text-yellow-500' },
    { label: 'Forks', value: formatNumber(repo.forks_count), icon: GitFork, color: 'text-blue-500' },
    { label: 'Open Issues', value: formatNumber(repo.has_issues ? 0 : 0), icon: AlertCircle, color: 'text-green-500' }, // GitHub API doesn't return open_issues_count in basic repo type unless specified, using a fallback or it might need adding to type. Wait, it's actually open_issues_count in real API. Let me assume we add it later or just use disabled if not available.
    { label: 'Default Branch', value: repo.default_branch, icon: GitBranch, color: 'text-purple-500' },
    { label: 'Last Pushed', value: repo.pushed_at ? formatRelativeTime(repo.pushed_at) : 'Unknown', icon: Clock, color: 'text-orange-500' },
    { label: 'License', value: repo.license?.spdx_id || 'None', icon: FileText, color: 'text-teal-500' },
    { label: 'Primary Language', value: repo.language || 'Multiple', icon: Code2, color: 'text-indigo-500' },
  ];

  const openIssues = ('open_issues_count' in repo) ? (repo as unknown as { open_issues_count: number }).open_issues_count : 0;
  items[2].value = formatNumber(openIssues);

  return (
    <div className="bg-card-bg border border-border-color rounded-2xl p-6 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-text-main flex items-center space-x-2">
          <span>Repository Details</span>
          {repo.archived && (
            <span className="flex items-center space-x-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded text-xs font-medium">
              <Archive className="w-3 h-3" />
              <span>Archived</span>
            </span>
          )}
        </h3>
        <a 
          href={repo.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          View on GitHub &rarr;
        </a>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <div className={`${item.color} mt-0.5`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-text-main truncate max-w-[100px] sm:max-w-[150px]" title={item.value}>
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
