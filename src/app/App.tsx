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
  const [repoData, setRepoData] = useState<RepositoryData | null>(null);
  const [healthResult, setHealthResult] = useState<HealthScoreResult | null>(null);

  const handleSearch = async (url: string) => {
    const parsed = parseGitHubUrl(url);
    if (!parsed) {
      setError('Invalid GitHub URL. Please enter a valid repository URL (e.g., https://github.com/owner/repo).');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRepoData(null);
    setHealthResult(null);

    try {
      const data = await fetchRepositoryData(parsed.owner, parsed.repo);
      const result = scoreRepository(data);
      setRepoData(data);
      setHealthResult(result);
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

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary-100 selection:text-primary-900 dark:selection:bg-primary-900 dark:selection:text-primary-100">
      <Header />
      
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!repoData && !isLoading && (
          <RepoSearchForm onSearch={handleSearch} isLoading={isLoading} />
        )}

        {isLoading && <LoadingState />}

        {error && (
          <div className="flex flex-col items-center">
            <ErrorMessage message={error} />
            {!repoData && (
              <button 
                onClick={() => setError(null)}
                className="mt-4 text-primary-600 hover:underline"
              >
                &larr; Back to search
              </button>
            )}
          </div>
        )}

        {repoData && healthResult && !isLoading && !error && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-text-main break-all">
                  {repoData.repo.full_name}
                </h2>
                {repoData.repo.description && (
                  <p className="text-text-muted mt-2 text-lg max-w-3xl">
                    {repoData.repo.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  setRepoData(null);
                  setHealthResult(null);
                }}
                className="text-sm font-medium text-text-muted hover:text-text-main transition-colors px-4 py-2 border border-border-color rounded-lg bg-card-bg shadow-sm"
              >
                New Search
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-1 space-y-6">
                <ScoreCard result={healthResult} />
                <RepoSummary repo={repoData.repo} />
                <LanguageBreakdown languages={repoData.languages} />
              </div>

              {/* Right Column */}
              <div className="lg:col-span-2 space-y-6">
                <SuggestionsList suggestions={healthResult.suggestions} />
                <HealthChecklist criteria={healthResult.criteria} />
              </div>
            </div>
            
            <div className="mt-16 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-2xl p-6 md:p-8 text-center max-w-3xl mx-auto">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">About the Score</h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                RepoVitals uses a simple heuristic model to evaluate repository health based on best practices like having a README, an open-source license, recent activity, and CI/CD workflows. 
                This score is meant to guide improvements and is not a definitive judgment of the project's quality or utility. All checks are performed locally in your browser using the public GitHub REST API.
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
