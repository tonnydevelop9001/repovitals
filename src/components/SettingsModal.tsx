import { useState, useEffect } from 'react';
import { X, Key, ExternalLink } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [token, setToken] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const storedToken = localStorage.getItem('github_token');
      if (storedToken) setToken(storedToken);
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (token.trim()) {
      localStorage.setItem('github_token', token.trim());
    } else {
      localStorage.removeItem('github_token');
    }
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#141414',
          border: '1px solid #2e2e2e',
          borderRadius: 16,
          width: '100%',
          maxWidth: 500,
          padding: 32,
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'transparent',
            border: 'none',
            color: '#888',
            cursor: 'pointer',
            padding: 4,
          }}
          title="Close"
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: '#2a2a2a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Key size={20} color="#34d399" />
          </div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#f0f0f0' }}>API Settings</h2>
        </div>

        <p style={{ fontSize: 14, color: '#aaa', lineHeight: 1.5, marginBottom: 24 }}>
          GitHub's public API limits unauthenticated users to 60 requests per hour. Add a Personal Access Token to increase your limit to 5,000 requests per hour.
        </p>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#e8e8e8', marginBottom: 8 }}>
            GitHub Personal Access Token
          </label>
          <input
            type="password"
            value={token}
            onChange={e => setToken(e.target.value)}
            placeholder="ghp_..."
            style={{
              width: '100%',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: 10,
              padding: '12px 16px',
              color: '#fff',
              fontSize: 14,
              fontFamily: "'JetBrains Mono', monospace",
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a
            href="https://github.com/settings/tokens/new?description=RepoVitals"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 13,
              color: '#34d399',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            Generate a token <ExternalLink size={12} />
          </a>
          
          <button
            onClick={handleSave}
            style={{
              background: saved ? '#059669' : '#e8e8e8',
              color: saved ? '#fff' : '#000',
              border: 'none',
              borderRadius: 8,
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {saved ? 'Saved!' : 'Save Token'}
          </button>
        </div>
        
        <p style={{ fontSize: 11, color: '#555', marginTop: 24, textAlign: 'center' }}>
          Your token is stored locally in your browser and is never sent anywhere except directly to GitHub's API.
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
