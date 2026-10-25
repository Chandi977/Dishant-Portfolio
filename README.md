# Chandi Charan Mahato — Full Stack & MERN Portfolio

A complete Next.js portfolio built with the App Router, TypeScript, GSAP, ScrollTrigger, Lenis, Three.js and Framer Motion.

## Included

- Original animated hero section
- Scroll-pinned editorial story
- Pinned selected-project chapters
- Halftone artwork reveals
- Split, fold, warp and particle text effects
- Animated profile, toolkit, services, process and contact sections
- Dynamic project case-study routes at `/work/[slug]`
- Responsive layouts and reduced-motion support

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Main files

- `app/page.tsx` — homepage route
- `components/PortfolioClient.tsx` — portfolio layout and scroll timelines
- `components/MotionAccents.tsx` — reusable text and halftone effects
- `components/DepthText.tsx` — interactive 3D depth typography
- `data/projects.ts` — project content
- `app/globals.css` — complete visual system and responsive styling

Replace `public/hero-portrait.png` and edit `data/projects.ts` to personalize the portfolio.
