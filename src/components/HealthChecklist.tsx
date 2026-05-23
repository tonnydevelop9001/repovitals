import type { HealthCriterion } from '../types/health';
import { CheckCircle2, XCircle } from 'lucide-react';

interface HealthChecklistProps {
  criteria: HealthCriterion[];
}

export function HealthChecklist({ criteria }: HealthChecklistProps) {
  return (
    <div className="bg-card-bg border border-border-color rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border-color">
        <h3 className="text-xl font-semibold text-text-main">Health Checklist</h3>
      </div>
      <div className="divide-y divide-border-color">
        {criteria.map((item) => (
          <div key={item.id} className="p-6 flex items-start sm:items-center flex-col sm:flex-row space-y-4 sm:space-y-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="flex-shrink-0 mr-4">
              {item.passed ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="text-base font-semibold text-text-main flex items-center space-x-2">
                <span>{item.label}</span>
                <span className="text-xs font-normal text-text-muted bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                  {item.pointsEarned} / {item.maxPoints} pts
                </span>
              </h4>
              <p className="text-sm text-text-muted mt-1">{item.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
