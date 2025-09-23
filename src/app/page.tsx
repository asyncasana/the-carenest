import Link from "next/link";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { SearchForm } from "../components/ui/SearchForm";
import { sanityClient } from "../sanity/client";

async function getHomepageContent() {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0]{
      heroTopLine,
      heroTitle,
      heroSubtitle,
      heroVideo,
      heroCTAText,
      heroCTAUrl,
      introText,
      searchSectionTitle,
      searchSectionSubtitle,
      searchCTAText,
      postcodeLabel,
      postcodePlaceholder,
      categoryLabel,
      categoryPlaceholder
    }`
  );
}

export default async function HomePage() {
  const content = await getHomepageContent();

  return (
    <>
      <div className="relative isolate">
        {content?.heroVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 pointer-events-none"
            src={content.heroVideo}
            aria-hidden="true"
          />
        )}
        <div className="relative z-10">
          <Container className="py-16 md:py-24 text-center">
            <div className="space-y-8 animate-in fade-in duration-1000 slide-in-from-bottom-4">
              {content?.heroTopLine && (
                <p className="text-sm md:text-base text-neutral-600 font-medium uppercase tracking-wide">
                  {content.heroTopLine}
                </p>
              )}
              <h1 className="text-4xl md:text-6xl font-light bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent leading-tight">
                {content?.heroTitle ||
                  "Find trusted care and wellbeing support in your area"}
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-neutral-700 leading-relaxed">
                {content?.heroSubtitle ||
                  "A carefully curated directory of quality care services across Colchester, Tendring, and nearby areas."}
              </p>
              <p className="text-base md:text-lg max-w-xl mx-auto text-neutral-600 leading-relaxed">
                {content?.introText ||
                  "Whether you're looking for elderly care, mental health support, disability services, or family assistance, we've gathered trusted providers to help you make informed decisions about care."}
              </p>
              <div className="pt-4">
                <Link
                  href={content?.heroCTAUrl || "/directory"}
                  className="inline-block"
                >
                  <Button
                    type="button"
                    variant="primary"
                    className="transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {content?.heroCTAText || "Search Directory"}
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <div className="bg-gradient-to-br from-neutral-50 to-white py-16">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-light text-neutral-800 mb-2">
                {content?.searchSectionTitle || "Find Care Services"}
              </h2>
              {(content?.searchSectionSubtitle || content === null) && (
                <p className="text-neutral-600">
                  {content?.searchSectionSubtitle ||
                    "Search our directory of trusted care providers in your area"}
                </p>
              )}
            </div>
            <SearchForm
              searchCTAText={content?.searchCTAText}
              postcodeLabel={content?.postcodeLabel}
              postcodePlaceholder={content?.postcodePlaceholder}
              categoryLabel={content?.categoryLabel}
              categoryPlaceholder={content?.categoryPlaceholder}
            />
          </div>
        </Container>
      </div>
    </>
  );
}
