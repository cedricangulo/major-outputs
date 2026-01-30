import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={{
        name: "root",
        children: [],
      }}
      sidebar={{
        enabled: false,
      }}
      nav={{
        enabled: false,
      }}
      containerProps={{
        style: {
          gridTemplate: "none",
          display: "block",
          overflow: "visible",
        } as React.CSSProperties,
      }}
    >
      {children}
    </DocsLayout>
  );
}
