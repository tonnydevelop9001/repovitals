import type { GitHubLanguages } from '../types/github';

interface LanguageBreakdownProps {
  languages: GitHubLanguages;
}

export function LanguageBreakdown({ languages }: LanguageBreakdownProps) {
  const total = Object.values(languages).reduce((acc, val) => acc + val, 0);
  
  if (total === 0) {
    return (
      <div className="bg-card-bg border border-border-color rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-text-main mb-4">Languages</h3>
        <p className="text-text-muted text-sm">No language data available.</p>
      </div>
    );
  }

  const entries = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .map(([name, bytes]) => ({
      name,
      percentage: (bytes / total) * 100
    }));

  const colors = [
    'bg-blue-500', 'bg-red-500', 'bg-yellow-500', 'bg-green-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
  ];

  return (
    <div className="bg-card-bg border border-border-color rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-text-main mb-6">Languages</h3>
      
      {/* Progress bar */}
      <div className="w-full h-3 flex rounded-full overflow-hidden mb-6 bg-gray-100 dark:bg-gray-800">
        {entries.map((lang, idx) => (
          <div
            key={lang.name}
            className={`h-full ${colors[idx % colors.length]}`}
            style={{ width: `${lang.percentage}%` }}
            title={`${lang.name}: ${lang.percentage.toFixed(1)}%`}
          ></div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {entries.map((lang, idx) => (
          <div key={lang.name} className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${colors[idx % colors.length]}`}></div>
            <span className="text-sm font-medium text-text-main">{lang.name}</span>
            <span className="text-sm text-text-muted">{lang.percentage.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
