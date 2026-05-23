export interface HealthCriterion {
  id: string;
  label: string;
  passed: boolean;
  pointsEarned: number;
  maxPoints: number;
  explanation: string;
}

export interface HealthScoreResult {
  score: number;
  grade: 'Excellent' | 'Good' | 'Fair' | 'Needs Work';
  criteria: HealthCriterion[];
  suggestions: string[];
}
