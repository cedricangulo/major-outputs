import React, { type FC, type ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  return <div className="py-6">{children}</div>;
};

PageWrapper.displayName = "PageWrapper";

export { PageWrapper };
