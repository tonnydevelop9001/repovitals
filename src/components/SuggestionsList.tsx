import { Lightbulb } from 'lucide-react';

interface SuggestionsListProps {
  suggestions: string[];
}

export function SuggestionsList({ suggestions }: SuggestionsListProps) {
  if (suggestions.length === 0) {
    return (
      <div className="bg-card-bg border border-border-color rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <h3 className="text-xl font-semibold text-text-main">Suggestions</h3>
        </div>
        <p className="text-text-muted text-sm">
          Great job! No major improvements suggested. Your repository looks very healthy.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card-bg border border-border-color rounded-2xl p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        <h3 className="text-xl font-semibold text-text-main">Improvement Suggestions</h3>
      </div>
      <ul className="space-y-4">
        {suggestions.map((suggestion, idx) => (
          <li key={idx} className="flex items-start space-x-3 text-sm text-text-main bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800/50 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-xs mt-0.5">
              {idx + 1}
            </span>
            <span className="pt-0.5 leading-relaxed">{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
