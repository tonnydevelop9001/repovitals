import type { HealthScoreResult } from '../types/health';

interface ScoreCardProps {
  result: HealthScoreResult;
}

export function ScoreCard({ result }: ScoreCardProps) {
  const { score, grade } = result;

  const getScoreColor = () => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    if (score >= 50) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBg = () => {
    if (score >= 85) return 'bg-green-500/10 border-green-500/20';
    if (score >= 70) return 'bg-yellow-500/10 border-yellow-500/20';
    if (score >= 50) return 'bg-orange-500/10 border-orange-500/20';
    return 'bg-red-500/10 border-red-500/20';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`bg-card-bg border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm ${getScoreBg()}`}>
      <h3 className="text-xl font-semibold text-text-main mb-6">Overall Health</h3>
      
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 dark:text-gray-800"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className={getScoreColor()}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-text-main">{score}</span>
        </div>
      </div>
      
      <div className="mt-6">
        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide border ${getScoreBg()} ${getScoreColor()}`}>
          {grade}
        </span>
      </div>
    </div>
  );
}
