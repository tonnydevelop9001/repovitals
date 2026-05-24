export function LoadingState() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 800,
        margin: '0 auto',
        padding: '80px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Spinner */}
      <div style={{ position: 'relative', width: 48, height: 48 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid #10b98120',
            borderTopColor: '#10b981',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 6,
            borderRadius: '50%',
            border: '2px solid #10b98110',
            borderTopColor: '#34d399',
            animation: 'spin 1.2s linear infinite reverse',
          }}
        />
      </div>

      <p style={{ color: '#d0d0d0', fontWeight: 600, fontSize: 15, marginTop: 20, marginBottom: 6 }}>
        Analyzing repository…
      </p>
      <p style={{ color: '#555', fontSize: 13, textAlign: 'center', maxWidth: 340 }}>
        Fetching data from GitHub API and running health checks.
      </p>

      {/* Skeleton */}
      <div
        style={{
          width: '100%',
          marginTop: 48,
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: 16,
          opacity: 0.25,
          pointerEvents: 'none',
        }}
      >
        {[140, 200, 120].map((h, i) => (
          <div
            key={i}
            style={{
              gridColumn: i === 0 ? 1 : i === 1 ? 2 : 1,
              gridRow: i === 0 ? '1' : i === 1 ? '1 / 3' : '2',
              height: h,
              background: '#1a1a1a',
              border: '1px solid #222',
              borderRadius: 14,
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
