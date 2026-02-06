"use client";

import {
  Briefcase,
  FileText,
  Laptop,
  type LucideIcon,
  Pencil,
} from "lucide-react";
import { Link } from "next-view-transitions";

import { cn } from "@/lib/utils";

type Difficulty = "easy" | "medium" | "hard";
type ContentType = "laboratory" | "exercise" | "case-study" | "default";

const difficultyConfig: Record<
  Difficulty,
  { label: string; className: string }
> = {
  easy: {
    label: "Easy",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900",
  },
  medium: {
    label: "Medium",
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900",
  },
  hard: {
    label: "Hard",
    className:
      "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900",
  },
};

const contentTypeIcons: Record<ContentType, LucideIcon> = {
  laboratory: Laptop,
  exercise: Pencil,
  "case-study": Briefcase,
  default: FileText,
};

interface LabCardProps {
  title: string;
  href: string;
  description?: string;
  difficulty?: Difficulty;
  contentType?: ContentType;
  fileCount?: number;
  category?: "midterm" | "final";
}

export function LabCard({
  title,
  href,
  description,
  difficulty,
  contentType = "default",
  fileCount,
  category,
}: LabCardProps) {
  const Icon = contentTypeIcons[contentType];
  const difficultyStyle = difficulty ? difficultyConfig[difficulty] : null;

  const labNumberMatch = title.match(/\d+/);
  const labNumber = labNumberMatch ? parseInt(labNumberMatch[0], 10) : null;

  return (
    <Link
      href={href}
      className={cn(
        "group block p-4 border rounded-lg bg-card transition-all",
        "hover:border-muted-foreground/30 hover:bg-accent/80",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        category === "midterm" && "border-l-4 border-l-muted-foreground/20",
        category === "final" && "border-l-4 border-l-muted-foreground/10",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {labNumber && (
            <span className="text-2xl font-bold text-muted-foreground/30 shrink-0">
              {labNumber.toString().padStart(2, "0")}
            </span>
          )}
          <div className="min-w-0">
            <h3 className="text-sm font-semibold leading-tight truncate">
              {title}
            </h3>
          </div>
        </div>
        <Icon
          className="size-4 text-muted-foreground/60 shrink-0 mt-0.5"
          aria-hidden="true"
        />
      </div>

      {description ? (
        <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
          {description}
        </p>
      ) : null}

      <div className="flex items-center gap-2 mt-3 flex-wrap">
        {difficultyStyle ? (
          <span
            className={cn(
              "text-[10px] font-medium px-1.5 py-0.5 rounded border",
              difficultyStyle.className,
            )}
          >
            {difficultyStyle.label}
          </span>
        ) : null}

        {fileCount !== undefined && fileCount > 0 ? (
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <span>{fileCount}</span>
            <span>file{fileCount !== 1 ? "s" : ""}</span>
          </span>
        ) : null}
      </div>

      {/* Desktop-only hover preview */}
      <div className="hidden md:block md:opacity-0 md:group-hover:opacity-100 transition-opacity mt-2 pt-2 border-t border-border/50">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          Open
          <svg
            className="size-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

LabCard.displayName = "LabCard";
