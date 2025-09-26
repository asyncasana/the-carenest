import React from "react";
import { Merriweather, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "../components/ui/Header";
import { Footer } from "../components/ui/Footer";
import { CookieBanner } from "../components/ui/CookieBanner";
import { sanityClient } from "../sanity/client";
import { urlFor } from "../sanity/lib/image";

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
  weight: ["300", "400", "700"], // Only load needed weights
  preload: true,
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600"], // Only load needed weights
  preload: true,
});

export async function generateMetadata() {
  const settings = await sanityClient.fetch(`
    *[_type == "siteSettings"][0]{
      siteTitle, 
      siteDescription,
      metaImage,
      metaImageAlt
    }
  `);

  const metaImage = settings?.metaImage
    ? urlFor(settings.metaImage).width(1200).height(630).url()
    : null;

  return {
    title: settings?.siteTitle,
    description: settings?.siteDescription,
    // Performance optimizations
    metadataBase: new URL("https://the-carenest.co.uk"),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: settings?.siteTitle,
      description: settings?.siteDescription,
      type: "website",
      images: metaImage
        ? [
            {
              url: metaImage,
              width: 1200,
              height: 630,
              alt: settings?.metaImageAlt || settings?.siteTitle,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: settings?.siteTitle,
      description: settings?.siteDescription,
      images: metaImage ? [metaImage] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Critical performance optimizations */}
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://tile.openstreetmap.org" />
        <link
          rel="preconnect"
          href="https://cdn.sanity.io"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="format-detection" content="telephone=no" />
        {/* Reduce layout shifts */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @media (max-width: 768px) {
              body { font-size: 14px; }
            }
            .service-list { min-height: 200px; }
            .leaflet-container { background: #f5f5f5; }
          `,
          }}
        />
      </head>
      <body
        className={`min-h-screen ${merriweather.variable} ${manrope.variable} font-sans antialiased bg-white text-neutral-900 selection:bg-primary-100 selection:text-primary-900`}
        suppressHydrationWarning={true}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
