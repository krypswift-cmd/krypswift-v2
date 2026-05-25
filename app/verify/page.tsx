// LANGUAGE RULES — read before editing any copy on this page
// "KPS Draw" not "lottery" | "Bonus reward" not "prize"
// "Recipient" not "winner" | "Loyalty stake" not "ticket"
// "Zero protocol fees" not "0% tax"
// Principal is never at risk — say so clearly
// Charity: "DAO nominates, KrypSwift LTD verifies and releases"
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CONTRACTS = [
  { name: 'KrypSwift Token',    version: 'v6', file: 'KrypSwift.sol' },
  { name: 'Staking Engine',     version: 'v5', file: 'KrypswiftFutures.sol' },
  { name: 'Bonus Draw Engine',  version: 'v5', file: 'KPSDRAW.sol' },
  { name: 'Public Goods Vault', version: 'v5', file: 'CharityVault.sol' },
  { name: 'Governance',         version: 'v5', file: 'KrypSwiftGovernance.sol' },
  { name: 'Community Fund',     version: 'v8', file: 'KrypSwiftCommunityFund.sol' },
];

const AI_QUESTIONS = [
  'Can this contract mint new tokens after the initial launch?',
  'Can the contract owner withdraw funds from the staking pool or bonus draw vault?',
  'What happens to unclaimed bonus rewards after 29 days?',
  'Does this contract contain any hidden admin functions or emergency drains that could remove user funds?',
  'Is the maximum token supply hardcoded, or can it be changed by the owner or DAO?',
  'Does this code match the rules described in a Protocol Constitution — specifically the 50-year emission schedule, the supply cap, and the swap-and-pop staking list?',
];

const COMBINED_PROMPT =
  'I am giving you two documents: the KrypSwift Protocol Constitution ' +
  'and the KrypSwift Whitepaper v6.0. I am also giving you the source ' +
  'code of the KrypSwift smart contracts. Please compare the deployed ' +
  'code against the Constitution rules and tell me whether the code ' +
  'matches, and where — if anywhere — it deviates.';

