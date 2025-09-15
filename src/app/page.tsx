import Link from "next/link";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { ContactForm } from "../components/ui/ContactForm";
import { sanityClient } from "../sanity/client";

async function getSiteSettings() {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0]{
      heroTitle,
      heroText,
      introText,
      heroVideo,
      ctaText,
      ctaUrl
    }`
  );
}

export default async function HomePage() {
  const settings = await getSiteSettings();
  return (
    <>
      <div className="relative isolate">
        {settings?.heroVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 pointer-events-none"
            src={settings.heroVideo}
            aria-hidden="true"
          />
        )}
        <div className="relative z-10">
          <Container className="py-10 md:py-16 text-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {settings?.heroTitle || "Welcome to The Carenest"}
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-neutral-700">
                {settings?.heroText ||
                  "Our mission is to make it easier to find trusted wellbeing and care support in Colchester, Tendring, and nearby. We believe in calm, accessible, and high-quality information for everyone."}
              </p>
              <p className="text-base md:text-lg max-w-xl mx-auto mb-10 text-neutral-600">
                {settings?.introText ||
                  "Browse a curated directory of services, resources, and support for you or your loved ones. No ads, no noise—just clear, helpful options."}
              </p>
              {settings?.ctaText && settings?.ctaUrl ? (
                <Link href={settings.ctaUrl}>
                  <Button type="button" variant="primary">
                    {settings.ctaText}
                  </Button>
                </Link>
              ) : (
                <Link href="/directory">
                  <Button type="button" variant="primary">
                    Browse care options
                  </Button>
                </Link>
              )}
            </div>
          </Container>
        </div>
      </div>
      <ContactForm />
    </>
  );
}
