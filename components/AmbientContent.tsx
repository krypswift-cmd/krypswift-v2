'use client';

import { ambientContent, AmbientAct } from '@/config/ambientContent';

// Deterministic LCG to produce stable positions without React state
function lcgRand(seed: number): () => number {
  let s = seed;
  return () => {
    s = ((s * 1664525 + 1013904223) | 0) >>> 0;
    return s / 4294967295;
  };
}

function glyphPositions(actIndex: number, count: number): Array<{ x: number; y: number }> {
  const rand = lcgRand(actIndex * 997 + 42);

  return Array.from({ length: count }, (_, i) => {
    const zone = Math.floor(rand() * 4);
    rand(); // consume extra to space out values between items
    const r2 = rand();
    const r3 = rand();
    let x: number, y: number;

    // Four corner zones — avoids central headline/CTA area
    switch (zone) {
      case 0: x = 4  + r2 * 14; y = 6  + r3 * 16; break; // top-left (below eyebrow)
      case 1: x = 20 + r2 * 42; y = 4  + r3 * 14; break; // top-center
      case 2: x = 4  + r2 * 12; y = 78 + r3 * 14; break; // bottom-left corner
      default: x = 80 + r2 * 14; y = 76 + r3 * 16; break; // bottom-right corner
    }
    // Clamp within [2, 94] to stay inside the viewport
    x = Math.max(2, Math.min(94, x));
    y = Math.max(3, Math.min(94, y));
    return { x, y };
  });
}

interface AmbientContentProps {
  act: 1 | 2 | 3 | 4 | 5;
}

export default function AmbientContent({ act }: AmbientContentProps) {
  const key: AmbientAct = `act${act}`;
  const strings = ambientContent[key];

  if (!strings || strings.length === 0) return null;

  const positions = glyphPositions(act, strings.length);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      {strings.map((glyph, idx) => {
        const pos = positions[idx];
        return (
          <span
            key={idx}
            style={{
              position: 'absolute',
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              fontFamily: "'JetBrains Mono', 'Noto Sans Mono', 'system-ui', monospace",
              fontSize: '11px',
              color: '#00F0FF',
              opacity: 0.07,
              userSelect: 'none',
              whiteSpace: 'nowrap',
              lineHeight: 1,
            }}
          >
            {glyph}
          </span>
        );
      })}
    </div>
  );
}
