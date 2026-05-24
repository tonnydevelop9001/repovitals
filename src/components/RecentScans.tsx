import type { ScanHistoryItem } from '../utils/history';
import { formatRelativeTime } from '../utils/formatters';
import { Clock, Scale, Trash2 } from 'lucide-react';

interface RecentScansProps {
  history: ScanHistoryItem[];
  onSelect: (urls: string[]) => void;
  onClear: () => void;
}

export function RecentScans({ history, onSelect, onClear }: RecentScansProps) {
  if (history.length === 0) return null;

  return (
    <div
      className="fade-up fade-up-delay-3"
      style={{
        maxWidth: 800,
        margin: '40px auto 0',
        padding: '0 24px',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#888', display: 'flex', alignItems: 'center', gap: 6, margin: 0 }}>
          <Clock size={14} />
          Recent Scans
        </h3>
        <button
          onClick={onClear}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#555',
            fontSize: 12,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '4px 8px',
            borderRadius: 6,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.color = '#ef4444';
            (e.currentTarget as HTMLButtonElement).style.background = '#ef444415';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.color = '#555';
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          }}
          title="Clear history"
        >
          <Trash2 size={12} />
          Clear
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 12,
        }}
      >
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.urls)}
            style={{
              background: '#141414',
              border: '1px solid #2a2a2a',
              borderRadius: 12,
              padding: 16,
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#34d39960';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#2a2a2a';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#e8e8e8',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {item.mode === 'compare' && <Scale size={12} color="#34d399" />}
                {item.repoNames.join(' vs ')}
              </span>
              
              {item.mode === 'single' && (
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: 6,
                    background: '#222',
                    color: item.grade === 'Excellent' ? '#34d399' : item.grade === 'Good' ? '#fbbf24' : '#ef4444',
                    marginLeft: 8,
                  }}
                >
                  {item.grade === 'Excellent' ? 'A' : item.grade === 'Good' ? 'B' : 'C'}
                </span>
              )}
            </div>
            
            <span style={{ fontSize: 11, color: '#666' }}>
              {formatRelativeTime(new Date(item.timestamp).toISOString())}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
