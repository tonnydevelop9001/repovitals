import { describe, it, expect } from 'vitest';
import { parseGitHubUrl } from '../src/utils/parseGitHubUrl';
import { formatNumber } from '../src/utils/formatters';
import { scoreRepository } from '../src/utils/scoreRepository';
import { mockRepoData } from './fixtures';

describe('parseGitHubUrl', () => {
  it('parses valid standard URL', () => {
    expect(parseGitHubUrl('https://github.com/vercel/next.js')).toEqual({ owner: 'vercel', repo: 'next.js' });
  });

  it('parses URL without protocol', () => {
    expect(parseGitHubUrl('github.com/facebook/react')).toEqual({ owner: 'facebook', repo: 'react' });
  });

  it('parses URL with .git suffix', () => {
    expect(parseGitHubUrl('https://github.com/facebook/react.git')).toEqual({ owner: 'facebook', repo: 'react' });
  });

  it('rejects non-github URLs', () => {
    expect(parseGitHubUrl('https://gitlab.com/owner/repo')).toBeNull();
  });

  it('rejects URLs without repo', () => {
    expect(parseGitHubUrl('https://github.com/owner')).toBeNull();
  });
});

describe('formatters', () => {
  it('formats large numbers', () => {
    expect(formatNumber(1200)).toBe('1.2k');
    expect(formatNumber(1500000)).toBe('1.5M');
    expect(formatNumber(999)).toBe('999');
  });
});

describe('scoreRepository', () => {
  it('gives perfect score for ideal repo', () => {
    const result = scoreRepository(mockRepoData);
    expect(result.score).toBe(100);
    // README: 20
    // License: 15
    // Activity: 15
    // Description/Topics: 10
    // Issues: 10
    // Languages: 10
    // Workflows: 10
    // Metadata: 10
    // Total max: 20+15+15+10+10+10+10+10 = 100
  });

  it('penalizes missing readme', () => {
    const data = { ...mockRepoData, hasReadme: false };
    const result = scoreRepository(data);
    expect(result.score).toBeLessThan(100);
    expect(result.criteria.find(c => c.id === 'readme')?.passed).toBe(false);
  });

  it('penalizes archived repo', () => {
    const data = { ...mockRepoData, repo: { ...mockRepoData.repo, archived: true } };
    const result = scoreRepository(data);
    expect(result.grade).toBe('Needs Work');
    expect(result.suggestions[0]).toContain('archived');
  });
});
