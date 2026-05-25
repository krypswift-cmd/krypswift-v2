# PROJECT CONTEXT: KRYPSWIFT V6 LANDING PAGE

You are assisting in building the official landing page for **KrypSwift** —
a Tier-1 sovereign, open-source Web3 economic engine governed by an
immutable Constitution, running across Base (canonical) and four satellite
chains via LayerZero OFT V2.

This is a 50-year protocol. The landing page must feel built to last fifty
years, not built in a weekend.

---

## 1. THE ONE FEELING (READ THIS FIRST — IT GOVERNS EVERYTHING)

**Gravitas. Permanence. Institutional confidence.**

The metaphor is **cathedral, not spaceship.**

A 50-year protocol should feel like an institution, not a product launch.
Think Berkshire Hathaway shareholder letter, not crypto Twitter.
Think Ethereum Foundation blog, not Solana launch hype.
Think Stripe's documentation aesthetic, not the average DeFi dashboard.

If a design decision would make the page feel "futuristic," "edgy," or
"hype-coded," reverse it. We are selling **permanence**, not novelty.

Restraint is the brand. Silence is louder than ornament.

---

## 2. VISUAL REFERENCES (THE NORTH STAR)

The aesthetic must feel like these sites:

- **base.org** — restraint, precise grid, single typeface confidence
- **linear.app** — dramatic typography, no wasted pixel, every element earns its place
- **ethereum.org** — soft, considered, illustrated rather than animated
- **stripe.com** — gradients that feel hand-crafted, not auto-generated
- **vercel.com** — black-and-white precision with subtle texture

For 3D/motion done with restraint:
- **apple.com** product pages — 3D serves the story, never competes with it
- **rauno.me** — tasteful interactivity, slow ambient motion

---

### IT MUST NOT FEEL LIKE:

- **Generic Vercel-template crypto:** monospace eyebrows, bracket tags like
  `[ SYSTEM: ACTIVE ]`, terminal aesthetic, mint or amber accent on black,
  scrolling UTC clock in the corner. **This entire visual language is BANNED.**
- **Cyberpunk crypto:** neon, glitch effects, scanlines, "Matrix" rain
- **Web3 boilerplate:** gradient orbs, generic 3D blobs, animated mesh
  backgrounds, "futuristic abstraction"
- **Hype crypto:** countdown timers, "LAUNCHING SOON," urgency banners,
  fake activity indicators

If output drifts toward any of these, stop and reset.

---

## 3. BRAND SYSTEM

### 3.1 Color Palette

```
PRIMARY
  Background        #06101F  (deep navy, almost black)
  Background lift   #0A1628  (one shade up, for elevated surfaces)
  Foreground        #E8E4D8  (warm off-white, never pure white)

ACCENT (USE SPARINGLY)
  Gold              #C9A227  (the protocol's signature — see Rule 3.4)

SECONDARY
  Muted text        #8B8576  (warm grey for subtitles, metadata)
  Border/hairline   rgba(232, 228, 216, 0.08)  (1px dividers)

NEVER USE
  Pure white (#FFFFFF) — too cold for navy
  Pure black (#000000) — flat against the deep navy bg
  Mint, neon, amber, purple — wrong era, wrong sector
```

### 3.2 Typography

**Headlines** — serif, large, confident. The serif does most of the design work:
- Primary: **PP Editorial New** (display weight)
- Fallback: **Fraunces** (variable, free, Google Fonts)
- Alternate: **Cormorant Garamond** (refined, free)

**Body** — sans-serif, neutral, readable:
- Primary: **Söhne** or **Söhne Breit**
- Fallback: **Inter** (free) or **Geist** (free, Vercel)

**Data display** — monospace, ONLY for numbers and on-chain data:
- **JetBrains Mono** or **IBM Plex Mono**
- Never use monospace for body copy, headings, or "eyebrows"
- Never use monospace as decorative styling

### 3.3 Type Scale (mobile / desktop)

