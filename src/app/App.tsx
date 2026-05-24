import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { RepoSearchForm } from '../components/RepoSearchForm';
import { LoadingState } from '../components/LoadingState';
import { ErrorMessage } from '../components/ErrorMessage';
import { ScoreCard } from '../components/ScoreCard';
import { RepoSummary } from '../components/RepoSummary';
import { HealthChecklist } from '../components/HealthChecklist';
import { LanguageBreakdown } from '../components/LanguageBreakdown';
import { SuggestionsList } from '../components/SuggestionsList';

import { parseGitHubUrl } from '../utils/parseGitHubUrl';
import { fetchRepositoryData } from '../services/githubApi';
import { scoreRepository } from '../utils/scoreRepository';
import type { RepositoryData } from '../types/github';
import type { HealthScoreResult } from '../types/health';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reposData, setReposData] = useState<RepositoryData[]>([]);
  const [healthResults, setHealthResults] = useState<HealthScoreResult[]>([]);
  const [mode, setMode] = useState<'single' | 'compare'>('single');

  const handleSearch = async (urls: string[]) => {
    // Validate URLs
    const parsedUrls = urls.map(parseGitHubUrl);
    if (parsedUrls.some(p => !p)) {
      setError('Invalid GitHub URL provided. Please enter a valid repository URL (e.g., https://github.com/owner/repo).');
      return;
    }

    setIsLoading(true);
    setError(null);
    setReposData([]);
    setHealthResults([]);
    setMode(urls.length > 1 ? 'compare' : 'single');

    try {
      // Fetch all concurrently
      const fetchedData = await Promise.all(
        parsedUrls.map(parsed => fetchRepositoryData(parsed!.owner, parsed!.repo))
      );
      
      const scores = fetchedData.map(data => scoreRepository(data));
      
      setReposData(fetchedData);
      setHealthResults(scores);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while analyzing the repository.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReposData([]);
    setHealthResults([]);
    setError(null);
  };

  const renderSingleRepo = (repoData: RepositoryData, healthResult: HealthScoreResult) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
        gap: 14,
      }}
    >
      {/* Left column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <ScoreCard result={healthResult} />
        <RepoSummary repo={repoData.repo} />
        <LanguageBreakdown languages={repoData.languages} />
      </div>

      {/* Right column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <SuggestionsList suggestions={healthResult.suggestions} />
        <HealthChecklist criteria={healthResult.criteria} />
      </div>
    </div>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#0f0f0f',
        color: '#e8e8e8',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <Header />

      <main style={{ flex: 1, width: '100%' }}>
        {/* Hero / search */}
        {reposData.length === 0 && !isLoading && (
          <div
            style={{
              background: 'radial-gradient(ellipse 70% 40% at 50% 0%, #05966922 0%, transparent 70%)',
            }}
          >
            <RepoSearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>
        )}

        {isLoading && <LoadingState />}

        {error && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ErrorMessage message={error} />
            <button
              onClick={handleReset}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#555',
                fontSize: 13,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                padding: '4px 8px',
                borderRadius: 6,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = '#e8e8e8')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = '#555')}
            >
              ← Back to search
            </button>
          </div>
        )}

        {reposData.length > 0 && healthResults.length > 0 && !isLoading && !error && (
          <div
            style={{
              maxWidth: mode === 'compare' ? 1400 : 1100,
              margin: '0 auto',
              padding: '32px 24px 64px',
              animation: 'fadeUp 0.4s ease forwards',
            }}
          >
            {/* Header section with Reset button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 28,
              }}
            >
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: '#fff' }}>
                {mode === 'single' ? 'Analysis Result' : 'Comparison Results'}
              </h2>
              <button
                id="new-search-btn"
                onClick={handleReset}
                style={{
                  background: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: 10,
                  color: '#888',
                  fontSize: 13,
                  fontWeight: 500,
                  padding: '8px 16px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  fontFamily: 'Inter, sans-serif',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = '#e8e8e8';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#3a3a3a';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = '#888';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#2a2a2a';
                }}
              >
                ← New search
              </button>
            </div>

            {mode === 'single' ? (
              // Single Mode View
              <div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: '#f0f0f0' }}>
                      {reposData[0].repo.full_name}
                    </h2>
                    {reposData[0].repo.archived && (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          background: '#f59e0b18',
                          border: '1px solid #f59e0b40',
                          color: '#f59e0b',
                          borderRadius: 99,
                          padding: '2px 8px',
                          textTransform: 'uppercase',
                        }}
                      >
                        Archived
                      </span>
                    )}
                  </div>
                  {reposData[0].repo.description && (
                    <p style={{ fontSize: 13, color: '#666', margin: '6px 0 0', maxWidth: 600 }}>
                      {reposData[0].repo.description}
                    </p>
                  )}
                </div>
                {renderSingleRepo(reposData[0], healthResults[0])}
              </div>
            ) : (
              // Compare Mode View
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
                  gap: 24,
                }}
              >
                {reposData.map((repoData, index) => (
                  <div key={repoData.repo.full_name} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Repo Header inside column */}
                    <div
                      style={{
                        background: '#141414',
                        border: '1px solid #222',
                        borderRadius: 16,
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}
                    >
                      <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: '#f0f0f0' }}>
                        {repoData.repo.full_name}
                      </h2>
                      {repoData.repo.description && (
                        <p style={{ fontSize: 12, color: '#666', margin: '8px 0 0', lineHeight: 1.4 }}>
                          {repoData.repo.description}
                        </p>
                      )}
                    </div>
                    {/* Reuse single view layout but constrained within the column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <ScoreCard result={healthResults[index]} />
                      <RepoSummary repo={repoData.repo} />
                      <LanguageBreakdown languages={repoData.languages} />
                      <SuggestionsList suggestions={healthResults[index].suggestions} />
                      <HealthChecklist criteria={healthResults[index].criteria} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* About the score note */}
            <div
              style={{
                marginTop: 32,
                background: '#141414',
                border: '1px solid #1e1e1e',
                borderRadius: 12,
                padding: '16px 20px',
                maxWidth: 700,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <p style={{ fontSize: 12, color: '#444', margin: 0, lineHeight: 1.6, textAlign: 'center' }}>
                This score is a heuristic based on common open-source best practices — README, license, activity, CI/CD. 
                It's not a definitive quality rating. All checks run in your browser via the public GitHub API.
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;
