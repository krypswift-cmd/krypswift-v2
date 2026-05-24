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

    // Four open-space zones — all within y:15-48% (below eyebrow, above mobile text areas)
    switch (zone) {
      case 0: x = 48 + r2 * 34; y = 15 + r3 * 22; break; // upper-right  (x:48-82%, y:15-37%)
      case 1: x = 20 + r2 * 28; y = 15 + r3 * 18; break; // upper-left   (x:20-48%, y:15-33%)
      case 2: x = 58 + r2 * 26; y = 28 + r3 * 20; break; // right-center (x:58-84%, y:28-48%)
      default: x = 30 + r2 * 36; y = 22 + r3 * 16; break; // center-upper (x:30-66%, y:22-38%)
    }
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

  if (!strings) return null;

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
            className="ambient-glyph"
            style={{
              position: 'absolute',
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              fontFamily: "'Noto Sans Mono', 'JetBrains Mono', 'Segoe UI Symbol', 'Apple Symbols', system-ui, monospace",
              fontSize: '11px',
              color: '#00F0FF',
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
