import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

const SITE_URL = "https://thelittleguyfromhti.com";
const OG_IMAGE = "https://littleguyhti.vercel.app/photo.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Will Sigmon | Digital Equity Advocate",
  description:
    "Director of Business Development at HUBZone Technology Initiative. Turning surplus laptops into life-changing opportunities for 2,500+ NC families.",
  openGraph: {
    title: "Will Sigmon | Digital Equity Advocate",
    description:
      "Director of Business Development at HTI. Transforming surplus tech into community impact across North Carolina.",
    images: [OG_IMAGE],
    url: SITE_URL,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Sigmon | Digital Equity Advocate",
    description:
      "Director of Business Development at HTI. Transforming surplus tech into community impact.",
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1a1a1a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmSans.variable}`}>
        {children}
        <Script id="vercel-analytics-init" strategy="beforeInteractive">
          {`window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`}
        </Script>
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
