# ÉDEN ESTATES — Mauritius Boutique Villas

An ultra-luxury real estate website for boutique villa sales in Mauritius. Designed to attract high-net-worth individuals (HNWI) seeking premium property investment, Mauritian residency, and favorable tax positioning.

## Overview

ÉDEN ESTATES presents a curated portfolio of four exclusive villas across Mauritius's most coveted locations, starting from $1,250,000. Each property qualifies for Mauritian Permanent Residency under the government's property investment programme.

## Key Sections

- **Hero** — Full-screen cinematic entry with key investment metrics (0% capital gains tax, 15% income tax)
- **Villa Portfolio** — Asymmetric grid showcasing four boutique estates with pricing, specs, and photography
- **Investment Case** — World Bank data, tax structure breakdown, and Mauritius wealth growth metrics
- **Residency Programme** — Four-step guide to acquiring Mauritian permanent residency through property investment
- **Private Consultation** — Confidential inquiry form with villa-specific private viewing requests

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start (React 19) |
| Router | TanStack Router v1 (file-based) |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + inline CSS (luxury design system) |
| Typography | Cormorant Garamond (display) + Outfit (body) via Google Fonts |
| Deployment | Netlify |
| Language | TypeScript 5.7 (strict) |

## Design System

- **Color palette:** Obsidian (`#080807`), warm gold (`#c9a468`), off-white text (`#ede8df`)
- **Typography:** Cormorant Garamond for all headings/display text; Outfit for body copy and UI
- **Motion:** CSS keyframe animations (`fadeInUp`, `scaleIn`, `float`) triggered by IntersectionObserver
- **Layout:** Asymmetric 12-column grid (taste-skill DESIGN_VARIANCE: 8)

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts on `http://localhost:3000`.

For full Netlify feature emulation (functions, etc.):

```bash
netlify dev
```

This starts a proxy on `http://localhost:8888`.

## Environment Variables

No environment variables are required for the base site. If adding AI chat features in future:

```
ANTHROPIC_API_KEY=sk-ant-...
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Main landing page (hero, portfolio, investment, residency, contact) |
| `/products/:id` | Individual villa detail page with inquiry modal |
