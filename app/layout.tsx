import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

const SITE_URL = "https://thelittleguyfromhti.com";
const OG_IMAGE = `${SITE_URL}/photo.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: "Will Sigmon | Digital Equity Advocate",
  description:
    "Will Sigmon, Director of Business Development at HUBZone Technology Initiative. Helping turn surplus laptops into secure HTI Chromebooks across North Carolina.",
  openGraph: {
    title: "Will Sigmon | Digital Equity Advocate",
    description:
      "Helping turn surplus laptops into secure HTI Chromebooks and expand digital opportunity across North Carolina.",
    images: [OG_IMAGE],
    url: SITE_URL,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Sigmon | Digital Equity Advocate",
    description:
      "Helping turn surplus laptops into secure HTI Chromebooks across North Carolina.",
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
      <body className={`${fraunces.variable} ${dmSans.variable}`}>
        {children}
        <Script id="vercel-analytics-init" strategy="beforeInteractive">
          {`window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`}
        </Script>
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
