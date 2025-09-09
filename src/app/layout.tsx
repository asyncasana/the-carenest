import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "../components/ui/Header";
import { Footer } from "../components/ui/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Carenest",
  description: "A calm, high-end directory for wellbeing support.",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#f7f7f9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen ${inter.variable} ${manrope.variable} font-sans antialiased bg-gradient-to-br from-[#f7f7f9] via-[#f3f4f6] to-[#e9eaf0] text-neutral-900 selection:bg-primary-100 selection:text-primary-900`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
