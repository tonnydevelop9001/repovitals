import type { GitHubLanguages } from '../types/github';

interface LanguageBreakdownProps {
  languages: GitHubLanguages;
}

// Custom colors for programming languages
const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Shell: '#89e051',
  Vue: '#41B883',
  Svelte: '#ff3e00',
  Dart: '#00B4AB',
  Scala: '#c22d40',
  Elixir: '#6e4a7e',
};

function getLangColor(name: string, idx: number): string {
  if (LANG_COLORS[name]) return LANG_COLORS[name];
  const fallbacks = ['#6366f1', '#ec4899', '#14b8a6', '#8b5cf6', '#06b6d4', '#f59e0b'];
  return fallbacks[idx % fallbacks.length];
}

export function LanguageBreakdown({ languages }: LanguageBreakdownProps) {
  const total = Object.values(languages).reduce((acc, val) => acc + val, 0);

  if (total === 0) {
    return (
      <div
        style={{
          background: '#141414',
          border: '1px solid #222',
          borderRadius: 16,
          padding: '20px',
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 600, color: '#555', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Languages
        </span>
        <p style={{ color: '#555', fontSize: 13, marginTop: 12 }}>No language data available.</p>
      </div>
    );
  }

  const entries = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .map(([name, bytes]) => ({
      name,
      percentage: (bytes / total) * 100,
    }));

  return (
    <div
      style={{
        background: '#141414',
        border: '1px solid #222',
        borderRadius: 16,
        padding: '20px',
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#555',
          display: 'block',
          marginBottom: 16,
        }}
      >
        Languages
      </span>

      {/* Segmented bar */}
      <div
        style={{
          width: '100%',
          height: 6,
          borderRadius: 99,
          overflow: 'hidden',
          display: 'flex',
          background: '#222',
          marginBottom: 16,
          gap: 2,
        }}
      >
        {entries.map((lang, idx) => (
          <div
            key={lang.name}
            title={`${lang.name}: ${lang.percentage.toFixed(1)}%`}
            style={{
              height: '100%',
              width: `${lang.percentage}%`,
              background: getLangColor(lang.name, idx),
              borderRadius: 99,
              transition: 'opacity 0.15s',
              cursor: 'default',
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {entries.map((lang, idx) => (
          <div
            key={lang.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: getLangColor(lang.name, idx),
                  flexShrink: 0,
                  boxShadow: `0 0 4px ${getLangColor(lang.name, idx)}80`,
                }}
              />
              <span style={{ fontSize: 13, color: '#c0c0c0', fontWeight: 500 }}>{lang.name}</span>
            </div>
            <span
              className="mono"
              style={{ fontSize: 12, color: '#555', fontWeight: 500 }}
            >
              {lang.percentage.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
