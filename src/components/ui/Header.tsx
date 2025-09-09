import React from "react";
import Image from "next/image";

export function Header() {
  return (
    <header className="w-full px-4 bg-gradient-to-b from-white/80 to-white/60 backdrop-blur border-b border-neutral-200">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center">
        <Image
          src="/logo.png"
          alt="The Carenest logo"
          width={100}
          height={100}
          className="mb-2"
          priority
        />
      </div>
    </header>
  );
}
