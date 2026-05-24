interface SuggestionsListProps {
  suggestions: string[];
}

export function SuggestionsList({ suggestions }: SuggestionsListProps) {
  if (suggestions.length === 0) {
    return (
      <div
        style={{
          background: '#141414',
          border: '1px solid #222',
          borderRadius: 16,
          padding: '20px',
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#555',
            display: 'block',
            marginBottom: 12,
          }}
        >
          Suggestions
        </span>
        <div
          style={{
            background: '#05966912',
            border: '1px solid #05966930',
            borderRadius: 10,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ fontSize: 18 }}>🎉</span>
          <p style={{ fontSize: 13, color: '#10b981', margin: 0, lineHeight: 1.5 }}>
            No issues found. Your repository looks well-maintained!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: '#141414',
        border: '1px solid #222',
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid #1e1e1e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#555',
          }}
        >
          What to fix
        </span>
        <span
          style={{
            background: '#f59e0b18',
            border: '1px solid #f59e0b40',
            color: '#f59e0b',
            borderRadius: 99,
            padding: '2px 10px',
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {suggestions.length} item{suggestions.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {suggestions.map((suggestion, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: '12px 14px',
              background: '#1a1a1a',
              border: '1px solid #222',
              borderRadius: 10,
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = '#2e2e2e')}
            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = '#222')}
          >
            <span
              className="mono"
              style={{
                width: 20,
                height: 20,
                borderRadius: 6,
                background: '#f59e0b18',
                border: '1px solid #f59e0b40',
                color: '#f59e0b',
                fontSize: 11,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              {idx + 1}
            </span>
            <span style={{ fontSize: 13, color: '#b0b0b0', lineHeight: 1.6 }}>{suggestion}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
