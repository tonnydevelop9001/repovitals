import type { RepositoryData } from '../types/github';
import type { HealthScoreResult, HealthCriterion } from '../types/health';

export function scoreRepository(data: RepositoryData): HealthScoreResult {
  const criteria: HealthCriterion[] = [];
  const suggestions: string[] = [];
  let score = 0;

  // 1. README present: 15 points
  if (data.hasReadme) {
    score += 15;
    criteria.push({
      id: 'readme',
      label: 'README File',
      passed: true,
      pointsEarned: 15,
      maxPoints: 15,
      explanation: 'A README file is present.'
    });
  } else {
    criteria.push({
      id: 'readme',
      label: 'README File',
      passed: false,
      pointsEarned: 0,
      maxPoints: 15,
      explanation: 'No README found in the repository root.'
    });
    suggestions.push('Add a README with installation and usage instructions.');
  }

  // 2. License detected: 15 points
  if (data.repo.license) {
    score += 15;
    criteria.push({
      id: 'license',
      label: 'License',
      passed: true,
      pointsEarned: 15,
      maxPoints: 15,
      explanation: `Valid license detected (${data.repo.license.name}).`
    });
  } else {
    criteria.push({
      id: 'license',
      label: 'License',
      passed: false,
      pointsEarned: 0,
      maxPoints: 15,
      explanation: 'No standard open-source license detected.'
    });
    suggestions.push('Add an open-source license such as MIT, Apache-2.0, or GPL.');
  }

  // 3. Recent activity: 15 points
  let activityPoints = 0;
  let activityExplanation = 'No recent activity detected.';
  
  if (data.repo.pushed_at) {
    const pushedDate = new Date(data.repo.pushed_at);
    const now = new Date();
    const daysSincePush = Math.floor((now.getTime() - pushedDate.getTime()) / (1000 * 3600 * 24));
    
    if (daysSincePush <= 90) {
      activityPoints = 15;
      activityExplanation = 'Repository had activity within the last 90 days.';
    } else if (daysSincePush <= 180) {
      activityPoints = 7;
      activityExplanation = 'Repository had activity within the last 6 months.';
    } else {
      suggestions.push('The repository appears inactive. Consider updating dependencies or documenting maintenance status.');
    }
  }

  score += activityPoints;
  criteria.push({
    id: 'activity',
    label: 'Recent Activity',
    passed: activityPoints > 0,
    pointsEarned: activityPoints,
    maxPoints: 15,
    explanation: activityExplanation
  });

  // 4. Description and/or topics present: 10 points
  const hasDescOrTopics = !!data.repo.description || (data.repo.topics && data.repo.topics.length > 0);
  if (hasDescOrTopics) {
    score += 10;
    criteria.push({
      id: 'description',
      label: 'Description & Topics',
      passed: true,
      pointsEarned: 10,
      maxPoints: 10,
      explanation: 'Repository has a description and/or topics.'
    });
  } else {
    criteria.push({
      id: 'description',
      label: 'Description & Topics',
      passed: false,
      pointsEarned: 0,
      maxPoints: 10,
      explanation: 'Missing description and topics.'
    });
    suggestions.push('Add repository description and topics so others can discover the project.');
  }

  // 5. Issues enabled: 10 points
  if (data.repo.has_issues) {
    score += 10;
    criteria.push({
      id: 'issues',
      label: 'Issues Enabled',
      passed: true,
      pointsEarned: 10,
      maxPoints: 10,
      explanation: 'Issue tracker is enabled.'
    });
  } else {
    criteria.push({
      id: 'issues',
      label: 'Issues Enabled',
      passed: false,
      pointsEarned: 0,
      maxPoints: 10,
      explanation: 'Issue tracker is disabled.'
    });
    suggestions.push('Enable issues to allow users to report bugs or request features.');
  }

  // 6. Language data present: 10 points
  const hasLanguages = Object.keys(data.languages).length > 0;
  if (hasLanguages) {
    score += 10;
    criteria.push({
      id: 'languages',
      label: 'Language Data',
      passed: true,
      pointsEarned: 10,
      maxPoints: 10,
      explanation: 'Language statistics are available.'
    });
  } else {
    criteria.push({
      id: 'languages',
      label: 'Language Data',
      passed: false,
      pointsEarned: 0,
      maxPoints: 10,
      explanation: 'No language statistics available.'
    });
    suggestions.push('Add language-specific setup instructions.');
  }

  // 7. GitHub Actions workflow detected: 10 points
  if (data.hasWorkflows) {
    score += 10;
    criteria.push({
      id: 'workflows',
      label: 'CI/CD Workflows',
      passed: true,
      pointsEarned: 10,
      maxPoints: 10,
      explanation: 'GitHub Actions workflows detected.'
    });
  } else {
    criteria.push({
      id: 'workflows',
      label: 'CI/CD Workflows',
      passed: false,
      pointsEarned: 0,
      maxPoints: 10,
      explanation: 'No GitHub Actions workflows found.'
    });
    suggestions.push('Consider setting up GitHub Actions for tests or linting.');
  }

  // 8. Repository has useful metadata: 5 points
  const hasUsefulMetadata = !!data.repo.homepage || data.repo.stargazers_count > 0 || data.repo.forks_count > 0;
  if (hasUsefulMetadata) {
    score += 5;
    criteria.push({
      id: 'metadata',
      label: 'Useful Metadata',
      passed: true,
      pointsEarned: 5,
      maxPoints: 5,
      explanation: 'Repository has homepage, stars, or forks.'
    });
  } else {
    criteria.push({
      id: 'metadata',
      label: 'Useful Metadata',
      passed: false,
      pointsEarned: 0,
      maxPoints: 5,
      explanation: 'Missing homepage and engagement metrics.'
    });
  }

  // 9. Contribution Guidelines: 5 points
  if (data.hasContributing) {
    score += 5;
    criteria.push({
      id: 'contributing',
      label: 'Contribution Guidelines',
      passed: true,
      pointsEarned: 5,
      maxPoints: 5,
      explanation: 'CONTRIBUTING.md file is present.'
    });
  } else {
    criteria.push({
      id: 'contributing',
      label: 'Contribution Guidelines',
      passed: false,
      pointsEarned: 0,
      maxPoints: 5,
      explanation: 'No CONTRIBUTING.md found.'
    });
    suggestions.push('Add a CONTRIBUTING.md file to help new developers get started.');
  }

  // 10. Security Policy: 5 points
  if (data.hasSecurity) {
    score += 5;
    criteria.push({
      id: 'security',
      label: 'Security Policy',
      passed: true,
      pointsEarned: 5,
      maxPoints: 5,
      explanation: 'SECURITY.md file is present.'
    });
  } else {
    criteria.push({
      id: 'security',
      label: 'Security Policy',
      passed: false,
      pointsEarned: 0,
      maxPoints: 5,
      explanation: 'No SECURITY.md found.'
    });
    suggestions.push('Add a SECURITY.md file detailing how to report vulnerabilities.');
  }

  // Calculate grade
  let grade: HealthScoreResult['grade'] = 'Needs Work';
  if (score >= 85) {
    grade = 'Excellent';
  } else if (score >= 70) {
    grade = 'Good';
  } else if (score >= 50) {
    grade = 'Fair';
  }

  // Penalize archived repos
  if (data.repo.archived) {
    suggestions.unshift('This repository is archived and read-only. Consider unarchiving it or creating a new maintained fork.');
    grade = 'Needs Work';
  }

  return {
    score,
    grade,
    criteria,
    suggestions
  };
}
