"use client";

import { RootProvider } from "fumadocs-ui/provider/next";
import "fumadocs-ui/style.css";
import { ThemeProvider } from "next-themes";

import { ReactNode } from "react";

export { ThemeProvider };

export function Providers({ children }: { children: ReactNode }) {
  return (
    <RootProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </RootProvider>
  );
}
