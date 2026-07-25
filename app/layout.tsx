import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "@/lib/constants";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A&M Repair & Towing | 24/7 Towing & Light Truck Services in Montgomery County, MD",
  description:
    "A&M Repair & Towing provides fast, courteous, and affordable 24/7 towing and light truck services in Montgomery County, Maryland. Family-owned and serving the community since 2003.",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS.name,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  areaServed: BUSINESS.serviceArea,
  foundingDate: BUSINESS.established,
  description: "24/7 towing and light truck services serving Montgomery County, Maryland since 2003.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${inter.variable}`}>
      <body className="font-body text-charcoal antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
