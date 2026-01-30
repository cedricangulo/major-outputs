import type { FC } from "react";

import { cn } from "@/lib/utils";

type DividerVariant = "top" | "middle" | "bottom";

interface StripedDividerProps {
  variant?: DividerVariant;
  className?: string;
}

const variantClasses: Record<DividerVariant, string> = {
  top: "border-b mb-4",
  middle: "border-y my-4",
  bottom: "border-y mt-12",
};

const StripedDivider: FC<StripedDividerProps> = ({
  variant = "middle",
  className,
}) => {
  return (
    <div
      className={cn(
        "h-8 md:h-10 w-full col-start-2 row-span-5 row-start-1",
        "bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]",
        "bg-size-[10px_10px] bg-fixed",
        variantClasses[variant],
        className,
      )}
    />
  );
};

StripedDivider.displayName = "StripedDivider";

export { StripedDivider };
