import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { ErrorBoundary } from "@/components/shared/error-boundary";
import { Header } from "@/components/shared/header";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { GeistPixelSquare } from 'geist/font/pixel';

import "./globals.css";

const fontVariables = `${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://cedricc.vercel.app"),
  title: {
    template: "cedric | %s",
    default: "cedric",
  },
  description: "This is where I store my outputs from my major subjects.",
  openGraph: {
    title: "cedric",
    description: "This is where I store my outputs from my major subjects.",
    url: "https://cedricc.vercel.app",
    siteName: "cedric",
    images: [
      {
        url: "https://11j9kbjs2p.ufs.sh/f/UblXrSiF6MzLKHE7DsIplfOcIvx0AMLZFeQT8ju5Bh6XqVUo",
        width: 1600,
        height: 800,
        alt: "cedric",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "cedricc",
    description: "This is where I store my outputs from my major subjects.",
    images: [
      "https://11j9kbjs2p.ufs.sh/f/UblXrSiF6MzLKHE7DsIplfOcIvx0AMLZFeQT8ju5Bh6XqVUo",
    ],
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning className={fontVariables}>
        <body className="antialiased">
          <RootProvider>
            <Header />
            <ErrorBoundary>
              <main className="mx-auto max-w-5xl p-4">{children}</main>
            </ErrorBoundary>
          </RootProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
