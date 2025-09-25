import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SearchForm } from "@/components/ui/SearchForm";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { AboutCarousel } from "@/components/ui/AboutCarousel";
import { sanityClient } from "@/sanity/client";

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
      showAboutSection,
      aboutSectionTitle,
      aboutSectionDescription,
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

async function getAboutCarouselItems() {
  return sanityClient.fetch(
    `*[_type == "aboutCarouselItem" && isActive == true] | order(displayOrder asc) {
      _id,
      title,
      description,
      image{
        asset->{url},
        alt
      },
      ctaText,
      ctaUrl,
      displayOrder,
      isActive
    }`
  );
}

async function HomepageContent() {
  const [content, aboutItems] = await Promise.all([
    getHomepageContent(),
    getAboutCarouselItems(),
  ]);

  return (
    <>
      <div className="relative isolate">
        {/* Optimized hero video with performance enhancements */}
        {content?.heroVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 pointer-events-none"
            src={content.heroVideo}
            aria-hidden="true"
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-stone-200/30 z-0"
            aria-hidden="true"
          />
        )}
        <div className="relative z-10">
          <Container className="py-16 md:py-24 text-center">
            <div className="space-y-8">
              {content?.heroTopLine && (
                <p className="text-sm md:text-base text-neutral-600 font-medium uppercase tracking-wide">
                  {content.heroTopLine}
                </p>
              )}
              <h1 className="text-4xl md:text-6xl font-light text-neutral-800 leading-tight">
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
                  <Button type="button" variant="primary">
                    {content?.heroCTAText || "Search Directory"}
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* About Section with fade-in animations */}
      {content?.showAboutSection && (
        <div className="bg-gradient-to-br from-white to-neutral-50/50 py-16 md:py-20">
          <Container>
            <div className="text-center mb-12">
              {content?.aboutSectionTitle && (
                <h2 className="text-2xl md:text-3xl font-light text-neutral-800 mb-4">
                  {content.aboutSectionTitle}
                </h2>
              )}
              {content?.aboutSectionDescription && (
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                  {content.aboutSectionDescription}
                </p>
              )}
            </div>
            <div>
              {aboutItems && aboutItems.length > 0 && (
                <AboutCarousel items={aboutItems} />
              )}
              {(!aboutItems || aboutItems.length === 0) && (
                <div className="text-center py-8">
                  <p className="text-neutral-500 text-sm">
                    No carousel items yet. Add some &ldquo;About Carousel Items&rdquo; in
                    Sanity to see the carousel here.
                  </p>
                </div>
              )}
            </div>
          </Container>
        </div>
      )}

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
            <div>
              <SearchForm
                searchCTAText={content?.searchCTAText}
                postcodeLabel={content?.postcodeLabel}
                postcodePlaceholder={content?.postcodePlaceholder}
                categoryLabel={content?.categoryLabel}
                categoryPlaceholder={content?.categoryPlaceholder}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <HomepageContent />
    </Suspense>
  );
}
