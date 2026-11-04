import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/data/content";
import { id as dict } from "@/i18n/id";
import { langInitScript } from "@/i18n/LanguageProvider";
import { SkipLink } from "@/components/ui/SkipLink";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
  display: "swap",
});

// Metadata awal (server) memakai bahasa default; LanguageProvider memperbaruinya di client.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: dict.meta.title,
  description: dict.meta.description,
  keywords: ["System Administration", "Network Engineering", "Cloud", "DevOps", "Proxmox", "MikroTik", "Portofolio"],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: dict.meta.ogLocale,
    alternateLocale: ["en_US"],
    title: dict.meta.title,
    description: dict.meta.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary",
    title: site.name,
    description: dict.meta.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B294D",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: next-themes (class) & script bahasa (lang) mengubah <html> sebelum hidrasi.
    <html lang="id" className={`${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: langInitScript }} />
      </head>
      <body className="font-sans">
        <Providers>
          <SkipLink />
          {children}
        </Providers>
      </body>
    </html>
  );
}
