import React from "react";
import Link from "next/link";
import { fetchSiteSettings } from "../../sanity/client";

export async function Footer() {
  const settings = await fetchSiteSettings();
  const { footerText, footerLinks, legalPages } = settings || {};
  return (
    <footer className="w-full py-8 px-4 md:px-8 bg-white border-t border-neutral-200">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-2 text-center text-neutral-500 text-sm">
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          {/* Custom footer links */}
          {footerLinks?.map(
            (link: { label: string; url: string }, index: number) =>
              link.url ? (
                <Link
                  key={`${link.label}-${index}`}
                  href={link.url}
                  className="hover:underline"
                  target={link.url.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.url.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              ) : null
          )}

          {/* Legal pages */}
          {legalPages?.map(
            (page: { title: string; slug: { current: string } }) => (
              <Link
                key={page.slug.current}
                href={`/${page.slug.current}`}
                className="hover:underline"
              >
                {page.title}
              </Link>
            )
          )}
        </div>
        <div className="text-neutral-700 text-xs mb-1">{footerText}</div>
      </div>
    </footer>
  );
}
