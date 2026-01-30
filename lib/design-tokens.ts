/**
 * Design tokens for the application
 * Centralized values for spacing, sizing, colors, and other constants
 */

export const SPACING = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
} as const;

export const CORNER_DECORATION = {
  size: "1.5rem", // size-6 = 24px
  offset: "-0.77rem",
} as const;

export const GRID = {
  maxWidth: "80rem", // max-w-5xl in layout
  padding: "1rem", // p-4 in layout
  colsMobile: 1,
  colsTablet: 2,
  colsDesktop: 3,
} as const;

export const TYPOGRAPHY = {
  heading: {
    h1: "text-4xl lg:text-5xl font-extrabold tracking-tight",
    h2: "text-3xl font-semibold tracking-tight",
    h3: "text-2xl font-semibold tracking-tight",
    h4: "text-xl font-semibold tracking-tight",
  },
  body: {
    default: "text-base",
    sm: "text-sm",
    xs: "text-xs",
  },
} as const;

export const COLORS = {
  text: {
    primary: "text-foreground",
    secondary: "text-muted-foreground",
    accent: "text-accent-foreground",
    destructive: "text-destructive",
  },
  border: {
    default: "border-border",
    accent: "border-accent",
    input: "border-input",
    destructive: "border-destructive",
  },
  background: {
    primary: "bg-background",
    secondary: "bg-secondary",
    accent: "bg-accent",
    muted: "bg-muted",
  },
} as const;

export const TRANSITIONS = {
  fast: "transition-all duration-150",
  normal: "transition-all duration-300",
  slow: "transition-all duration-500",
} as const;

export const SHADOWS = {
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
} as const;

export const BORDER_RADIUS = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
} as const;
