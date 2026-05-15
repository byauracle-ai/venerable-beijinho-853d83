# AGENTS.md — ÉDEN ESTATES Architecture Guide

This document is for AI agents working on this codebase. It supersedes the original template descriptions below.

## Project Summary

Ultra-luxury boutique villa sales website for Mauritius. Target audience: HNWI buyers seeking premium property + residency. Built on TanStack Start, deployed to Netlify.

## Actual Directory Structure (post-build)

```
src/
├── data/
│   └── products.ts         # Villa catalog — Villa interface + 4 estate entries
├── routes/
│   ├── __root.tsx          # Root layout: Cormorant Garamond + Outfit Google Fonts, dark meta
│   ├── index.tsx           # Full landing page — NavBar, Hero, VillasSection, InvestmentSection,
│   │                       # ResidencySection, ContactSection, Footer all in one file
│   └── products/
│       └── $productId.tsx  # Villa detail page with inquiry modal
├── styles.css              # Design system: CSS vars (--gold, --obsidian, --surface-*),
│                           # animations (fadeInUp, scaleIn, float), luxury utility classes
└── router.tsx              # TanStack Router setup (do not modify)
```

## Key Architecture Decisions

### All sections in `index.tsx`
Single-file landing page. Do not split into separate route files unless adding real sub-pages. The file exports one `HomePage` component composed of named sub-components.

### Inline styles + CSS variables (not Tailwind)
The luxury design uses CSS custom properties (`var(--gold)`, `var(--obsidian)`, etc.) with inline styles. Tailwind is available but mostly unused in the luxury components. Follow this pattern for new UI work.

### `useInView` scroll animation hook
Custom IntersectionObserver hook in `index.tsx` triggers one-shot CSS animations. Do not add Framer Motion.

### Villa data shape
`src/data/products.ts` exports `Villa` interface with: `id, name, location, image, gallery, description, shortDescription, price, bedrooms, bathrooms, sqm, landSqm, features[], tag`.

### No form backend yet
Contact form and inquiry modal are client-side only. For real form handling: use Netlify Forms skill at `.agents/skills/netlify-forms-tanstack/SKILL.md`.

## Design Tokens (styles.css `:root`)

| Variable | Value | Use |
|----------|-------|-----|
| `--gold` | `#c9a468` | Primary accent |
| `--obsidian` | `#080807` | Page background |
| `--surface` | `#0f0f0d` | Cards/panels |
| `--text-primary` | `#ede8df` | Headings |
| `--text-secondary` | `#a09888` | Body copy |
| `--border` | `rgba(201,164,104,0.15)` | Borders |

## Typography Classes

- `font-display` → Cormorant Garamond (headings, prices, display text)
- Default body → Outfit (UI text, labels, body copy)
- `section-label` → 11px uppercase gold letter-spaced label
- `gold-gradient-text` → gradient text for hero emphasis

---

## Original Template Overview (for reference)

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI + custom components |
| Content | Content Collections (type-safe markdown) |
| AI | TanStack AI with multi-provider support |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
├── public
│   ├── favicon.ico
│   ├── logo.png
│   ├── tanstack-circle-logo.png
│   └── tanstack-word-logo-white.svg  # TanStack wordmark logo (white) used in header/nav.
├── src
│   ├── components
│   │   ├── Header.tsx  # Header.
│   │   ├── HeaderNav.tsx  # Navigation sidebar template: mobile menu, Home link, add-on routes; EJS-driven for dynamic route generation.
│   │   ├── ProductAIAssistant.tsx  # AI marketing assistant.
│   │   └── ProductRecommendation.tsx  # Product recommendation card.
│   ├── data
│   │   └── products.ts  # Product catalog data template.
│   ├── lib
│   │   ├── product-ai-hook.ts  # useProductChat hook.
│   │   └── product-tools.ts  # AI tools: getProducts, recommendProduct.
│   ├── routes
│   │   ├── products
│   │   │   └── $productId.tsx  # Product detail page with recommendation.
│   │   ├── __root.tsx  # Root layout: Header, styles.
│   │   ├── api.product-chat.ts  # POST handler for product AI chat.
│   │   └── index.tsx  # Marketing home with ProductAIAssistant.
│   ├── store
│   │   └── product-assistant.ts  # Zustand store for assistant state.
│   ├── router.tsx  # TanStack Router setup: creates router from generated routeTree with scroll restoration.
│   └── styles.css  # Global styles.
├── .gitignore  # Template for .gitignore: node_modules, dist, .env, .netlify, .tanstack, etc.
├── AGENTS.md  # This document provides an overview of the project structure for developers and AI agents working on this codebase.
├── netlify.toml  # Netlify deployment config: build command (vite build), publish directory (dist/client), and dev server settings (port 8888, target 3000).
├── package.json  # Project manifest with TanStack Start, React 19, Vite 7, Tailwind CSS 4, and Netlify plugin dependencies; defines dev and build scripts.
├── pnpm-lock.yaml
├── tsconfig.json  # TypeScript config: ES2022 target, strict mode, @/* path alias for src/*, bundler module resolution.
└── vite.config.ts  # Vite config template: TanStack Start, React, Tailwind, Netlify plugin, and optional add-on integrations; processed by EJS.
```

## Key Concepts

### File-Based Routing (TanStack Router)

Routes are defined by files in `src/routes/`:

- `__root.tsx` - Root layout wrapping all pages
- `index.tsx` - Route for `/`
- `api.*.ts` - Server API endpoints (e.g., `api.resume-chat.ts` → `/api/resume-chat`)

### Component Architecture

**UI Primitives** (`src/components/ui/`):
- Radix UI-based, Tailwind-styled
- Card, Badge, Checkbox, Separator, HoverCard

**Feature Components** (`src/components/`):
- Header, HeaderNav, ResumeAssistant

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite plugins: TanStack Start, Netlify, Tailwind, Content Collections |
| `tsconfig.json` | TypeScript config with `@/*` path alias for `src/*` |
| `netlify.toml` | Build command, output directory, dev server settings |
| `content-collections.ts` | Zod schemas for jobs and education frontmatter |
| `styles.css` | Tailwind imports + CSS custom properties (oklch colors) |

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Conventions

### Naming
- Components: PascalCase
- Utilities/hooks: camelCase
- Routes: kebab-case files

### Styling
- Tailwind CSS utility classes
- `cn()` helper for conditional class merging
- CSS variables for theme tokens in `styles.css`

### TypeScript
- Strict mode enabled
- Import paths use `@/` alias
- Zod for runtime validation
- Type-only imports with `type` keyword

### State Management
- React hooks for local state
- Zustand if you need it for global state
### Marketing Site with AI Assistant

Marketing site with TanStack AI chat assistant. No Stripe checkout.

**AI tools available:**
- `getProducts` - Get all products from catalog
- `recommendProduct` - Display product recommendation card (MUST use for recommendations)

**Components:** ProductAIAssistant, ProductRecommendation

**Dependencies:** @tanstack/ai, streamdown

## Environment Variables

For AI: ANTHROPIC_API_KEY, OPENAI_API_KEY, GEMINI_API_KEY, or OLLAMA_BASE_URL (same as ai add-on).

## Application Name

This starter uses "Application Name" as a placeholder throughout the UI and metadata. Replace it with the user's desired application name in the following locations:

### UI Components
- `src/components/Header.tsx` — app name displayed in the header
- `src/components/HeaderNav.tsx` — app name in the mobile navigation header

### SEO Metadata
- `src/routes/__root.tsx` — the `title` field in the `head()` configuration

Search for all occurrences of "Application Name" in the `src/` directory and replace with the user's application name.
