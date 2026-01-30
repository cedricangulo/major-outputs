# Agent Guidelines for major-outputs

This is a Next.js 16 documentation site with MDX support, built with Fumadocs, Tailwind CSS, and Radix UI components.

## Quick Start

- **Dev server**: `pnpm run dev` (runs with Turbopack on http://localhost:3000)
- **Build**: `pnpm run build` (production build with Turbopack)
- **Lint**: `pnpm run lint` (ESLint + Next.js rules)
- **Format**: `pnpm run format` (Prettier with import sorting and Tailwind classes)
- **Clean**: `pnpm run clean` (removes `.next` and `.source` directories)

## Project Structure

```
app/              - Next.js App Router pages and layouts
├── (labs)        - Dynamic lab routes [subject]/[slug]
├── api/          - API routes (e.g., OG image generation)
├── layout.tsx    - Root layout with ThemeProvider, Header, Footer
└── page.tsx      - Home page

components/       - React components
├── ui/           - Shadcn-style UI components (Button, Tabs, ScrollArea, etc.)
├── shared/       - Reusable components (Header, ModeToggle, ThemeProvider)
└── mdx-components.tsx - Custom MDX element renderers

lib/              - Utilities and helpers
├── utils.ts      - cn() function for merging Tailwind classes
├── source.ts     - Fumadocs MDX collections setup
└── course-sections.ts - Course data structure

public/           - Static assets
.source/          - Generated MDX collection output (gitignored)
.next/            - Build output (gitignored)
```

## Code Style Guidelines

### TypeScript & Strict Mode

- **Strict mode enabled** - All TypeScript strict checks enforced
- **No implicit any** - Always provide explicit types
- **Path aliases**: `@/*` maps to root, `fumadocs-mdx:collections/*` maps to `./.source/*`
- **JSX mode**: `react-jsx` (no need to import React in component files)
- Target: **ES2017** with DOM and ESNext libraries

Example:

```typescript
import React, { FC } from "react"

export const MyComponent: FC<{ title: string }> = ({ title }) => {
  return <div>{title}</div>
}
MyComponent.displayName = "MyComponent"
```

### Import Order

Imports must follow this order with blank line separators:

1. React and React-related imports: `import React from "react"`
2. Next.js imports: `import Link from "next/link"`
3. Aliased imports: `import { cn } from "@/lib/utils"`
4. Relative imports: `import { ModeToggle } from "./mode-toggle"`

Example:

```typescript
import React, { FC, ReactNode } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { ModeToggle } from "./mode-toggle"
```

### Formatting & Code Style

- **Print width**: 80 characters
- **Tab width**: 2 spaces
- **Quotes**: Double quotes `"` for JSX and strings
- **JSX quotes**: Double quotes
- **Semicolons**: None (off)
- **Trailing commas**: All (ES5 compatible)
- **Arrow function parens**: Always `(x) => x` not `x => x`
- **Bracket spacing**: `{ x }` not `{x}`
- **Single attribute per line** in JSX for readability

Example:

```typescript
const Button: FC<{ disabled?: boolean }> = ({ disabled = false, ...props }) => {
  return (
    <button
      className="px-4 py-2"
      disabled={disabled}
      {...props}
    />
  )
}
```

### Tailwind CSS Classes

- **Class merging**: Use `cn()` utility to merge Tailwind classes safely
- **Tailwind functions recognized**: `clsx`, `cn`
- **Class sorting**: Prettier plugin automatically sorts Tailwind classes
- Prettier will organize Tailwind utilities in output order

Example:

```typescript
import { cn } from "@/lib/utils"

const variantClasses = cn(
  "px-4 py-2 rounded-md",
  isActive && "bg-primary text-white",
  disabled && "opacity-50 cursor-not-allowed",
)
```

### Component Naming & Exports

- **Component files**: PascalCase (e.g., `Button.tsx`, `ModeToggle.tsx`)
- **Utility files**: camelCase (e.g., `utils.ts`, `course-sections.ts`)
- **Export named exports** for components: `export { Button, buttonVariants }`
- **Add displayName** for debugging: `Button.displayName = "Button"`
- **Use FC type** for functional components: `const Button: FC<Props> = () => {}`

Example:

```typescript
// components/ui/button.tsx
export const Button: FC<ButtonProps> = ({ variant, size, ...props }) => {
  return <button {...props} />
}
Button.displayName = "Button"

export { buttonVariants } // Re-export CVA variants
```

### Class Variance Authority (CVA)

- Use CVA for component variants: `cva("base-class", { variants: { ... } })`
- Define all variants in a single `cva()` call
- Use `VariantProps<typeof componentVariants>` to extract types
- See `components/ui/button.tsx` for example with multiple variant groups

### Error Handling

- Prefer explicit error types over generic `Error`
- Use try-catch blocks for async operations in Server Components and API routes
- Provide meaningful error messages
- Log errors for debugging (console.error in dev, structured logs in production)

Example:

```typescript
export async function fetchData() {
  try {
    const response = await fetch("/api/data")
    if (!response.ok) throw new Error(`API error: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch data:", error)
    throw error
  }
}
```

### React Best Practices

- **Server Components by default** - Mark Client Components with `"use client"`
- **Prop drilling**: Use Context API for deeply nested props
- **Fragment syntax**: Use `<>` shorthand instead of `<React.Fragment>`
- **Events**: Use inline handlers for simplicity, memoize only if performance critical
- **Keys**: Always provide stable, unique keys for lists

### File Naming Conventions

- Components: `ComponentName.tsx` (PascalCase)
- Utilities: `utility-name.ts` (kebab-case)
- Hooks: `useHookName.ts` (camelCase with `use` prefix)
- Types/interfaces: Exported from component or `types.ts` (PascalCase)
- API routes: `route.ts` in `app/api/[slug]/` directories (Next.js convention)

## Testing & Verification

Currently **no test framework configured**. When adding tests:

- Use Jest or Vitest for unit tests
- Use React Testing Library for component tests
- Configuration should go in `jest.config.ts` or `vitest.config.ts`
- Test files: `*.test.ts` or `*.spec.ts` in `__tests__` or adjacent to source

To run a single test (when configured):

```bash
pnpm run test -- path/to/test.test.ts
```

## Linting & Pre-commit

- **Linter**: ESLint with Next.js/TypeScript rules
- **Formatter**: Prettier (runs on save in most editors)
- Run before committing:
  ```bash
  pnpm run lint
  pnpm run format
  pnpm run build
  ```

## Dependencies to Know

- **Next.js 16**: App Router, built-in optimizations
- **Fumadocs**: MDX documentation site framework
- **Radix UI**: Headless component primitives
- **Tailwind CSS v4**: Utility-first styling with PostCSS
- **Zod**: Runtime schema validation
- **Motion**: Animation library
- **Lucide React**: SVG icon library
- **next-themes**: Dark mode support

## Common Tasks

### Add a new UI component

1. Create `components/ui/component-name.tsx`
2. Follow button.tsx pattern: use CVA for variants, export named exports
3. Run `pnpm run format` to sort imports and classes

### Add documentation content

1. Add MDX files to `.source/` directory (check Fumadocs docs for collection structure)
2. Use custom MDX components from `components/mdx-components.tsx`
3. Run `pnpm run dev` to see changes (Fumadocs auto-generates collection)

### Update styling

1. Modify Tailwind classes in component JSX
2. Add custom Tailwind extensions to `tailwind.config.ts` if needed
3. Run `pnpm run format` to sort classes automatically

### Fix type errors

```bash
pnpm run build  # Full type check and build
# Fix errors in source
pnpm run lint   # Check ESLint issues
```
