import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Scale } from 'lucide-react';

interface RepoSearchFormProps {
  onSearch: (urls: string[]) => void;
  isLoading: boolean;
}

const EXAMPLES = [
  'vercel/next.js',
  'facebook/react',
  'tailwindlabs/tailwindcss',
  'vitejs/vite',
];

type SearchMode = 'single' | 'compare';

export function RepoSearchForm({ onSearch, isLoading }: RepoSearchFormProps) {
  const [mode, setMode] = useState<SearchMode>('single');
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [focused1, setFocused1] = useState(false);
  const [focused2, setFocused2] = useState(false);
  
  const inputRef1 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef1.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'single' && url1.trim()) {
      onSearch([url1.trim()]);
    } else if (mode === 'compare' && url1.trim() && url2.trim()) {
      onSearch([url1.trim(), url2.trim()]);
    }
  };

  const isSubmitDisabled = isLoading || !url1.trim() || (mode === 'compare' && !url2.trim());

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
      {/* Mode Toggle */}
      <div className="fade-up" style={{ marginBottom: 32 }}>
        <div
          style={{
            display: 'inline-flex',
            background: '#141414',
            border: '1px solid #2e2e2e',
            borderRadius: 99,
            padding: 4,
            gap: 4,
          }}
        >
          <button
            type="button"
            onClick={() => setMode('single')}
            style={{
              padding: '6px 16px',
              borderRadius: 99,
              border: 'none',
              background: mode === 'single' ? '#222' : 'transparent',
              color: mode === 'single' ? '#fff' : '#888',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Analyze
          </button>
          <button
            type="button"
            onClick={() => setMode('compare')}
            style={{
              padding: '6px 16px',
              borderRadius: 99,
              border: 'none',
              background: mode === 'compare' ? '#222' : 'transparent',
              color: mode === 'compare' ? '#fff' : '#888',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'Inter, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Scale size={14} />
            Compare
            <span
              style={{
                background: 'linear-gradient(135deg, #059669, #10b981)',
                color: '#fff',
                fontSize: 9,
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: 99,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                boxShadow: '0 0 10px #05966950',
              }}
            >
              New
            </span>
          </button>
        </div>
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
        {mode === 'single' ? 'GitHub repo health, ' : 'Compare repositories, '}
        <span
          style={{
            background: 'linear-gradient(90deg, #34d399, #059669)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {mode === 'single' ? 'at a glance.' : 'side by side.'}
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
        {mode === 'single' 
          ? 'Paste any public GitHub URL and get an instant health score — checks docs, license, activity, CI setup, and more.'
          : 'Enter two repositories to compare their health scores, tech stacks, and maintainability metrics.'}
      </p>

      {/* Search form */}
      <form
        onSubmit={handleSubmit}
        className="fade-up fade-up-delay-2"
        style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        {/* First Input */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            background: '#1a1a1a',
            border: `1px solid ${focused1 ? '#059669' : '#2e2e2e'}`,
            borderRadius: 14,
            padding: '6px 6px 6px 16px',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            boxShadow: focused1 ? '0 0 0 3px #05966920' : 'none',
            alignItems: 'center',
          }}
        >
          <span
            className="mono"
            style={{ color: '#34d399', fontSize: 14, fontWeight: 500, flexShrink: 0, userSelect: 'none' }}
          >
            github.com/
          </span>
          <input
            ref={inputRef1}
            type="text"
            value={url1}
            onChange={e => setUrl1(e.target.value)}
            onFocus={() => setFocused1(true)}
            onBlur={() => setFocused1(false)}
            placeholder={mode === 'compare' ? "owner/repo-1" : "owner/repo or full URL"}
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
          
          {mode === 'single' && (
            <button
              type="submit"
              disabled={isSubmitDisabled}
              style={{
                background: isSubmitDisabled ? '#1e3a30' : 'linear-gradient(135deg, #059669, #10b981)',
                color: isSubmitDisabled ? '#34d39980' : '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '10px 18px',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                cursor: isSubmitDisabled ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.15s ease',
                flexShrink: 0,
                letterSpacing: '0.01em',
                boxShadow: isSubmitDisabled ? 'none' : '0 2px 8px #05966940',
              }}
            >
              {isLoading ? 'Scanning…' : 'Analyze'}
              {!isLoading && <ArrowRight size={13} strokeWidth={2.5} />}
            </button>
          )}
        </div>

        {/* Second Input for Compare Mode */}
        {mode === 'compare' && (
          <div
            className="fade-up"
            style={{
              display: 'flex',
              gap: 8,
              background: '#1a1a1a',
              border: `1px solid ${focused2 ? '#059669' : '#2e2e2e'}`,
              borderRadius: 14,
              padding: '6px 6px 6px 16px',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              boxShadow: focused2 ? '0 0 0 3px #05966920' : 'none',
              alignItems: 'center',
            }}
          >
            <span
              className="mono"
              style={{ color: '#34d399', fontSize: 14, fontWeight: 500, flexShrink: 0, userSelect: 'none' }}
            >
              github.com/
            </span>
            <input
              type="text"
              value={url2}
              onChange={e => setUrl2(e.target.value)}
              onFocus={() => setFocused2(true)}
              onBlur={() => setFocused2(false)}
              placeholder="owner/repo-2"
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
              disabled={isSubmitDisabled}
              style={{
                background: isSubmitDisabled ? '#1e3a30' : 'linear-gradient(135deg, #059669, #10b981)',
                color: isSubmitDisabled ? '#34d39980' : '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '10px 18px',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                cursor: isSubmitDisabled ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.15s ease',
                flexShrink: 0,
                letterSpacing: '0.01em',
                boxShadow: isSubmitDisabled ? 'none' : '0 2px 8px #05966940',
              }}
            >
              {isLoading ? 'Scanning…' : 'Compare'}
              {!isLoading && <ArrowRight size={13} strokeWidth={2.5} />}
            </button>
          </div>
        )}
      </form>

      {/* Example links */}
      {mode === 'single' && (
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
              type="button"
              onClick={() => {
                setUrl1(`https://github.com/${ex}`);
                onSearch([`https://github.com/${ex}`]);
              }}
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
      )}
    </div>
  );
}
