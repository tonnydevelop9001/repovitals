interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      style={{
        maxWidth: 560,
        width: '100%',
        margin: '48px auto',
        padding: '0 24px',
      }}
    >
      <div
        style={{
          background: '#1a0f0f',
          border: '1px solid #ef444430',
          borderRadius: 14,
          padding: '20px 20px',
        }}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: '#ef444418',
              border: '1px solid #ef444430',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#f87171', margin: '0 0 6px' }}>
              Analysis failed
            </p>
            <p style={{ fontSize: 13, color: '#888', margin: 0, lineHeight: 1.5 }}>{message}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                style={{
                  marginTop: 14,
                  background: 'transparent',
                  border: '1px solid #ef444440',
                  borderRadius: 8,
                  color: '#f87171',
                  fontSize: 12,
                  fontWeight: 500,
                  padding: '6px 12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Try again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
