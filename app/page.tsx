// LANGUAGE RULES v2.0 — enforced throughout
// DRAW:      "KPS Draw" / "Bonus reward" / "Recipient" / "Loyalty stake"
// STAKING:   "Zero protocol fees" / "Estimated emissions" / "Stake"
// CHARITY:   "DAO whitelist gate" / "Crypto-native public goods" / "Annual release"
// ENTITY:    No "KrypSwift LTD" — use "the protocol" / "the contracts"
// TOKEN:     "Utility token" — never "asset", "security", "stablecoin"
'use client';

import { useState, UIEvent } from 'react';
import dynamic from 'next/dynamic';
import AmbientContent from '@/components/AmbientContent';

const ObsidianBackground = dynamic(
  () => import('@/components/ObsidianBackground'),
  { ssr: false }
);

const TIMELINE_MARKERS = [
  { year: 1,  pct: '2%',   align: 'left'   as const, label: 'Genesis'      },
  { year: 10, pct: '20%',  align: 'center' as const, label: 'Maturation'   },
  { year: 25, pct: '50%',  align: 'center' as const, label: 'Expansion'    },
  { year: 50, pct: '100%', align: 'right'  as const, label: 'Covenant end' },
];

const ALLOCATION_SQUARES = Array.from({ length: 200 }, (_, i) => i);

// Shared social icon links used in both mobile and desktop Act V layouts
const SOCIAL_LINKS = [
  {
    href: 'https://t.me/krypswift',
    label: 'Telegram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.04 9.613c-.152.674-.554.838-1.122.521l-3.1-2.284-1.496 1.44c-.165.165-.304.304-.623.304l.222-3.156 5.74-5.183c.25-.222-.054-.345-.387-.123L6.928 14.49l-3.062-.957c-.666-.208-.68-.666.138-.987l11.96-4.612c.554-.2 1.038.123.858.987l-.262.327z"/>
      </svg>
    ),
  },
  {
    href: 'https://x.com/krypswift',
    label: 'X',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    href: 'https://discord.gg/krypswift',
    label: 'Discord',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
  },
  {
    href: '#',
    label: 'GitHub',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
];