export default function VerifyPage() {
  const [copiedQuestion, setCopiedQuestion] = useState<number | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  const copyQuestion = (text: string, i: number) => {
    navigator.clipboard.writeText(`"${text}"`);
    setCopiedQuestion(i);
    setTimeout(() => setCopiedQuestion(null), 2000);
  };

  const copyPromptText = () => {
    navigator.clipboard.writeText(COMBINED_PROMPT);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <main className="min-h-screen bg-black text-[#E5E5E5] font-sans">

      {/* Sticky top nav */}
      <nav
        className="sticky top-0 z-10 border-b border-[rgba(255,255,255,0.04)]"
        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
      >
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-[10px] tracking-[0.2em] text-[#E5E5E5]/40 uppercase hover:text-[#00F0FF]/70 transition-colors duration-300"
          >
            ← KrypSwift
          </Link>
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#00F0FF]/28 uppercase hidden sm:block">
            [ Verify · Open Source ]
          </span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 md:px-8 py-16 md:py-24">

        {/* Page header */}
        <h1
          className="font-extralight text-[#E5E5E5] uppercase font-sans leading-[1.05] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(32px, 8vw, 64px)', textWrap: 'balance' } as React.CSSProperties}
        >
          Verify the Protocol Yourself
        </h1>
        <p className="mt-5 text-[15px] md:text-[17px] font-light tracking-wider text-neutral-400 leading-[1.6]" style={{ maxWidth: '52ch' }}>
          No trust required. The code is public. Here is how to read it.
        </p>

        {/* ── SECTION 1: Find the Raw Code ── */}
        <section className="mt-20 md:mt-28">
          <div className="font-mono text-[9px] tracking-[0.3em] text-[#00F0FF]/40 uppercase mb-5">
            Step 01
          </div>
          <h2
            className="font-extralight text-[#E5E5E5] uppercase font-sans leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(22px, 5vw, 40px)' }}
          >
            Find the Raw Code
          </h2>
          <p className="mt-4 text-[14px] md:text-[15px] font-light tracking-wider text-neutral-400 leading-[1.7]" style={{ maxWidth: '60ch' }}>
            Every KrypSwift contract is deployed on Base Mainnet and verified on BaseScan. Verified means the source code you see is the exact code running on-chain. No hidden logic. No proxy tricks.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {CONTRACTS.map((c) => (
              <div
                key={c.file}
                className="border border-[rgba(0,240,255,0.15)] bg-[rgba(0,18,28,0.5)] px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] font-light text-[#E5E5E5] tracking-wide">
                    {c.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] tracking-[0.15em] text-[#00F0FF]/50 uppercase">
                      {c.version}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.06em] text-neutral-600">
                      {c.file}
                    </span>
                  </div>
                </div>
                <a
                  href="https://basescan.org/address/PLACEHOLDER_ADDRESS#code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ fontSize: '9px', minWidth: '152px', justifyContent: 'center' }}
                >
                  View on BaseScan
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 2: Ask Your AI ── */}
        <section className="mt-20 md:mt-28">
          <div className="font-mono text-[9px] tracking-[0.3em] text-[#00F0FF]/40 uppercase mb-5">
            Step 02
          </div>
          <h2
            className="font-extralight text-[#E5E5E5] uppercase font-sans leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(22px, 5vw, 40px)' }}
          >
            Ask Your AI
          </h2>
          <p className="mt-4 text-[14px] md:text-[15px] font-light tracking-wider text-neutral-400 leading-[1.7]" style={{ maxWidth: '60ch' }}>
            Copy the full contract source from BaseScan. Open your preferred AI assistant — Claude, ChatGPT, Gemini, or any other. Paste the contract and ask it the questions below. The answers come from the code, not from us.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {AI_QUESTIONS.map((q, i) => (
              <div
                key={i}
                className="border border-[rgba(0,240,255,0.15)] bg-[rgba(0,18,28,0.5)] px-5 py-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
              >
                <p
                  className="text-[14px] font-light text-[#E5E5E5]/85 leading-[1.65]"
                  style={{ maxWidth: '52ch' }}
                >
                  &ldquo;{q}&rdquo;
                </p>
                <button
                  onClick={() => copyQuestion(q, i)}
                  className="font-mono text-[9px] tracking-[0.18em] uppercase border border-[rgba(0,240,255,0.15)] px-3 py-2 text-[#00F0FF]/50 hover:text-[#00F0FF]/80 hover:border-[rgba(0,240,255,0.3)] transition-colors duration-200 whitespace-nowrap self-start"
                  aria-label="Copy question to clipboard"
                  style={{ minWidth: '70px', minHeight: '36px' }}
                >
                  {copiedQuestion === i ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: Check the Constitution ── */}
        <section className="mt-20 md:mt-28">
          <div className="font-mono text-[9px] tracking-[0.3em] text-[#00F0FF]/40 uppercase mb-5">
            Step 03
          </div>
          <h2
            className="font-extralight text-[#E5E5E5] uppercase font-sans leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(22px, 5vw, 40px)' }}
          >
            Check the Constitution
          </h2>
          <p className="mt-4 text-[14px] md:text-[15px] font-light tracking-wider text-neutral-400 leading-[1.7]" style={{ maxWidth: '60ch' }}>
            The Protocol Constitution is the binding rulebook that the code must follow. Download it, hand it to your AI alongside the contract code, and ask whether the deployed logic matches the written rules.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="/KrypSwift_Protocol_Constitution_v1.0.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Protocol Constitution v1.0 (PDF)
            </a>
            <a
              href="/KrypSwift_Whitepaper_v6_0.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Technical Whitepaper v6.0 (PDF)
            </a>
          </div>

          {/* Suggested AI prompt block */}
          <div className="mt-8 border border-[rgba(0,240,255,0.15)] bg-[rgba(0,18,28,0.5)]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(0,240,255,0.06)]">
              <span className="font-mono text-[9px] tracking-[0.22em] text-[#00F0FF]/40 uppercase">
                Suggested prompt
              </span>
              <button
                onClick={copyPromptText}
                className="font-mono text-[9px] tracking-[0.18em] uppercase border border-[rgba(0,240,255,0.15)] px-3 py-1.5 text-[#00F0FF]/50 hover:text-[#00F0FF]/80 hover:border-[rgba(0,240,255,0.3)] transition-colors duration-200"
                aria-label="Copy suggested prompt to clipboard"
                style={{ minHeight: '32px' }}
              >
                {copiedPrompt ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="px-5 py-5 font-mono text-[12px] leading-[1.9] text-[#E5E5E5]/65 tracking-[0.02em]">
              {COMBINED_PROMPT}
            </p>
          </div>
        </section>

        {/* ── FOOTER NOTE ── */}
        <div className="mt-20 md:mt-28 pb-16 border-t border-[rgba(255,255,255,0.04)] pt-8">
          <p className="font-mono text-[11px] leading-[1.9] text-neutral-600 tracking-[0.04em]">
            KrypSwift is a staking reward program with randomised bonus incentives. The 5,000 KPS participation floor is a loyalty stake — your principal is never at risk. Zero protocol transaction fees apply. Users remain responsible for their own Capital Gains Tax obligations under the laws of their home jurisdiction.
          </p>
        </div>

      </div>
    </main>
  );
}
