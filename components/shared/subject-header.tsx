import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  FileText,
  Laptop,
  Pencil,
} from "lucide-react";
import { Link } from "next-view-transitions";
import type { FC, ReactNode } from "react";

import { cn, formatSubject } from "@/lib/utils";

import { subjectFullNames } from "./course-section";

interface SubjectHeaderProps {
  subject: string;
  title?: string;
  backHref: string;
  actions?: ReactNode;
  metadata?: {
    midtermCount: number;
    finalCount: number;
    totalCount: number;
  };
  contentMeta?: {
    description?: string;
    difficulty?: "easy" | "medium" | "hard";
    files?: number;
    url?: string;
    contentType?: ContentType;
  };
}

type ContentType = "laboratory" | "exercise" | "case-study" | "default";

const difficultyConfig = {
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
} as const;

const contentTypeConfig: Record<
  ContentType,
  { icon: typeof Laptop; label: string }
> = {
  laboratory: { icon: Laptop, label: "Laboratory" },
  exercise: { icon: Pencil, label: "Exercise" },
  "case-study": { icon: Briefcase, label: "Case Study" },
  default: { icon: FileText, label: "Document" },
};

function detectContentType(url: string): ContentType {
  if (url.includes("lab")) return "laboratory";
  if (url.includes("exercise")) return "exercise";
  if (url.includes("case")) return "case-study";
  return "default";
}

const SubjectHeader: FC<SubjectHeaderProps> = ({
  subject,
  title,
  backHref,
  actions,
  metadata,
  contentMeta,
}) => {
  const fullSubjectName = subjectFullNames[formatSubject(subject)];
  const { difficulty, files, url, contentType } = contentMeta ?? {};
  const resolvedContentType =
    contentType ?? (url ? detectContentType(url) : null);
  const contentTypeDetails = resolvedContentType
    ? contentTypeConfig[resolvedContentType]
    : null;
  const ContentIcon = contentTypeDetails?.icon;
  const showContentMeta = Boolean(
    difficulty || contentTypeDetails || (files !== undefined && files > 0),
  );

  return (
    <header className="border-b pb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
          aria-label="Go back"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
        </Link>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {formatSubject(subject)}
          </h1>
          <p className="text-muted-foreground">{title || fullSubjectName}</p>

          {/* {description && (
            <p className="text-sm text-muted-foreground mt-3">{description}</p>
          )} */}
        </div>

        {(metadata || showContentMeta) && (
          <div className="flex flex-col gap-3 shrink-0 items-start lg:items-end">
            {metadata && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs">
                  <BookOpen className="size-4 text-muted-foreground" />
                  <span className="font-medium">
                    {metadata.totalCount} Labs
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {metadata.midtermCount > 0 && (
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded border",
                        "bg-muted text-muted-foreground border-border",
                      )}
                    >
                      {metadata.midtermCount} Midterms
                    </span>
                  )}
                  {metadata.finalCount > 0 && (
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded border",
                        "bg-muted text-muted-foreground border-border",
                      )}
                    >
                      {metadata.finalCount} Finals
                    </span>
                  )}
                </div>
              </div>
            )}

            {showContentMeta && (
              <div className="flex items-center gap-3 flex-wrap">
                {difficulty && (
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-1 rounded border",
                      difficultyConfig[difficulty].className,
                    )}
                  >
                    {difficultyConfig[difficulty].label}
                  </span>
                )}

                {contentTypeDetails && ContentIcon && (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ContentIcon className="size-4" />
                    {contentTypeDetails.label}
                  </span>
                )}

                {files !== undefined && files > 0 && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <FileText className="size-4" />
                    {files} file{files !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

SubjectHeader.displayName = "SubjectHeader";

export { SubjectHeader };
