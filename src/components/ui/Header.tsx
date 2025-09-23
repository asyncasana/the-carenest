"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "../../sanity/client";

type HeaderSettings = {
  logo?: {
    asset?: { url: string };
  };
  logoAlt?: string;
  showBlogPage?: boolean;
  showFaqPage?: boolean;
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerSettings, setHeaderSettings] = useState<HeaderSettings>({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await sanityClient.fetch(
          `*[_type == "siteSettings"][0]{
            logo{asset->{url}}, 
            logoAlt,
            showBlogPage,
            showFaqPage
          }`
        );
        setHeaderSettings(settings || {});
      } catch (error) {
        console.error("Failed to fetch header settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const baseNavItems = [
    { href: "/", label: "Home" },
    { href: "/directory", label: "Directory" },
  ];

  const conditionalNavItems = [];
  if (headerSettings.showBlogPage !== false) {
    conditionalNavItems.push({ href: "/blog", label: "Blog" });
  }
  if (headerSettings.showFaqPage !== false) {
    conditionalNavItems.push({ href: "/faq", label: "FAQ" });
  }

  const navItems = [
    ...baseNavItems,
    ...conditionalNavItems,
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="w-full bg-gradient-to-b from-white/95 to-white/80 backdrop-blur-sm border-b border-neutral-200/50 sticky top-0 z-50 overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[120px] sm:h-[140px]">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 group transition-transform duration-200 hover:scale-105 h-full flex items-center"
          >
            <Image
              src={headerSettings.logo?.asset?.url || "/logo.svg"}
              alt={headerSettings.logoAlt || "The Carenest logo"}
              width={140}
              height={140}
              className="drop-shadow-sm group-hover:drop-shadow-md transition-all duration-200 h-full w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200 relative group text-sm font-medium"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent transition-colors duration-200"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger icon */}
            <svg
              className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            {/* Close icon */}
            <svg
              className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 z-50">
            <div className="mx-4 px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm rounded-lg mt-2 border border-neutral-200/60 shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
