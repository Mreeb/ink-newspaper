import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "INK Newspaper — The Weekly Editorial",
    template: "%s | INK Newspaper",
  },
  description: "A refined weekly digital newspaper crafted with editorial rigor, thoughtful essays, investigative reporting, and clay-molded clarity.",
  keywords: ["weekly newspaper", "editorial journalism", "Dexter's Vantage Point", "investigative news", "world affairs", "technology", "culture"],
  authors: [{ name: "INK Editorial Board" }],
  creator: "INK Publishing",
  publisher: "INK Newspaper",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "INK Newspaper",
    title: "INK Newspaper — The Weekly Editorial",
    description: "A refined weekly digital newspaper crafted with editorial rigor and clay-molded clarity.",
    images: [
      {
        url: "/og-ink-newspaper.png",
        width: 1200,
        height: 630,
        alt: "INK Newspaper - The Weekly Editorial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INK Newspaper — The Weekly Editorial",
    description: "A refined weekly digital newspaper crafted with editorial rigor.",
    creator: "@inknewspaper",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${manrope.variable}`}
    >
      <head>
        <link rel="alternate" type="application/rss+xml" title="INK Newspaper RSS Feed" href="/feed.xml" />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#C96846]/20 selection:text-[#91442F] dark:selection:bg-[#E17A56]/30 dark:selection:text-[#F5EFE6]">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
