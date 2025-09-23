import React from "react";
import Link from "next/link";
import { sanityClient } from "../../sanity/client";

type FooterSettings = {
  footerText?: string;
  footerLinks?: { label: string; url: string }[];
};

async function getFooterSettings(): Promise<FooterSettings> {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0]{footerText, footerLinks}`
  );
}

export async function Footer() {
  const { footerText, footerLinks } = await getFooterSettings();
  return (
    <footer className="w-full py-8 px-4 md:px-8 bg-white border-t border-neutral-200">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-2 text-center text-neutral-500 text-sm">
        <div className="flex gap-4 mb-2">
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
        </div>
        <div className="text-neutral-700 text-xs mb-1">{footerText}</div>
      </div>
    </footer>
  );
}
