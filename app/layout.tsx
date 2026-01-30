import { RootProvider } from "fumadocs-ui/provider/next";
import { Header } from "@/components/shared/header";

import localFont from "next/font/local";
import { Metadata } from "next";

import "./globals.css";

const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootProvider>
          <Header />
          <main role="main" className="mx-auto max-w-5xl p-4">
            {children}
          </main>
        </RootProvider>
      </body>
    </html>
  );
}