export default function ObsidianTerminal() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<number>(0);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollTop    = target.scrollTop;
    const scrollHeight = target.scrollHeight - target.clientHeight;
    if (scrollHeight > 0) setScrollProgress(scrollTop / scrollHeight);
    setActiveSection(Math.round(scrollTop / target.clientHeight));
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black select-none">

      <ObsidianBackground activeSection={activeSection} scrollProgress={scrollProgress} />

      {/* Portal CTA — top right, replaces UTC clock */}
      <a
        href="https://app.krypswift.com"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary btn-primary-sm fixed top-8 right-6 md:right-16 z-20 backdrop-blur-md"
        style={{ background: 'rgba(10, 10, 12, 0.5)' }}
      >
        Portal
      </a>

      <div className="scroll-container" onScroll={handleScroll}>

        {/* ── ACT I: The Awakening — Hero ── */}
        <section className="relative w-full h-screen flex flex-col justify-between bg-transparent overflow-hidden">
          <AmbientContent act={1} />

          <div className="absolute top-8 left-6 md:top-16 md:left-16 z-10 pt-4 md:pt-8 overflow-hidden max-w-[55%] md:max-w-none">
            <p className="font-mono text-[9px] md:text-[11px] tracking-[0.2em] text-[#00F0FF]/28 uppercase whitespace-nowrap">
              [ KrypSwift · Base · 8453 ]
            </p>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-[58%] md:h-auto md:w-[40%] md:left-[8%] md:top-1/2 md:-translate-y-1/2 flex flex-col justify-center px-6 pb-10 pt-8 md:p-0 z-10 hud-scrim-mask">
            <h1
              className={`font-extralight text-[#E5E5E5] uppercase font-sans leading-[1.05] tracking-[-0.02em] kinetic-reveal ${activeSection === 0 ? 'active' : ''}`}
              style={{ fontSize: 'clamp(38px, 10vw, 72px)', textWrap: 'balance' } as React.CSSProperties}
            >
              The 50-Year<br />Sovereign Engine
            </h1>
            <p className="mt-4 max-w-sm text-[13px] md:text-[14px] font-light tracking-wider text-neutral-400 leading-relaxed">
              Built for absolute resilience. Zero protocol fees. Governed by an immutable constitution and powered by a fixed supply of 50,000,000 KPS.
            </p>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center animate-pulse z-10 block">
            <p className="font-mono text-[10px] tracking-[0.25em] text-[#E5E5E5]/30 uppercase">
              ↓ · Scroll to explore
            </p>
          </div>
        </section>

        {/* ── ACT II: The Pulse — Number-led layout ── */}
        <section className="relative w-full h-screen flex flex-col justify-between bg-transparent border-t border-[rgba(255,255,255,0.02)] overflow-hidden">
          <AmbientContent act={2} />

          <div className="absolute top-8 left-6 md:top-16 md:left-16 z-10 pt-4 md:pt-8 overflow-hidden max-w-[55%] md:max-w-none">
            <p className="font-mono text-[9px] md:text-[11px] tracking-[0.2em] text-[#00F0FF]/28 uppercase whitespace-nowrap">
              [ Bonus rewards · VRF 2.5 ]
            </p>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-[64%] md:h-auto md:w-[44%] md:left-[8%] md:top-1/2 md:-translate-y-1/2 flex flex-col justify-center px-6 pb-10 pt-8 md:p-0 z-10 hud-scrim-mask">
            {/* Dominant number */}
            <span className="font-mono leading-none font-light text-[#00F0FF] tracking-tight" style={{ fontSize: 'clamp(3.5rem, 16vw, 6.5rem)' }}>
              16,666
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#00F0FF]/50 uppercase mt-2 mb-6">
              KPS / month
            </span>

            {/* Stat chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                '[ Draw · monthly ]',
                '[ Wallet cap · 1% ]',
                '[ Claim window · 29 days ]',
              ].map((chip) => (
                <span
                  key={chip}
                  className="font-mono text-[9px] tracking-[0.15em] text-[#00F0FF]/50 border border-[rgba(0,240,255,0.12)] px-2.5 py-1 whitespace-nowrap"
                >
                  {chip}
                </span>
              ))}
            </div>

            <h2
              className={`font-extralight text-[#E5E5E5] uppercase font-sans leading-[1.1] tracking-[-0.02em] kinetic-reveal ${activeSection === 1 ? 'active' : ''}`}
              style={{ fontSize: 'clamp(26px, 7vw, 54px)', textWrap: 'balance' } as React.CSSProperties}
            >
              Hold to Level Up
            </h2>
            <p className="mt-4 max-w-xs text-[13px] font-light tracking-wider text-neutral-400 leading-relaxed">
              Commit KPS to secure the network. Unlock randomised, VRF-verified bonus rewards — strict 29-day claim window, principal always returned.
            </p>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.2em] text-[#E5E5E5]/20 uppercase z-10 block">
            [ Section 02 · Staking ]
          </div>
        </section>

        {/* ── ACT III: The Outflow — Split layout (desktop) / stacked (mobile) ── */}
        <section className="relative w-full h-screen flex flex-col justify-between bg-transparent border-t border-[rgba(255,255,255,0.02)] overflow-hidden">
          <AmbientContent act={3} />

          <div className="absolute top-8 left-6 md:top-16 md:left-16 z-10 pt-4 md:pt-8 overflow-hidden max-w-[55%] md:max-w-none">
            <p className="font-mono text-[9px] md:text-[11px] tracking-[0.2em] text-[#00F0FF]/28 uppercase whitespace-nowrap">
              [ Public Goods · 10% ]
            </p>
          </div>

          {/* Mobile: full-bleed bottom panel */}
          <div className="absolute bottom-0 left-0 w-full flex flex-col justify-center px-6 pb-6 pt-4 z-10 hud-scrim-mask md:hidden" style={{ height: '84%' }}>
            <h2
              className={`font-extralight text-[#E5E5E5] uppercase font-sans leading-[1.1] tracking-[-0.02em] kinetic-reveal ${activeSection === 2 ? 'active' : ''}`}
              style={{ fontSize: 'clamp(26px, 7vw, 54px)', textWrap: 'balance' } as React.CSSProperties}
            >
              Structural Impact:<br />Automated Public Goods
            </h2>
            <p className="mt-4 max-w-sm text-[13px] font-light tracking-wider text-neutral-400 leading-relaxed">
              A 10% monthly emission stream routed directly to public infrastructure. Programmed by contract, verified by consensus — 50 years of continuous ecosystem growth.
            </p>
            <div className="mt-4 font-mono text-[9px] tracking-[0.25em] text-[#00F0FF]/35 uppercase">
              10% monthly → Public Goods Vault
            </div>

            {/* Status panel — visible on mobile below body copy */}
            <div className="mt-4 border border-[rgba(0,240,255,0.2)] bg-[rgba(0,18,28,0.6)]">
              <div className="font-mono text-[9px] tracking-[0.22em] text-[#00F0FF]/40 uppercase px-3 pt-3 pb-2">
                Public Goods · outflow status
              </div>
              <div className="px-3 pb-3">
                {([
                  ['Status',         'Active'],
                  ['Monthly sweep',  '10%'],
                  ['Vault target',   'Public Goods Fund'],
                  ['Governance',     'DAO nominated'],
                  ['Whitelist gate', 'On-chain DAO'],
                  ['Release cycle',  'Annual'],
                ] as [string, string][]).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-baseline py-1.5 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                    <span className="font-mono text-[11px] tracking-[0.08em] text-neutral-500">{key}</span>
                    <span className="font-mono text-[11px] tracking-[0.08em] text-[#00F0FF]/70">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: two-column split */}
          <div className="hidden md:flex absolute left-[6%] top-1/2 -translate-y-1/2 w-[44%] flex-col justify-center z-10">
            <h2
              className={`font-extralight text-[#E5E5E5] uppercase font-sans leading-[1.1] tracking-[-0.02em] kinetic-reveal ${activeSection === 2 ? 'active' : ''}`}
              style={{ fontSize: 'clamp(26px, 4vw, 54px)', textWrap: 'balance' } as React.CSSProperties}
            >
              Structural Impact:<br />Automated Public Goods
            </h2>
            <p className="mt-4 max-w-sm text-[14px] font-light tracking-wider text-neutral-400 leading-relaxed">
              A 10% monthly emission stream routed directly to public infrastructure. Programmed by contract, verified by consensus — 50 years of continuous ecosystem growth.
            </p>
            <div className="mt-6 font-mono text-[9px] tracking-[0.25em] text-[#00F0FF]/35 uppercase">
              10% monthly → Public Goods Vault
            </div>
          </div>

          {/* Right column — outflow status panel (desktop only) */}
          <div className="hidden md:flex absolute right-[6%] top-1/2 -translate-y-1/2 w-[32%] flex-col z-10">
            <div className="border border-[rgba(0,240,255,0.1)] bg-[rgba(0,18,28,0.6)] p-6">
              <div className="font-mono text-[9px] tracking-[0.22em] text-[#00F0FF]/40 uppercase mb-4">
                Public Goods · outflow status
              </div>
              {([
                ['Status',         'Active'],
                ['Monthly sweep',  '10%'],
                ['Vault target',   'Public Goods Fund'],
                ['Governance',     'DAO nominated'],
                ['Whitelist gate', 'On-chain DAO'],
                ['Release cycle',  'Annual'],
              ] as [string, string][]).map(([key, val]) => (
                <div key={key} className="flex justify-between items-baseline py-2 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                  <span className="font-mono text-[10px] tracking-[0.1em] text-neutral-500">{key}</span>
                  <span className="font-mono text-[10px] tracking-[0.1em] text-[#00F0FF]/70">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.2em] text-[#E5E5E5]/20 uppercase z-10 block">
            [ Section 03 · Public Goods ]
          </div>
        </section>

        {/* ── ACT IV: The Blueprint — 200-square allocation grid ── */}
        <section className="relative w-full h-screen flex flex-col justify-between bg-transparent border-t border-[rgba(255,255,255,0.02)] overflow-hidden">
          <AmbientContent act={4} />

          <div className="absolute top-8 left-6 md:top-16 md:left-16 z-10 pt-4 md:pt-8 overflow-hidden max-w-[55%] md:max-w-none">
            <p className="font-mono text-[9px] md:text-[11px] tracking-[0.2em] text-[#00F0FF]/28 uppercase whitespace-nowrap">
              [ Community Fund · 200 ]
            </p>
          </div>

          {/* Mobile: grid top-right, text bottom-left */}
          <div
            className="md:hidden absolute z-10"
            style={{ top: '76px', right: '24px', width: '200px' }}
          >
            <div className="grid-200-mobile">
              {ALLOCATION_SQUARES.map((i) => (
                <div key={i} className="cell-200-mobile" />
              ))}
            </div>
            <div className="font-mono text-[8px] tracking-[0.18em] text-[#00F0FF]/40 uppercase mt-2">
              200 allocations · pre-launch
            </div>
          </div>

          <div
            className="md:hidden absolute bottom-0 left-0 w-full flex flex-col px-6 pb-8 pt-6 z-10 hud-scrim-mask"
            style={{ height: '40%' }}
          >
            <h2
              className={`font-extralight text-[#E5E5E5] uppercase font-sans leading-[1.1] tracking-[-0.02em] kinetic-reveal ${activeSection === 3 ? 'active' : ''}`}
              style={{ fontSize: 'clamp(22px, 6vw, 40px)', textWrap: 'balance' } as React.CSSProperties}
            >
              The Evolution Catalyst:<br />Community Innovation Fund
            </h2>
            <p className="mt-3 text-[12px] font-light tracking-wider text-neutral-400 leading-relaxed" style={{ maxWidth: '34ch' }}>
              10,000,000 KPS committed to ecosystem builders. Competitive selection model. Protected by a 180-day initial dormancy phase.
            </p>
          </div>

          {/* Desktop: two-column — LEFT: text, RIGHT: grid */}
          <div
            className="hidden md:flex absolute inset-x-0 flex-row items-center gap-16 px-16 z-10"
            style={{ top: '80px', bottom: '72px' }}
          >
            {/* LEFT column */}
            <div className="flex-1 flex flex-col justify-center">
              <h2
                className={`font-extralight text-[#E5E5E5] uppercase font-sans leading-[1.1] tracking-[-0.02em] kinetic-reveal ${activeSection === 3 ? 'active' : ''}`}
                style={{ fontSize: 'clamp(26px, 3.5vw, 54px)', textWrap: 'balance' } as React.CSSProperties}
              >
                The Evolution Catalyst:<br />Community Innovation Fund
              </h2>
              <p className="mt-5 text-[14px] font-light tracking-wider text-neutral-400 leading-relaxed" style={{ maxWidth: '38ch' }}>
                10,000,000 KPS committed to ecosystem builders. Competitive selection model. Protected by a 180-day initial dormancy phase.
              </p>
              <div className="mt-5 font-mono text-[9px] tracking-[0.22em] text-[#00F0FF]/40 uppercase">
                200 allocations · pre-launch
              </div>
            </div>

            {/* RIGHT column — grid */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 14px)', gap: '4px' }}>
                {ALLOCATION_SQUARES.map((i) => (
                  <div
                    key={i}
                    style={{
                      width: '14px',
                      height: '14px',
                      backgroundColor: '#00F0FF',
                      opacity: 0.12,
                      border: '1px solid rgba(0,240,255,0.08)',
                    }}
                  />
                ))}
              </div>
              <div className="font-mono text-[9px] tracking-[0.22em] text-[#00F0FF]/40 uppercase mt-3">
                200 allocations · pre-launch
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.2em] text-[#E5E5E5]/20 uppercase z-10 block">
            [ Section 04 · Builders ]
          </div>
        </section>

        {/* ── ACT V: The Gateway — Horizontal 50-year timeline ── */}
        <section id="portal" className="relative w-full h-screen flex flex-col justify-between bg-transparent border-t border-[rgba(255,255,255,0.02)] overflow-hidden">
          <AmbientContent act={5} />

          {/* Mobile-only eyebrow — desktop eyebrow is inside the centered column */}
          <div className="absolute top-8 left-6 z-10 pt-4 overflow-hidden max-w-[55%] md:hidden">
            <p className="font-mono text-[9px] tracking-[0.2em] text-[#00F0FF]/28 uppercase whitespace-nowrap">
              [ Horizon · 600 months ]
            </p>
          </div>

          {/* ── Mobile: full-width single-column ── */}
          <div className="md:hidden absolute bottom-0 left-0 w-full flex flex-col px-6 pb-5 pt-6 z-10 hud-scrim-mask" style={{ height: '84%' }}>

            {/* Timeline */}
            <div className="relative mb-5" style={{ height: '48px', width: '100%' }}>
              <div className="absolute left-0 right-0 h-px bg-[rgba(0,240,255,0.2)]" style={{ top: '6px' }} />
              {TIMELINE_MARKERS.map(({ year, pct, align, label }) => (
                <div
                  key={year}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: pct,
                    transform:
                      align === 'left'  ? 'translateX(0)'     :
                      align === 'right' ? 'translateX(-100%)' :
                                          'translateX(-50%)',
                  }}
                >
                  <div className="rounded-full bg-[#00F0FF]" style={{ width: '6px', height: '6px', opacity: 0.8 }} />
                  <div className="font-mono text-[7px] tracking-widest mt-1.5" style={{ color: 'rgba(0,240,255,0.55)', whiteSpace: 'nowrap' }}>
                    Yr {year}
                  </div>
                  <div className="font-mono text-[6px] tracking-[0.1em] mt-0.5" style={{ color: 'rgba(0,240,255,0.28)', whiteSpace: 'nowrap' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <h2
              className={`font-extralight text-[#E5E5E5] uppercase font-sans leading-[1.1] tracking-[-0.02em] kinetic-reveal ${activeSection === 4 ? 'active' : ''}`}
              style={{ fontSize: 'clamp(24px, 8vw, 40px)', textWrap: 'balance' } as React.CSSProperties}
            >
              600 Months.<br />One Promise.
            </h2>
            <p className="mt-3 text-[13px] font-light tracking-wider text-neutral-400 leading-relaxed" style={{ maxWidth: '34ch' }}>
              Native omnichain architecture with a strict 1% wallet cap. Autonomous distribution network. Zero protocol fees.
            </p>

            {/* CTAs — stacked, full-width, 48px */}
            <div className="mt-5 flex flex-col gap-2 w-full">
              <a
                href="https://app.krypswift.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: '100%', height: '48px', minHeight: '48px' }}
              >
                Access portal
              </a>
              <a
                href="/whitepaper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ width: '100%', height: '48px', minHeight: '48px' }}
              >
                Whitepaper
              </a>
              <a
                href="/constitution.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ width: '100%', height: '48px', minHeight: '48px' }}
              >
                Constitution
              </a>
            </div>

            {/* Social icons — centered */}
            <div className="mt-4 flex flex-row items-center justify-center gap-4">
              {SOCIAL_LINKS.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="flex items-center justify-center text-neutral-500 hover:text-[#00F0FF] transition-colors duration-300"
                  style={{ width: '44px', height: '44px' }}
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Deployer wallet — Article XI, centered */}
            <div
              className="mt-2 text-center font-mono text-[10px] tracking-[0.12em]"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              Deployer · 0x000...000
            </div>

            {/* Final statement */}
            <div className="mt-2 text-center font-mono text-[9px] tracking-[0.18em] text-neutral-600 uppercase">
              Twelve Articles. One Promise.
            </div>
          </div>

          {/* ── Desktop: fully centered vertical stack ── */}
          <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center z-10 px-8">

            {/* 1. Eyebrow */}
            <p className="font-mono text-[11px] tracking-[0.2em] text-[#00F0FF]/28 uppercase">
              [ Horizon · 600 months ]
            </p>

            {/* 2. Timeline — 80% viewport width, centered */}
            <div className="relative mt-10" style={{ width: '80%', maxWidth: '800px', height: '52px' }}>
              <div className="absolute left-0 right-0 h-px bg-[rgba(0,240,255,0.2)]" style={{ top: '6px' }} />
              {TIMELINE_MARKERS.map(({ year, pct, align, label }) => (
                <div
                  key={year}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: pct,
                    transform:
                      align === 'left'  ? 'translateX(0)'     :
                      align === 'right' ? 'translateX(-100%)' :
                                          'translateX(-50%)',
                  }}
                >
                  <div className="rounded-full bg-[#00F0FF]" style={{ width: '7px', height: '7px', opacity: 0.8 }} />
                  <div className="font-mono text-[8px] tracking-widest mt-1.5" style={{ color: 'rgba(0,240,255,0.55)', whiteSpace: 'nowrap' }}>
                    Yr {year}
                  </div>
                  <div className="font-mono text-[7px] tracking-[0.12em] mt-0.5" style={{ color: 'rgba(0,240,255,0.28)', whiteSpace: 'nowrap' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* 3. Headline — centered */}
            <h2
              className={`mt-8 font-extralight text-[#E5E5E5] uppercase font-sans leading-[1.1] tracking-[-0.02em] text-center kinetic-reveal ${activeSection === 4 ? 'active' : ''}`}
              style={{ fontSize: 'clamp(26px, 7vw, 72px)', textWrap: 'balance' } as React.CSSProperties}
            >
              600 Months.<br />One Promise.
            </h2>

            {/* 4. Body copy — centered, max 600px */}
            <p className="mt-5 text-[14px] font-light tracking-wider text-neutral-400 leading-relaxed text-center" style={{ maxWidth: '600px' }}>
              Native omnichain architecture with a strict 1% wallet cap. Autonomous distribution network. Zero protocol fees.
            </p>

            {/* 5. CTAs — horizontal row, centered, gap-3 */}
            <div className="mt-10 flex flex-row items-center gap-3">
              <a href="https://app.krypswift.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Access portal
              </a>
              <a href="/whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Whitepaper
              </a>
              <a href="/constitution.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Constitution
              </a>
            </div>

            {/* 6. Social icons — centered row, gap-6 */}
            <div className="mt-8 flex flex-row items-center justify-center gap-6">
              {SOCIAL_LINKS.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="flex items-center justify-center text-neutral-500 hover:text-[#00F0FF] transition-colors duration-300"
                  style={{ width: '44px', height: '44px' }}
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* 7. Deployer wallet — Article XI, centered */}
            <div
              className="mt-6 text-center font-mono text-[10px] tracking-[0.12em]"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              Deployer · 0x000...000
            </div>

            {/* 8. Final statement — centered */}
            <div className="mt-2 text-center font-mono text-[9px] tracking-[0.18em] text-neutral-600 uppercase">
              Twelve Articles. One Promise.
            </div>
          </div>

        </section>

      </div>

      {/* Corner HUD — bottom-left and bottom-right */}
      <div className="fixed bottom-8 left-6 md:left-16 z-20 font-mono text-[9px] text-neutral-600 tracking-widest hidden sm:block">
        KPS · Base mainnet · 8453
      </div>
      <div className="fixed bottom-8 right-6 md:right-16 z-20 font-mono text-[9px] text-neutral-600 tracking-widest hidden sm:block">
        Zero protocol fees
      </div>

    </main>
  );
}
