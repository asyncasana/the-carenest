import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-8 px-4 md:px-8 bg-gradient-to-t from-white/80 to-white/60 border-t border-neutral-200 mt-16">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-2 text-center text-neutral-500 text-sm">
        <div className="flex gap-4 mb-2">
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          <a
            href="https://www.instagram.com/thecarenest/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Instagram
          </a>
        </div>
        <div>
          &copy; {new Date().getFullYear()} The Carenest. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
