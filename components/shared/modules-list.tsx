"use client";

import { BookOpen } from "lucide-react";
import { Link } from "next-view-transitions";
import type { FC } from "react";

import { cn } from "@/lib/utils";

interface Module {
  title: string;
  url: string;
  description?: string;
}

interface ModulesListProps {
  modules: Module[];
}

export const ModulesList: FC<ModulesListProps> = ({ modules }) => {
  if (modules.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-lg font-semibold tracking-tight mb-6">
        Modules
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {modules.map((module) => (
          <Link
            key={module.url}
            href={module.url}
            className={cn(
              "group block p-4 border rounded-lg bg-card transition-all",
              "hover:border-muted-foreground/30 hover:bg-accent/80",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
          >
            <div className="flex items-center gap-4 min-w-0">
              <BookOpen className="size-4 text-muted-foreground/60 shrink-0" />
              <h3 className="text-sm font-semibold my-0 leading-tight truncate">
                {module.title}
              </h3>
            </div>

            {module.description ? (
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                {module.description}
              </p>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
};

ModulesList.displayName = "ModulesList";
