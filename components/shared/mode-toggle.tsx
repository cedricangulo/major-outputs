"use client";

import { LoaderIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

import { Button } from "../ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="size-8 grid place-content-center">
        <LoaderIcon className="text-foreground size-4 animate-spin" />
      </div>
    );
  }

  const isLight = theme === "light";

  return (
    <Button
      variant="ghost"
      className="text-foreground size-8 m-0 p-0"
      onClick={() => setTheme(isLight ? "dark" : "light")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4.5"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M12 3l0 18"></path>
        <path d="M12 9l4.65 -4.65"></path>
        <path d="M12 14.3l7.37 -7.37"></path>
        <path d="M12 19.6l8.85 -8.85"></path>
      </svg>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
