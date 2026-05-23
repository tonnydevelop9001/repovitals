import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

interface RepoSearchFormProps {
  onSearch: (url: string) => void;
  isLoading: boolean;
}

export function RepoSearchForm({ onSearch, isLoading }: RepoSearchFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSearch(url);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 mb-16 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
          Check Your Repo's <span className="text-primary-600">Health</span>
        </h1>
        <p className="text-lg text-text-muted">
          Instantly analyze your open-source GitHub repository and get actionable insights to improve its maintainability and discoverability.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/owner/repo"
          required
          disabled={isLoading}
          className="block w-full pl-12 pr-32 py-4 text-lg bg-card-bg border-2 border-border-color rounded-2xl focus:ring-0 focus:border-primary-500 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-text-main placeholder-gray-400"
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>{isLoading ? 'Scanning...' : 'Analyze'}</span>
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <span className="text-sm text-text-muted">Try an example: </span>
        <button
          onClick={() => setUrl('https://github.com/vercel/next.js')}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors cursor-pointer"
        >
          vercel/next.js
        </button>
      </div>
    </div>
  );
}
