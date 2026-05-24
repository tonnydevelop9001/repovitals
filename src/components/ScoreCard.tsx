import { useEffect, useRef } from 'react';
import type { HealthScoreResult } from '../types/health';

interface ScoreCardProps {
  result: HealthScoreResult;
  isWinner?: boolean;
}

function getScoreColor(score: number) {
  if (score >= 85) return '#10b981';
  if (score >= 70) return '#f59e0b';
  if (score >= 50) return '#f97316';
  return '#ef4444';
}

export function ScoreCard({ result, isWinner }: ScoreCardProps) {
  const { score, grade } = result;
  const color = getScoreColor(score);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (ringRef.current) {
      // Animate the ring on mount
      ringRef.current.style.strokeDashoffset = String(circumference);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (ringRef.current) {
            ringRef.current.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)';
            ringRef.current.style.strokeDashoffset = String(offset);
          }
        });
      });
    }
  }, [score, circumference, offset]);

  return (
    <div
      style={{
        background: '#141414',
        border: '1px solid #222',
        borderRadius: 16,
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top glow matching score color */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 200,
          height: 80,
          borderRadius: '50%',
          background: `${color}18`,
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      {isWinner && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#000',
            fontSize: 9,
            fontWeight: 800,
            padding: '3px 8px',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            boxShadow: '0 0 12px #f59e0b40',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            zIndex: 10,
          }}
        >
          👑 Leader
        </div>
      )}

      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.1em',
          color: '#555',
          textTransform: 'uppercase',
          marginBottom: 20,
        }}
      >
        Health Score
      </p>

      {/* SVG ring */}
      <div style={{ position: 'relative', width: 140, height: 140 }}>
        <svg
          viewBox="0 0 120 120"
          style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}
        >
          {/* Track */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#222"
            strokeWidth="8"
          />
          {/* Progress */}
          <circle
            ref={ringRef}
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{
              filter: `drop-shadow(0 0 6px ${color}80)`,
            }}
          />
        </svg>
        {/* Center text */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: 38,
              fontWeight: 800,
              color: color,
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            {score}
          </span>
          <span style={{ fontSize: 12, color: '#444', marginTop: 2 }}>/100</span>
        </div>
      </div>

      {/* Grade badge */}
      <div style={{ marginTop: 18 }}>
        <span
          style={{
            background: `${color}18`,
            border: `1px solid ${color}40`,
            color,
            borderRadius: 99,
            padding: '4px 14px',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {grade}
        </span>
      </div>
    </div>
  );
}
