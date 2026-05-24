import type { HealthCriterion } from '../types/health';

interface HealthChecklistProps {
  criteria: HealthCriterion[];
}

export function HealthChecklist({ criteria }: HealthChecklistProps) {
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
          Health Checklist
        </span>
        <span style={{ fontSize: 12, color: '#555' }}>
          {criteria.filter(c => c.passed).length}/{criteria.length} passed
        </span>
      </div>

      <div>
        {criteria.map((item, idx) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
              padding: '14px 20px',
              borderBottom: idx < criteria.length - 1 ? '1px solid #1a1a1a' : 'none',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = '#1a1a1a')}
            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'transparent')}
          >
            {/* Pass/fail dot */}
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: item.passed ? '#05966920' : '#ef444420',
                border: `1.5px solid ${item.passed ? '#059669' : '#ef4444'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              {item.passed ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  flexWrap: 'wrap',
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#d0d0d0',
                  }}
                >
                  {item.label}
                </span>
                <span
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: item.passed ? '#10b98180' : '#ef444480',
                    background: item.passed ? '#05966912' : '#ef444412',
                    border: `1px solid ${item.passed ? '#05966930' : '#ef444430'}`,
                    borderRadius: 4,
                    padding: '1px 6px',
                    flexShrink: 0,
                  }}
                >
                  {item.pointsEarned}/{item.maxPoints}
                </span>
              </div>
              <p style={{ fontSize: 12, color: '#555', lineHeight: 1.5, margin: 0 }}>
                {item.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
