import type { GitHubRepository } from '../types/github';
import { formatNumber, formatRelativeTime } from '../utils/formatters';

interface RepoSummaryProps {
  repo: GitHubRepository;
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

export function RepoSummary({ repo }: RepoSummaryProps) {
  const openIssues = ('open_issues_count' in repo)
    ? (repo as unknown as { open_issues_count: number }).open_issues_count
    : 0;

  const stats = [
    { label: 'Stars', value: formatNumber(repo.stargazers_count), emoji: '⭐' },
    { label: 'Forks', value: formatNumber(repo.forks_count), emoji: '🍴' },
    { label: 'Open Issues', value: formatNumber(openIssues), emoji: '🐛' },
    { label: 'License', value: repo.license?.spdx_id || 'None', emoji: '📄' },
    { label: 'Language', value: repo.language || 'N/A', emoji: '💻' },
    { label: 'Branch', value: repo.default_branch, emoji: '🌿' },
    {
      label: 'Last push',
      value: repo.pushed_at ? formatRelativeTime(repo.pushed_at) : 'Unknown',
      emoji: '🕐',
    },
    { label: 'Archived', value: repo.archived ? 'Yes' : 'No', emoji: '📦' },
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
        {stats.map(s => (
          <div key={s.label} style={statStyle}>
            <span style={{ fontSize: 11, color: '#555', fontWeight: 500 }}>
              {s.emoji} {s.label}
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#d4d4d4',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={s.value}
            >
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
