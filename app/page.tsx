'use client';

import { useEffect, useState, UIEvent } from 'react';
import dynamic from 'next/dynamic';

// Dynamic load of Three.js background canvas to prevent SSR hydration errors
const ObsidianBackground = dynamic(
  () => import('@/components/ObsidianBackground'),
  { ssr: false }
);

export default function ObsidianTerminal() {
  const [currentTime, setCurrentTime] = useState<string>('00:00:00');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<number>(0);

  // Simple telemetry: system clock simulation
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hrs}:${mins}:${secs}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Track scroll position of the custom scrolling container
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight - target.clientHeight;
    
    if (scrollHeight > 0) {
      setScrollProgress(scrollTop / scrollHeight);
    }
    
    // Switch active index when scrolled past 50% of viewport height
    const index = Math.round(scrollTop / target.clientHeight);
    setActiveSection(index);
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black select-none">
      
      {/* BACKGROUND ACT: Three.js Canvas Layer with scroll telemetry props */}
      <ObsidianBackground activeSection={activeSection} scrollProgress={scrollProgress} />

      {/* STRICT TERMINAL HUD: Fixed overlay telemetry clock at far top-right */}
      <div className="fixed top-8 right-8 md:right-16 z-20 font-mono text-[10px] text-neutral-400">
        <span className="tracking-widest border border-[rgba(255,255,255,0.08)] px-2.5 py-1 rounded bg-[#0A0A0C]/50 backdrop-blur-md">
          {currentTime} UTC
        </span>
      </div>

      {/* FOREGROUND ACT: Smooth scroll container with transparent layout */}
      <div className="scroll-container" onScroll={handleScroll}>
        
        {/* VIEWPORT SECTION FOR ACT I: The Awakening */}
        <section className="relative w-full h-screen flex flex-col justify-between p-8 md:p-16 bg-transparent overflow-hidden">
          
          {/* Top-Left: tiny system status row */}
          <div className="absolute top-4 left-6 md:top-16 md:left-16 z-10 pt-4 md:pt-8 opacity-50 md:opacity-100">
            <p className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-[#00F0FF]/60 uppercase">
              [ SYSTEM: ACTIVE // REGION: GENESIS 2026 ]
            </p>
          </div>

          {/* Responsive Boundary HUD Copy Block */}
          <div className="absolute bottom-0 left-0 w-full h-[58%] md:h-auto md:w-[35%] md:left-[10%] md:top-1/2 md:-translate-y-1/2 flex flex-col justify-center md:justify-center px-6 pb-10 pt-8 md:p-0 z-10 hud-scrim-mask text-left">
            <h1 className={`text-base md:text-3xl font-extralight tracking-[0.12em] md:tracking-[0.4em] text-[#E5E5E5] uppercase font-sans leading-tight kinetic-reveal ${
              activeSection === 0 ? 'active' : ''
            }`}>
              The 50-Year<br/>Sovereign Engine
            </h1>
            <p className="mt-2 md:mt-4 max-w-lg text-xs md:text-sm font-light tracking-widest text-neutral-400 md:text-[#E5E5E5]/60 leading-relaxed">
              Built for absolute resilience. Zero protocol transaction fees. Governed by an immutable constitution and powered by a fixed-supply of 50,000,000 KPS.
            </p>
          </div>

          {/* Bottom-Center: faint, slow-fading scrolling indicator element */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center animate-pulse duration-[4s] z-10 hidden md:block">
            <p className="font-mono text-[10px] tracking-[0.25em] text-[#E5E5E5]/40 uppercase">
              V // SCROLL TO INITIATE SEQUENCE
            </p>
          </div>

        </section>

        {/* VIEWPORT SECTION FOR ACT II: The Pulse (Staking & VRF Dynamics) */}
        <section className="relative w-full h-screen flex flex-col justify-between p-8 md:p-16 bg-transparent border-t border-[rgba(255,255,255,0.02)] overflow-hidden">
          
          {/* Top-Left: system status row */}
          <div className="absolute top-4 left-6 md:top-16 md:left-16 z-10 pt-4 md:pt-8 opacity-50 md:opacity-100">
            <p className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-[#00F0FF]/60 uppercase">
              [ SUBSYSTEM: BONUS_REWARD_POOL // CRYPTO: VRF_v2.5 ]
            </p>
          </div>

          {/* Responsive Boundary HUD Copy Block */}
          <div className="absolute bottom-0 left-0 w-full h-[58%] md:h-auto md:w-[35%] md:left-[10%] md:top-1/2 md:-translate-y-1/2 flex flex-col justify-center md:justify-center px-6 pb-10 pt-8 md:p-0 z-10 hud-scrim-mask text-left">
            <h2 className={`text-base md:text-3xl font-extralight tracking-[0.12em] md:tracking-[0.4em] text-[#E5E5E5] uppercase font-sans leading-tight kinetic-reveal ${
              activeSection === 1 ? 'active' : ''
            }`}>
              The Engine Breathes:<br/>Staking & Rewards
            </h2>
            <p className="mt-2 md:mt-4 max-w-lg text-xs md:text-sm font-light tracking-widest text-neutral-400 md:text-[#E5E5E5]/60 leading-relaxed">
              Commit KPS to secure the network. Unlock randomized, VRF-verified rewards through an autonomous distribution protocol featuring a strict 29-day claim window and zero locked funds.
            </p>
          </div>

          {/* Bottom-Center: subtle spacing alignment */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center font-mono text-[10px] tracking-[0.25em] text-[#E5E5E5]/20 uppercase z-10 hidden md:block">
            [ SECTION 02 // STAKING_CORE_LATENT ]
          </div>

        </section>

        {/* VIEWPORT SECTION FOR ACT III: The Outflow (Automated Public Goods) */}
        <section className="relative w-full h-screen flex flex-col justify-between p-8 md:p-16 bg-transparent border-t border-[rgba(255,255,255,0.02)] overflow-hidden">
          
          {/* Top-Left: system status row */}
          <div className="absolute top-4 left-6 md:top-16 md:left-16 z-10 pt-4 md:pt-8 opacity-50 md:opacity-100">
            <p className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-[#00F0FF]/60 uppercase">
              [ STREAM_FLOW: ACTIVE // ALLOCATION: PUBLIC_GOODS ]
            </p>
          </div>

          {/* Responsive Boundary HUD Copy Block */}
          <div className="absolute bottom-0 left-0 w-full h-[58%] md:h-auto md:w-[35%] md:left-[10%] md:top-1/2 md:-translate-y-1/2 flex flex-col justify-center md:justify-center px-6 pb-10 pt-8 md:p-0 z-10 hud-scrim-mask text-left">
            <h2 className={`text-base md:text-3xl font-extralight tracking-[0.12em] md:tracking-[0.4em] text-[#E5E5E5] uppercase font-sans leading-tight kinetic-reveal ${
              activeSection === 2 ? 'active' : ''
            }`}>
              Structural Impact:<br/>Automated Public Goods
            </h2>
            <p className="mt-2 md:mt-4 max-w-lg text-xs md:text-sm font-light tracking-widest text-neutral-400 md:text-[#E5E5E5]/60 leading-relaxed">
              A 10% monthly emission stream routed directly to public infrastructure. Programmed by contract, verified by consensus, and architected to fuel continuous ecosystem growth over a 50-year horizon.
            </p>
          </div>

          {/* Bottom-Center: subtle spacing alignment */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center font-mono text-[10px] tracking-[0.25em] text-[#E5E5E5]/20 uppercase z-10 hidden md:block">
            [ SECTION 03 // OUTFLOW_SYSTEM_ACTIVE ]
          </div>

        </section>

        {/* VIEWPORT SECTION FOR ACT IV: The Blueprint (Community Innovation Fund) */}
        <section className="relative w-full h-screen flex flex-col justify-between p-8 md:p-16 bg-transparent border-t border-[rgba(255,255,255,0.02)] overflow-hidden">
          
          {/* Top-Left: system status row */}
          <div className="absolute top-4 left-6 md:top-16 md:left-16 z-10 pt-4 md:pt-8 opacity-50 md:opacity-100">
            <p className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-[#00F0FF]/60 uppercase">
              [ SUBSYSTEM: ECOSYSTEM_FUND // ALLOCATIONS: 200_UNITS ]
            </p>
          </div>

          {/* Responsive Boundary HUD Copy Block */}
          <div className="absolute bottom-0 left-0 w-full h-[58%] md:h-auto md:w-[35%] md:left-[10%] md:top-1/2 md:-translate-y-1/2 flex flex-col justify-center md:justify-center px-6 pb-10 pt-8 md:p-0 z-10 hud-scrim-mask text-left">
            <h2 className={`text-base md:text-3xl font-extralight tracking-[0.12em] md:tracking-[0.4em] text-[#E5E5E5] uppercase font-sans leading-tight kinetic-reveal ${
              activeSection === 3 ? 'active' : ''
            }`}>
              The Evolution Catalyst:<br/>Community Innovation Fund
            </h2>
            <p className="mt-2 md:mt-4 max-w-lg text-xs md:text-sm font-light tracking-widest text-neutral-400 md:text-[#E5E5E5]/60 leading-relaxed">
              10,000,000 KPS committed to ecosystem builders. A strategic blueprint ensuring protocol adaptivity and structural growth across decades, protected by an absolute 180-day initial time-wall dormancy phase.
            </p>
          </div>

          {/* Bottom-Center: subtle spacing alignment */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center font-mono text-[10px] tracking-[0.25em] text-[#E5E5E5]/20 uppercase z-10 hidden md:block">
            [ SECTION 04 // BLUEPRINT_GRID_ONLINE ]
          </div>

        </section>

        {/* VIEWPORT SECTION FOR ACT V: The Gateway (Portal & Compliance) */}
        <section className="relative w-full h-screen flex flex-col justify-between p-8 md:p-16 bg-transparent border-t border-[rgba(255,255,255,0.02)] overflow-hidden">
          
          {/* Top-Left: status row */}
          <div className="absolute top-4 left-6 md:top-16 md:left-16 z-10 pt-4 md:pt-8 opacity-50 md:opacity-100">
            <p className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-[#00F0FF]/60 uppercase">
              [ HORIZON: 600_MONTHS // PROTOCOL: IMMUTABLE ]
            </p>
          </div>

          {/* Responsive Boundary HUD Copy Block */}
          <div className="absolute bottom-0 left-0 w-full h-[70%] md:h-auto md:w-[35%] md:left-[10%] md:top-1/2 md:-translate-y-1/2 flex flex-col justify-center md:justify-center px-6 pb-10 pt-6 md:p-0 z-10 hud-scrim-mask text-left">
            <h2 className={`text-base md:text-3xl font-extralight tracking-[0.12em] md:tracking-[0.4em] text-[#E5E5E5] uppercase font-sans leading-tight kinetic-reveal ${
              activeSection === 4 ? 'active' : ''
            }`}>
              600 Months.<br/>One Promise.
            </h2>
            <p className="mt-2 md:mt-4 max-w-lg text-xs md:text-sm font-light tracking-widest text-neutral-400 md:text-[#E5E5E5]/60 leading-relaxed">
              Native omnichain architecture with a strict 1% wallet cap to safeguard decentralization. Driven by an autonomous distribution network with zero protocol fee abstractions.
            </p>

            {/* Primary CTA */}
            <div className="mt-4 flex flex-col sm:flex-row items-start justify-start gap-2 w-full">
              <a
                href="https://app.krypswift.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center border border-[rgba(0,240,255,0.3)] bg-transparent text-white px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#00F0FF] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] w-full sm:w-auto rounded-sm"
              >
                Access Portal
              </a>
              <a
                href="/whitepaper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center border border-[rgba(255,255,255,0.12)] bg-transparent text-neutral-400 hover:text-white px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300 hover:border-[rgba(0,240,255,0.3)] hover:shadow-[0_0_12px_rgba(0,240,255,0.2)] w-full sm:w-auto rounded-sm"
              >
                Whitepaper v6.0
              </a>
              <a
                href="/constitution.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center border border-[rgba(255,255,255,0.12)] bg-transparent text-neutral-400 hover:text-white px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300 hover:border-[rgba(0,240,255,0.3)] hover:shadow-[0_0_12px_rgba(0,240,255,0.2)] w-full sm:w-auto rounded-sm"
              >
                Constitution v1.0
              </a>
            </div>

            {/* Social links */}
            <div className="mt-3 flex flex-row items-center justify-start gap-2">
              <a
                href="https://t.me/krypswift"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex items-center justify-center w-8 h-8 border border-[rgba(255,255,255,0.12)] rounded-sm text-neutral-500 hover:text-[#00F0FF] hover:border-[rgba(0,240,255,0.4)] hover:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.04 9.613c-.152.674-.554.838-1.122.521l-3.1-2.284-1.496 1.44c-.165.165-.304.304-.623.304l.222-3.156 5.74-5.183c.25-.222-.054-.345-.387-.123L6.928 14.49l-3.062-.957c-.666-.208-.68-.666.138-.987l11.96-4.612c.554-.2 1.038.123.858.987l-.262.327z"/>
                </svg>
              </a>
              <a
                href="https://x.com/krypswift"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex items-center justify-center w-8 h-8 border border-[rgba(255,255,255,0.12)] rounded-sm text-neutral-500 hover:text-[#00F0FF] hover:border-[rgba(0,240,255,0.4)] hover:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all duration-300"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://discord.gg/krypswift"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="flex items-center justify-center w-8 h-8 border border-[rgba(255,255,255,0.12)] rounded-sm text-neutral-500 hover:text-[#00F0FF] hover:border-[rgba(0,240,255,0.4)] hover:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all duration-300"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>

        </section>

      </div>


      {/* Decorative Bottom Corner HUD Telemetry Markers */}
      <div className="fixed bottom-8 left-8 md:left-16 z-20 font-mono text-[9px] text-neutral-600 tracking-widest hidden sm:block">
        KPS.SYS.CORE // GRID_ONLINE
      </div>
      
      <div className="fixed bottom-8 right-8 md:right-16 z-20 font-mono text-[9px] text-neutral-600 tracking-widest hidden sm:block">
        ZERO_PROTOCOL_FEES // SECURE_DECENTRALIZED
      </div>

    </main>
  );
}
