import React from "react";
import { Merriweather, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "../components/ui/Header";
import { Footer } from "../components/ui/Footer";
import { CookieBanner } from "../components/ui/CookieBanner";
import { sanityClient } from "../sanity/client";

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export async function generateMetadata() {
  const settings = await sanityClient.fetch(
    `*[_type == "siteSettings"][0]{siteTitle, siteDescription}`
  );
  return {
    title: settings?.siteTitle,
    description: settings?.siteDescription,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen ${merriweather.variable} ${manrope.variable} font-sans antialiased bg-white text-neutral-900 selection:bg-primary-100 selection:text-primary-900`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
