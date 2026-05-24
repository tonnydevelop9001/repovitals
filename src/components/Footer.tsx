export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid #1a1a1a',
        padding: '24px',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <p style={{ fontSize: 12, color: '#444', margin: 0 }}>
          RepoVitals — not affiliated with GitHub.
        </p>
        <p style={{ fontSize: 12, color: '#333', margin: 0 }}>
          MIT License ·{' '}
          <a
            href="https://github.com/tonnydevelop9001/repovitals"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#555', textDecoration: 'none' }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#10b981')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#555')}
          >
            View source
          </a>
        </p>
      </div>
    </footer>
  );
}
