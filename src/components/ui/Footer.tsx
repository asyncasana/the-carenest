import React from "react";
import Link from "next/link";
import { sanityClient } from "../../sanity/client";

type FooterSettings = {
  footerText?: string;
  footerLinks?: { label: string; url: string }[];
  legalPages?: { title: string; slug: { current: string } }[];
};

async function getFooterSettings(): Promise<FooterSettings> {
  return sanityClient.fetch(`
    *[_type == "siteSettings"][0]{
      footerText, 
      footerLinks,
      "legalPages": *[_type == "page" && showInFooter == true && isPublished == true] | order(footerOrder asc) {
        title,
        slug
      }
    }
  `);
}

export async function Footer() {
  const { footerText, footerLinks, legalPages } = await getFooterSettings();
  return (
    <footer className="w-full py-8 px-4 md:px-8 bg-white border-t border-neutral-200">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-2 text-center text-neutral-500 text-sm">
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          {/* Custom footer links */}
          {footerLinks?.map((link) =>
            link.url ? (
              <Link
                key={link.label}
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
          {legalPages?.map((page) => (
            <Link
              key={page.slug.current}
              href={`/${page.slug.current}`}
              className="hover:underline"
            >
              {page.title}
            </Link>
          ))}
        </div>
        <div className="text-neutral-700 text-xs mb-1">{footerText}</div>
      </div>
    </footer>
  );
}
