# PROJECT CONTEXT: KRYPSWIFT V6 LANDING PAGE

You are assisting in building the official landing page for **KrypSwift**, a Tier-1 sovereign, open-source Web3 economic engine governed by an immutable Constitution. 

This is a high-performance, cinematic **3D WebGL experience** using Next.js (App Router), React Three Fiber (R3F), and GSAP.

## 1. TECH STACK & ARCHITECTURE
- **Framework:** Next.js (App Router, React 18+), strict TypeScript.
- **Styling:** Tailwind CSS + Framer Motion (for UI text effects).
- **3D WebGL Engine:** Three.js via `@react-three/fiber` (R3F) and `@react-three/drei`.
- **Animation & Scroll-Jacking:** GSAP (specifically `ScrollTrigger`).

### Dual-Layer Architecture Strategy
- **Layer 1 (The Background):** A fixed `<Canvas>` at `z-index: 0` locked to the screen. 
- **Layer 2 (The Foreground):** A transparent HTML/Tailwind layer at `z-index: 10` containing `100vh` sections of scrollable text.

## 2. STRICT LEGAL COMPLIANCE (THE V1 CONSTITUTION)
KrypSwift operates under strict global financial consumer protections. You must NEVER use the following words in any UI text, comments, or variable names:
- 🚫 **BANNED:** "Lottery", "Jackpot", "Gambling", "Prize", "Winner", "0% Tax", "Tax-Free", "Locked Funds", "Charity".
- ✅ **REQUIRED:** "Bonus Reward Pool", "Recipient", "KPS Draw", "Zero Protocol Fees", "Commit", "Public Goods".

## 3. THE "LEVEL-UP" NARRATIVE (UI STRUCTURE)
The page consists of 5 main scrollable sections (`h-screen`). 
1. **The Hero:** "The 50-Year Reward Engine" (Autonomous, 600 months).
2. **The Rewards:** "Hold to Level Up" (1x to 5x voting multiplier, monthly draws. No locked funds).
3. **The Public Goods:** "Funding the Decentralized Future" (10% sweeps to a vault monthly, unlocked annually for a public goods donation. Formerly CharityVault).
4. **The Builders:** "Fueling the Evolution" (Venture Studio. Competitive selection model for developers).
5. **The Footer:** "Twelve Articles. One Promise." (Final CTA, links to Constitution v1.0 & Whitepaper v6.0).

## 4. WebGL PERFORMANCE MANDATE (ZERO CPU BOTTLENECKS)
- **Do NOT iterate over particle arrays inside `useFrame` or GSAP loops on the CPU.**
- **You must use a Custom ShaderMaterial (`THREE.ShaderMaterial`)** with GLSL vertex and fragment shaders.
- Store the starting positions as the default `position` attribute.
- Store the target positions as a custom attribute (e.g., `aTargetPosition`).
- Pass a single float uniform `uProgress` to the shader.
- Use GSAP ScrollTrigger to animate `uProgress` from `0.0` to `1.0` across the scroll.
- The GPU will handle the transition natively via `mix(position, aTargetPosition, uProgress)` [2].