```
Display     56px / 96px    serif, weight 400, line-height 1.05, tight tracking
H1          40px / 72px    serif, weight 400, line-height 1.1
H2          28px / 48px    serif, weight 400, line-height 1.15
Body lg     18px / 20px    sans, weight 400, line-height 1.5
Body        16px / 17px    sans, weight 400, line-height 1.6
Caption     13px / 14px    sans, weight 500, line-height 1.4, +0.04em tracking
Data        14px / 16px    mono, weight 400, tabular-nums
```

### 3.4 The Gold Rule

**Only ONE element per section gets the gold accent.** If everything is gold,
nothing is. The gold marks importance — typically a single CTA, a single
underline, a single number that matters.

If a section has two gold elements, one of them is wrong.

### 3.5 Motion Philosophy

**Restrained. Slow. Confident.**

- Easing: `cubic-bezier(0.25, 0.1, 0.25, 1)` (the institutional ease)
- Durations: 400–800ms for transitions, 1.2–2s for ambient motion
- Never use bounce, elastic, or aggressive easing
- Never animate just because you can — motion must serve meaning
- 3D ambient motion: extremely slow rotation, low contrast, ignore-able
- Scroll-triggered reveals: subtle fade + 12px translate, never dramatic

---

## 4. TECH STACK & ARCHITECTURE

- **Framework:** Next.js (App Router, React 18+), strict TypeScript
- **Styling:** Tailwind CSS + Framer Motion (for UI text effects)
- **3D WebGL:** Three.js via `@react-three/fiber` (R3F) and `@react-three/drei`
- **Scroll & Animation:** GSAP with `ScrollTrigger`

### 4.1 Dual-Layer Architecture

- **Layer 1 (Background):** Fixed `<Canvas>` at `z-index: 0`, locked to viewport
- **Layer 2 (Foreground):** Transparent HTML/Tailwind layer at `z-index: 10`,
  containing `100vh` (mobile: `100dvh`) sections of scrollable content

The 3D layer must never have its own background color — always transparent
so the navy from the body shows through. This prevents the canvas/HTML
seam from being visible.

---

## 5. NARRATIVE STRUCTURE (FIVE SECTIONS)

Each section is `min-h-screen` (use `100dvh` on mobile to handle browser chrome).
Each section must have a **distinct visual structure** — do not repeat the same
layout pattern five times. See Section 7 (Mobile Rules).

### 5.1 Hero — "The 50-Year Reward Engine"
- The single most beautiful thing on the site
- Display-size serif headline
- One-sentence subtitle, no marketing language
- Single CTA, gold accent
- 3D background: restrained, ambient, never competes with type
- **NO** scrolling clock, **NO** bracket tags, **NO** "SYSTEM ACTIVE" framing

### 5.2 Rewards — "Hold to Level Up"
- 1x to 5x voting multiplier, monthly KPS Draws
- Principal is never at risk — state this clearly
- Visual structure: lead with a single huge number (e.g., "16,666 KPS / month"
  in display serif), explanation underneath in body sans
- Different shape from the hero

### 5.3 Public Goods — "Funding the Decentralized Future"
- 10% monthly sweep to the Public Goods Vault, annual release
- Formerly CharityVault — never use the word "charity" in UI copy
- DAO nominates, KrypSwift LTD verifies and releases (compliance veto)
- Visual structure: tinted panel (slightly different bg shade) to break
  visual rhythm

### 5.4 Builders — "Fueling the Evolution"
- Community Innovation Fund: 200 allocations × 50,000 KPS each
- Competitive submission model — DAO selects, builders deliver
- Visual structure: a 200-square grid as the visual hook
  (each square = one allocation). This number is memorable.

### 5.5 Footer — "Twelve Articles. One Promise."
- The closing statement
- Links to Constitution v1.0 (PDF) and Whitepaper v6.0 (PDF)
- Discord, X, Telegram, GitHub icons
- Deployer wallet address publicly displayed (per Article XI)

