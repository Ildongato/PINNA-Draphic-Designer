import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ProjectTransitionProvider } from "@/components/interaction/ProjectTransitionProvider";
import { RevealEnhancer } from "@/components/interaction/RevealEnhancer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/data/site";
import { assetPath } from "@/lib/assets";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`
  },
  description: site.description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: assetPath("/brand/og-image.webp"),
        width: 1200,
        height: 630,
        alt: "Pinna design graphic identity preview"
      }
    ],
    type: "website"
  },
  icons: {
    icon: assetPath("/brand/favicon.svg")
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f3ee"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <ProjectTransitionProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content" className="page-main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
          <RevealEnhancer />
        </ProjectTransitionProvider>
      </body>
    </html>
  );
}
