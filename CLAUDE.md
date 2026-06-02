# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Type-check with tsc, then bundle with Vite → dist/
npm run preview   # Serve the production build locally
npm run lint      # Run ESLint
```

There are no tests in this project.

## Architecture

This is a single-page React + TypeScript app built with Vite, deployed to GitHub Pages at `https://kits-solutions.github.io/beef-jerky_KiTS-analysis/`. The `base` in `vite.config.ts` is set to `/beef-jerky_KiTS-analysis/` to match the GitHub Pages path.

**Routing is manual, not React Router.** `App.tsx` holds a `COMPONENT_MAP` object that maps string keys (e.g. `'strike presentation'`) to JSX elements. `activeView` state controls which component renders in the main content area. To add a new module: create a `.tsx` file in `src/tsx-files/`, import it in `App.tsx`, and add it to `COMPONENT_MAP`.

**Layout:** `App.tsx` renders three major pieces:
1. `AnimatedBackground` — a canvas-based particle animation fixed behind everything.
2. A collapsible `<nav>` sidebar listing all module names from `COMPONENT_MAP`, with a "Presentation Mode" button that hides the sidebar and expands content to full viewport.
3. A `<main>` content area that renders `COMPONENT_MAP[activeView]`.

Responsive breakpoints are tracked via `useState` + `resize` listener directly in `App.tsx` (mobile < 768px, tablet 768–1023px, desktop ≥ 1024px). The sidebar collapses to icon-only on tablet and to a full-screen drawer on mobile.

**Components** live in `src/tsx-files/`. Each is a self-contained React component — no shared state, no context. They use inline styles exclusively (no CSS modules or Tailwind). Static images are served from `public/` and referenced as absolute paths (e.g. `/beef-jerky_KiTS-analysis/bag1.png`) so they resolve correctly on GitHub Pages.

**CI/CD:** Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm install && npm run build` and deploys `dist/` to GitHub Pages automatically.