---

## 6. THE LANGUAGE COVENANT (LEGAL COMPLIANCE — NON-NEGOTIABLE)

KrypSwift operates under Irish Gaming and Lotteries Act, Revenue Commissioners,
CBI, and MiCA frameworks. **The following words are PERMANENTLY BANNED** from
all UI copy, comments, variable names, file names, and on-chain metadata:

| ❌ NEVER USE              | ✅ REQUIRED INSTEAD                  |
|--------------------------|--------------------------------------|
| Lottery                  | KPS Draw                             |
| Lottery draw             | KPS Draw                             |
| Prize                    | Bonus reward                         |
| Winner                   | Recipient                            |
| Jackpot                  | (no substitute — never reference)    |
| Ticket                   | Loyalty stake                        |
| Entry fee                | Loyalty stake                        |
| Buy in / purchase entry  | Stake / commit                       |
| 0% Tax / Tax-Free        | Zero protocol fees                   |
| Locked funds             | Committed stake (principal returns)  |
| Gambling                 | Participation                        |
| Charity                  | Public Goods                         |
| CharityVault             | Public Goods Vault                   |
| Provably fair lottery    | Randomized bonus incentive           |

### General Rules

- The 5,000 KPS floor is a **loyalty stake**, never an "entry fee" or "ticket"
- **Principal is never at risk** — communicate this clearly on staking-adjacent UI
- The KPS Draw is a **staking reward program with randomized bonus incentives**
- Users **participate**, they do not gamble or speculate
- For Public Goods: "DAO nominates, KrypSwift LTD verifies and releases"
  (never imply the DAO alone controls payouts — the LTD has a compliance veto)
- Users are responsible for their own Capital Gains Tax — the protocol charges
  zero transaction fees only

### URL & Route Naming

| Avoid       | Use         |
|-------------|-------------|
| /lottery    | /draw       |
| /jackpot    | (never)     |
| /winners    | /recipients |
| /charity    | /public-goods |

If you catch yourself wanting to use a banned word "just this once for clarity,"
stop. There are no exceptions.

---

## 7. MOBILE RULES (CRITICAL — TEST AT 380px BEFORE COMMITTING)

The page must feel monumental on a 380px-wide screen. This is non-negotiable —
most viewers will see this site first on mobile.

### 7.1 Padding

- **Minimum 24px (`px-6`) horizontal padding on every section.**
- **Text must never touch viewport edges.** If you can see a letter touching
  the left or right edge in a screenshot, the layout is broken.
- Section vertical padding: minimum 96px top/bottom on desktop, 64px on mobile

### 7.2 Layout Variety (BREAK THE PDF-PAGE PATTERN)

Each of the five sections must have a **different visual structure.**
Repeating the same "eyebrow + heading + paragraph" pattern five times is
the #1 thing that makes the site feel generic.

Recommended structures (one per section):
1. Hero — centered headline, ambient 3D behind
2. Rewards — huge number as the design element, copy as supporting role
3. Public Goods — tinted background panel, off-axis layout
4. Builders — 200-square grid as the visual hook
5. Footer — horizontal timeline with markers at year 1, 10, 25, 50

### 7.3 Typography on Mobile

- Display headlines must still feel large at 380px width — minimum 40px
- Line length: maximum 38 characters for body copy on mobile
- Never auto-shrink the display headline to fit; allow controlled wrapping
- Avoid orphans (single word on last line) using `text-wrap: balance`

### 7.4 Touch Targets

- Minimum 44×44px tap target for any interactive element
- Never put two CTAs side by side on mobile — stack them

---

## 8. PERFORMANCE MANDATE (WebGL — ZERO CPU BOTTLENECKS)

The 3D layer must be performant on mid-range mobile (target: iPhone 12 / Pixel 6).

