# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Commands

```bash
# Development
pnpm run dev              # Start dev server with Turbopack on http://localhost:3000

# Building & Testing
pnpm run build            # Production build with Turbopack
pnpm run types:check      # Check TypeScript types and run Fumadocs MDX generation
pnpm run start            # Start production server

# Code Quality
pnpm run lint             # Run Biome linter (Next.js + React rules)
pnpm run format           # Auto-format code with Biome

# Pre-commit checklist
pnpm run lint && pnpm run format && pnpm run build
```

## High-Level Architecture

This is a **Next.js 16 documentation site** for course laboratory outputs. Key characteristics:

- **Content**: Course-organized MDX documentation stored in `content/[subject-code]/`
- **Framework Stack**: Next.js App Router, Fumadocs (MDX framework), Radix UI, Tailwind CSS v4
- **Routing**: Dynamic routes based on subject codes with filtered content per subject
- **Build**: Turbopack for fast compilation, TypeScript strict mode enabled
- **Styling**: Tailwind CSS v4 with custom Radix UI components, Geist fonts (sans, mono, pixel)

## App Router Structure

```
app/
├── (home)/
│   ├── page.tsx           # Home page: grid of course cards (from courseSections)
│   └── layout.tsx         # Home-only layout wrapper
├── [subject]/
│   ├── page.tsx           # Subject page: grid of lab/exercise cards (filtered by subject)
│   ├── [output]/
│   │   └── page.tsx       # Content detail page: renders MDX with custom components
│   └── layout.tsx         # Subject-scoped layout
├── api/
│   └── og/route.tsx       # OG image generation endpoint
├── layout.tsx             # Root layout: Header, RootProvider, ErrorBoundary, ViewTransitions
└── not-found.tsx          # Custom 404 page
```

Key routing dynamics:
- `/:subject` - Shows all non-draft labs/exercises for that subject, sorted by midterm/final
- `/:subject/:output` - Renders individual MDX content with subject-scoped navigation
- Valid subjects are defined in `lib/source.ts` as `validSubjects`

## Critical Architectural Patterns

### 1. Subject-Based Content Filtering (`lib/source.ts`)

The `getSource(subject)` function is the core data loader:
- Takes a subject code and returns a Fumadocs loader for just that subject's content
- Filters `docs.toFumadocsSource()` to only include files where `path.startsWith(subject)/`
- Returns `null` for invalid subjects (triggers 404)
- Used in page routes and `generateStaticParams()`

**Usage:**
```typescript
// In page routes
const source = getSource(subject);  // null or loader
if (!source) return notFound();
const allPages = source.getPages();  // All non-meta MDX files for subject
const page = source.getPage([subject, output]);  // Single MDX file
```

### 2. Server Components & Async Routes

All app routes are async Server Components:
- `app/[subject]/page.tsx` - Fetches all labs, filters drafts, sorts by m-/f- prefix
- `app/[subject]/[output]/page.tsx` - Fetches single MDX, renders with `getMDXComponents()`
- Both generate `Metadata` separately via `generateMetadata()` function (not default export)
- `[subject]/[output]/page.tsx` also exports `generateStaticParams()` to pre-render all content

### 3. Dynamic Metadata & OG Image Generation

- `generateMetadata()` creates page titles, descriptions, and OG images
- OG images hit `/api/og?title=...&subject=...` API route
- OG image generation happens at request time (not build time)
- Subject full names are mapped in `components/shared/course-section.tsx`

### 4. Lab Content Organization & Detection

Labs are organized with URL patterns:
- `m-1-lab-name.mdx` - Midterm lab (URL includes "/m-")
- `f-1-lab-name.mdx` - Final lab (URL includes "/f-")
- Pages are filtered by `draft: true` in frontmatter
- Content type detected via `detectContentType()` function (checks URL for "lab", "exercise", "case")

Frontmatter schema (in `source.config.ts`):
```typescript
{
  title: string;           // Required
  description?: string;    // Lab description
  difficulty?: "easy" | "medium" | "hard";
  files?: number;          // Number of deliverable files
  draft?: boolean;         // Hide from listings if true
  date?: Date;
}
```

### 5. Dynamic Imports & Performance

- `LabCard` component is dynamically imported in `[subject]/page.tsx` to reduce bundle size
- Has loading skeleton while component loads
- This pattern should be used for large or rarely-visible components

### 6. Error Handling & Boundaries

- Root layout wraps content in `<ErrorBoundary>` from `components/shared/error-boundary`
- Invalid routes return `notFound()` (triggers built-in Next.js 404)
- `generateStaticParams()` pre-renders all valid param combinations

## Content & Frontmatter Structure

Content lives in `content/[subject]/` with `.mdx` files:

```
content/
├── cc104/
│   ├── meta.ts           # Fumadocs metadata (title, description, icon)
│   ├── m-1-intro.mdx     # Midterm lab 1
│   └── f-1-final.mdx     # Final lab
├── itwst03/
│   ├── meta.ts
│   └── ...
└── [other subjects]/
```

Custom MDX components are defined in `mdx-components.tsx` and injected via `getMDXComponents()`.

## Styling & Design Tokens

- **Tailwind CSS v4**: Uses latest syntax with PostCSS v4
- **Radix UI**: Headless primitives for accessibility
- **Geist Fonts**: Sans, mono, and pixel-square fonts loaded via CSS variables
- **Dark Mode**: Controlled by `next-themes` + `RootProvider` from fumadocs-ui
- **Class Merging**: Use `cn()` from `lib/utils.ts` to safely merge Tailwind classes
- **View Transitions**: `next-view-transitions` provides smooth page transitions when navigating

## Type Safety & Validation

- **TypeScript strict mode**: All options enabled, no implicit any
- **Zod**: Runtime schema validation available (see `source.config.ts`)
- **Path aliases**: `@/*` points to root, `fumadocs-mdx:collections/*` points to `./.source/`
- **Generated types**: `.next/types/` and `.source/` contain auto-generated code

## Detailed Guidelines

For comprehensive code style, formatting, component patterns, and development workflows, see **`AGENTS.md`** in the root directory. It covers:
- Import ordering and formatting rules
- Component naming and exports
- CVA (Class Variance Authority) patterns for variants
- TypeScript conventions
- React best practices (Server Components, keys, memoization)
- Tailwind class organization
- Error handling patterns
- Testing setup when needed

## Static Generation & Pre-rendering

- `[subject]/[output]/page.tsx` exports `generateStaticParams()` which pre-renders all ~50+ content pages at build time
- Home page is SSR (no params to pre-render)
- Subject listing pages are SSR with on-demand filtering
- OG images are generated dynamically (not pre-rendered)

## Biome Linter Configuration

- **Linting**: ESLint with `next` and `react` recommended rules
- **Formatting**: 2-space indentation, 80-char line width (see `AGENTS.md` for full formatting rules)
- **Import organization**: Biome's `organizeImports` action reorders imports (configure in editor)
- **Ignoring**: `.next`, `.source`, `node_modules`, and `dist` excluded from linting
