import type { GitHubRepository } from '../types/github';
import { formatNumber, formatRelativeTime } from '../utils/formatters';

interface RepoSummaryProps {
  repo: GitHubRepository;
  winningMetrics?: {
    stars?: boolean;
    forks?: boolean;
    activity?: boolean;
  };
}

const statStyle = {
  background: '#1a1a1a',
  border: '1px solid #222',
  borderRadius: 10,
  padding: '12px 14px',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 4,
};

export function RepoSummary({ repo, winningMetrics }: RepoSummaryProps) {
  const openIssues = ('open_issues_count' in repo)
    ? (repo as unknown as { open_issues_count: number }).open_issues_count
    : 0;

  const stats = [
    { key: 'stars', label: 'Stars', value: formatNumber(repo.stargazers_count), emoji: '⭐' },
    { key: 'forks', label: 'Forks', value: formatNumber(repo.forks_count), emoji: '🍴' },
    { key: 'issues', label: 'Open Issues', value: formatNumber(openIssues), emoji: '🐛' },
    { key: 'license', label: 'License', value: repo.license?.spdx_id || 'None', emoji: '📄' },
    { key: 'language', label: 'Language', value: repo.language || 'N/A', emoji: '💻' },
    { key: 'branch', label: 'Branch', value: repo.default_branch, emoji: '🌿' },
    {
      key: 'activity',
      label: 'Last push',
      value: repo.pushed_at ? formatRelativeTime(repo.pushed_at) : 'Unknown',
      emoji: '🕐',
    },
    { key: 'archived', label: 'Archived', value: repo.archived ? 'Yes' : 'No', emoji: '📦' },
  ];

  return (
    <div
      style={{
        background: '#141414',
        border: '1px solid #222',
        borderRadius: 16,
        padding: '20px 20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#555',
          }}
        >
          Details
        </span>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 12,
            color: '#10b981',
            textDecoration: 'none',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#34d399')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#10b981')}
        >
          View on GitHub →
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {stats.map(s => {
          const isWinner = winningMetrics && s.key && winningMetrics[s.key as keyof typeof winningMetrics];
          return (
            <div
              key={s.label}
              style={{
                ...statStyle,
                border: isWinner ? '1px dashed #05966960' : '1px solid #222',
                background: isWinner ? 'radial-gradient(circle at 100% 100%, #05966908, #1a1a1a)' : '#1a1a1a',
              }}
            >
              <span style={{ fontSize: 11, color: '#555', fontWeight: 500 }}>
                {s.emoji} {s.label}
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: isWinner ? '#34d399' : '#d4d4d4',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
                title={s.value}
              >
                {s.value}
                {isWinner && (
                  <span
                    style={{
                      fontSize: 10,
                      color: '#34d399',
                      fontWeight: 700,
                    }}
                    title="Comparison leader for this metric"
                  >
                    🏆
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