- **Do NOT iterate over particle arrays inside `useFrame` or GSAP loops on the CPU.**
- **Use a Custom ShaderMaterial (`THREE.ShaderMaterial`)** with GLSL vertex and
  fragment shaders for any particle/morphing animation.
- Store starting positions as the default `position` attribute.
- Store target positions as a custom attribute (e.g., `aTargetPosition`).
- Pass a single float uniform `uProgress` to the shader.
- Use GSAP ScrollTrigger to animate `uProgress` from `0.0` to `1.0` across scroll.
- The GPU handles the transition natively via `mix(position, aTargetPosition, uProgress)`.

### Performance Budgets

- LCP (Largest Contentful Paint): under 2.5s on 4G mobile
- Initial JS bundle: under 250KB compressed
- 3D scene polycount: under 50k triangles for ambient backgrounds
- Suspend 3D rendering when canvas is off-screen (`<Canvas frameloop="demand">`)
- Honor `prefers-reduced-motion` — disable 3D animation, keep static composition

---

## 9. ITERATION PROTOCOL

**Build the Hero to perfection FIRST.** Do not touch sections 2–5 until the
hero is approved by the user.

The hero establishes the design language for the entire site. If the hero
is mediocre, sections 2–5 will inherit mediocrity. If the hero is undeniable,
sections 2–5 must match its bar.

### When asked to "build the landing page":

1. Build only the Hero section in isolation
2. Show it for review
3. Iterate until approved (typically 2–3 rounds)
4. Only then build section 2, matching the hero's quality
5. Continue one section at a time

### Never:

- Build all five sections in parallel on the first pass
- Reuse the same component layout for multiple sections
- Add a section that wasn't explicitly requested

---

## 10. ANTI-PATTERNS — WHAT NEVER TO BUILD

Do NOT add any of the following to the site, regardless of how "useful" they
seem:

- Scrolling UTC clock or "uptime" counter
- `[ SYSTEM: ACTIVE ]` or `[ STATUS: ... ]` bracket tags above sections
- Monospace eyebrow labels above headings (monospace is for data only)
- Animated terminal text effects ("type-on" reveals)
- Glitch effects, scanlines, RGB shift
- Generic "blob" or "orb" 3D shapes
- Floating particles that don't serve a narrative purpose
- Countdown timers
- "Live activity" feeds showing fake transactions
- Animated gradient backgrounds (mesh, conic, animated linear)
- Neon glows, dramatic drop shadows, heavy blur effects
- "Cyber" iconography (circuit traces, hexagons, network nodes as decoration)
- Tilted/skewed elements for "dynamism"
- Confetti, sparkles, or any celebratory animation
- Auto-playing audio or video

If you find yourself adding any of these to make a section feel "more alive,"
the section's typography and copy are doing too little work. Fix that instead.

---

## 11. WHEN IN DOUBT

- **Restraint > ornament**
- **Type > effects**
- **Silence > noise**
- **One beautiful thing > five fancy things**

If you cannot decide between two options, pick the more boring one. A
restrained, confident, slightly under-designed page reads as institutional.
An over-designed page reads as compensating.

If the user pushes you toward more drama, more motion, more "epic" — agree
politely, then propose the restrained version first and let them see it.

---

## 12. FILES TO READ BEFORE STARTING ANY TASK

Always read these files at the start of every session:

1. `CLAUDE.md` (this file)
2. `LANGUAGE_GUIDE.md` — the full legal language compliance document
3. Any file you are about to modify

Never make changes without reading the file first. Never assume the codebase
state from memory.

---

## 13. ASKING THE USER

The user is a non-developer building this protocol alongside the codebase.
Communicate accordingly:

- Plain language, no design jargon
- When you need a decision, present 2 options max, with the tradeoff in
  one sentence each
- Show screenshots/previews proactively rather than asking the user to
  "check the site"
- When something is broken, name the specific bug and the specific fix
- Never lecture about "best practices" without proposing the concrete change

End of CLAUDE.md.