import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Zap } from 'lucide-react';

interface RepoSearchFormProps {
  onSearch: (url: string) => void;
  isLoading: boolean;
}

const EXAMPLES = [
  'vercel/next.js',
  'facebook/react',
  'tailwindlabs/tailwindcss',
  'vitejs/vite',
];

export function RepoSearchForm({ onSearch, isLoading }: RepoSearchFormProps) {
  const [url, setUrl] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // autofocus on mount
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSearch(url.trim());
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 24px 60px',
        maxWidth: 680,
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 12px',
          borderRadius: 99,
          background: '#05966915',
          border: '1px solid #05966940',
          color: '#34d399',
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: 24,
        }}
      >
        <Zap size={11} />
        Free & open source
      </div>

      {/* Headline */}
      <h1
        className="fade-up"
        style={{
          fontSize: 'clamp(32px, 6vw, 52px)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          color: '#f0f0f0',
          textAlign: 'center',
          marginBottom: 16,
        }}
      >
        GitHub repo health,{' '}
        <span
          style={{
            background: 'linear-gradient(90deg, #34d399, #059669)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          at a glance.
        </span>
      </h1>

      {/* Subheading */}
      <p
        className="fade-up fade-up-delay-1"
        style={{
          fontSize: 16,
          color: '#777',
          textAlign: 'center',
          lineHeight: 1.6,
          maxWidth: 480,
          marginBottom: 36,
        }}
      >
        Paste any public GitHub URL and get an instant health score — checks docs,
        license, activity, CI setup, and more.
      </p>

      {/* Search form */}
      <form
        onSubmit={handleSubmit}
        className="fade-up fade-up-delay-2"
        style={{ width: '100%' }}
      >
        <div
          style={{
            display: 'flex',
            gap: 8,
            background: '#1a1a1a',
            border: `1px solid ${focused ? '#059669' : '#2e2e2e'}`,
            borderRadius: 14,
            padding: '6px 6px 6px 16px',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            boxShadow: focused ? '0 0 0 3px #05966920' : 'none',
            alignItems: 'center',
          }}
        >
          {/* Monospace prompt prefix */}
          <span
            className="mono"
            style={{
              color: '#34d399',
              fontSize: 14,
              fontWeight: 500,
              flexShrink: 0,
              userSelect: 'none',
            }}
          >
            github.com/
          </span>
          <input
            ref={inputRef}
            id="repo-url-input"
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="owner/repo or full URL"
            disabled={isLoading}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#e8e8e8',
              fontSize: 14,
              fontFamily: "'JetBrains Mono', monospace",
              opacity: isLoading ? 0.5 : 1,
              minWidth: 0,
            }}
          />
          <button
            type="submit"
            id="analyze-btn"
            disabled={isLoading || !url.trim()}
            style={{
              background: isLoading || !url.trim() ? '#1e3a30' : 'linear-gradient(135deg, #059669, #10b981)',
              color: isLoading || !url.trim() ? '#34d39980' : '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '10px 18px',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              cursor: isLoading || !url.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.15s ease',
              flexShrink: 0,
              letterSpacing: '0.01em',
              boxShadow: isLoading || !url.trim() ? 'none' : '0 2px 8px #05966940',
            }}
          >
            {isLoading ? (
              <>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animation: 'spin 1s linear infinite' }}
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Scanning…
              </>
            ) : (
              <>
                Analyze
                <ArrowRight size={13} strokeWidth={2.5} />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Example links */}
      <div
        className="fade-up fade-up-delay-3"
        style={{
          marginTop: 16,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px 4px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: 12, color: '#555' }}>Try:</span>
        {EXAMPLES.map(ex => (
          <button
            key={ex}
            onClick={() => setUrl(`https://github.com/${ex}`)}
            style={{
              background: 'transparent',
              border: '1px solid #2a2a2a',
              borderRadius: 6,
              color: '#666',
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              padding: '3px 8px',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.color = '#34d399';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#34d39960';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.color = '#666';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#2a2a2a';
            }}
          >
            {ex}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
