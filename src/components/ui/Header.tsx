import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="w-full px-4 bg-gradient-to-b from-white/80 to-white/60 backdrop-blur border-b border-neutral-200">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center">
        <Link href="/">
        <Image
          src="/logo.svg"
          alt="The Carenest logo"
          width={150}
          height={150}
          className=""
          priority
        />
        </Link>
      </div>
    </header>
  );
}
