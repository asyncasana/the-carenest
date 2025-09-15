import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "../../sanity/client";

type LogoSettings = {
  logo?: {
    asset?: { url: string };
  };
  logoAlt?: string;
};

async function getLogoSettings(): Promise<LogoSettings> {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0]{logo{asset->{url}}, logoAlt}`
  );
}

export async function Header() {
  const { logo, logoAlt } = await getLogoSettings();
  return (
    <header className="w-full px-4 bg-gradient-to-b from-white/80 to-white/60 backdrop-blur border-b border-neutral-200">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center">
        <Link href="/">
          {logo?.asset?.url ? (
            <Image
              src={logo.asset.url}
              alt={logoAlt || "The Carenest logo"}
              width={150}
              height={150}
              className=""
              priority
            />
          ) : (
            <Image
              src="/logo.svg"
              alt="The Carenest logo"
              width={150}
              height={150}
              className=""
              priority
            />
          )}
        </Link>
      </div>
    </header>
  );
}
