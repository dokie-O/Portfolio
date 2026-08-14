import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/ui/PageLoader";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { profile, socialLinks, SITE_URL } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "900"],
});

const title = `${profile.name} — ${profile.title}`;
const description = `${profile.tagline} Portfolio, projects, skills, and contact info for ${profile.name}, ${profile.title.toLowerCase()}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: [
    profile.name,
    profile.title,
    "Frontend Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: title,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: profile.bio,
  url: SITE_URL,
  sameAs: socialLinks.map((link) => link.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <PageLoader />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
