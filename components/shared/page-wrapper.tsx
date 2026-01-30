import type { FC, ReactNode } from "react";

import { CornerDecoration } from "./corner-decoration";

interface PageWrapperProps {
  children: ReactNode;
}

const CORNER_POSITIONS = [
  "top-right",
  "top-left",
  "bottom-left",
  "bottom-right",
] as const;

const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="relative border">
      {CORNER_POSITIONS.map((position) => (
        <CornerDecoration key={position} position={position} />
      ))}
      {children}
    </div>
  );
};

PageWrapper.displayName = "PageWrapper";

export { PageWrapper };
