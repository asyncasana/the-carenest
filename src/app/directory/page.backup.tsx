"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { DirectoryToolbar } from "@/components/ui/DirectoryToolbar";
import { sanityClient } from "@/sanity/client";
import { geocodePostcode, sortByDistance } from "@/lib/geolocation";
import type { DirectoryEntry } from "@/types/content";

// Fetch functions (moved from queries.ts for client-side use)
async function getDirectoryEntries(): Promise<DirectoryEntry[]> {
  return sanityClient.fetch(`
    *[_type == "directoryEntry" && isPublished == true] | order(displayPriority asc, serviceName asc) {
      _id,
      serviceName,
      slug,
      shortDescription,
      serviceArea,
      town,
      website,
      phone,
      email,
      serviceCategories[]-> { categoryName, slug },
      fundingTypes,
      isPublished,
      location
    }
  `);
}

async function getDirectoryPageContent() {
  return sanityClient.fetch(`
    *[_type == "siteSettings"][0]{
      directoryPageTitle,
      directoryPageSubtitle
    }
  `);
}

async function getMapData(): Promise<DirectoryEntry[]> {
  return sanityClient.fetch(`
    *[_type == "directoryEntry" && isPublished == true && defined(location)] {
      _id,
      serviceName,
      slug,
      shortDescription,
      serviceArea,
      town,
      serviceCategories[]-> { categoryName, slug },
      fundingTypes,
      location
    }
  `);
}

// Component for rendering the list with distance info
function DirectoryList({
  entries,
  searchPostcode,
}: {
  entries: (DirectoryEntry & { distance?: number })[];
  searchPostcode?: string;
}) {
  return (
    <div className="service-list space-y-6">
      {entries.length > 0 ? (
        entries.map((entry, index) => (
          <article
            key={entry._id}
            className="group bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-xl hover:shadow-neutral-200/25 transition-all duration-300 hover:border-amber-200 hover:-translate-y-1"
            style={{
              // Stagger animations for visual performance
              animationDelay: `${Math.min(index * 50, 1000)}ms`,
              animation: "fadeInUp 0.4s ease-out forwards",
            }}
          >
            <h2 className="text-xl font-semibold text-neutral-800 mb-3 group-hover:text-neutral-900 transition-colors">
              {entry.serviceName}
            </h2>
            <p className="text-neutral-600 mb-4 leading-relaxed">
              {entry.shortDescription}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {entry.serviceCategories?.map((category) => (
                <Tag key={category.slug.current} variant="category">
                  {category.categoryName}
                </Tag>
              ))}
              {entry.fundingTypes?.map((funding) => (
                <Tag key={funding} variant="cost">
                  {funding}
                </Tag>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-neutral-600 mb-4">
              <span className="inline-flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {entry.serviceArea}
                {entry.town ? `, ${entry.town}` : ""}
                {entry.distance &&
                  entry.distance !== Infinity &&
                  searchPostcode && (
                    <span className="text-blue-600 font-medium ml-2">
                      ({entry.distance.toFixed(1)} miles away)
                    </span>
                  )}
              </span>
              {entry.phone && (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {entry.phone}
                </span>
              )}
              {entry.email && (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {entry.email}
                </span>
              )}
            </div>

            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
              <Link
                href={`/directory/${entry.slug.current}`}
                className="inline-flex items-center gap-2 text-neutral-700 hover:text-neutral-900 font-medium transition-all duration-200 hover:gap-3 mt-3"
              >
                <span>More Details</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              {entry.website && (
                <Link
                  href={entry.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium transition-all duration-200 hover:gap-3 mt-3"
                >
                  <span>Visit Website</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    ↗
                  </span>
                </Link>
              )}
            </div>
          </article>
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-neutral-500">
            No services found. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}

function DirectoryContent() {
  const searchParams = useSearchParams();
  const [entries, setEntries] = useState<
    (DirectoryEntry & { distance?: number })[]
  >([]);
  const [pageContent, setPageContent] = useState<{
    directoryPageTitle?: string;
    directoryPageSubtitle?: string;
  } | null>(null);
  const [mapEntries, setMapEntries] = useState<DirectoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get unique categories for filtering
  const categories = Array.from(
    new Set(
      entries
        .flatMap((entry) => entry.serviceCategories || [])
        .map((cat) => cat.categoryName)
    )
  ).sort();

  useEffect(() => {
    async function loadEntries() {
      try {
        setLoading(true);
        setSearchLoading(true);

        const [data, content, mapData] = await Promise.all([
          getDirectoryEntries(),
          getDirectoryPageContent(),
          getMapData(),
        ]);

        setPageContent(content);
        setMapEntries(mapData);

        let filteredEntries = data;

        // Get search parameters safely
        const postcode = searchParams.get("postcode");
        const category = searchParams.get("category");

        // Filter by category if provided
        if (category && category !== "all") {
          filteredEntries = data.filter((entry) =>
            entry.serviceCategories?.some(
              (cat) => cat.slug.current === category
            )
          );
        }

        // Sort by distance if postcode provided
        if (postcode && filteredEntries.length > 0) {
          try {
            const postcodeCoords = await geocodePostcode(postcode);
            if (postcodeCoords) {
              filteredEntries = sortByDistance(filteredEntries, postcodeCoords);
            }
          } catch (error) {
            console.error("Failed to geocode postcode:", error);
          }
        }

        setEntries(filteredEntries);
      } catch (error) {
        console.error("Failed to load directory entries:", error);
        // Set fallback empty entries to prevent further errors
        setEntries([]);
        setMapEntries([]);
        setPageContent({
          directoryPageTitle: "Care Directory",
          directoryPageSubtitle:
            "Browse trusted wellbeing and care services in your area.",
        });
      } finally {
        setLoading(false);
        setSearchLoading(false);
      }
    }

    if (mounted) {
      loadEntries();
    }
  }, [searchParams, mounted]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
        <Container className="py-16">
          <div className="text-center">
            <div className="w-6 h-6 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-neutral-500">Loading directory...</div>
          </div>
        </Container>
      </div>
    );
  }

  const postcode = mounted ? searchParams.get("postcode") : null;
  const category = mounted ? searchParams.get("category") : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <Container className="py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-light text-neutral-800 mb-6">
            {pageContent?.directoryPageTitle || "Care Directory"}
          </h1>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
            {pageContent?.directoryPageSubtitle ||
              "Browse trusted wellbeing and care services in your area. Each service has been carefully reviewed to ensure quality and reliability."}
          </p>

          {/* Search Status */}
          {postcode || category ? (
            <div className="mb-8 p-4 bg-blue-50/80 border border-blue-200/60 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700">
                {searchLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Finding services near you...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {entries.length} service{entries.length !== 1 ? "s" : ""}{" "}
                      found
                      {postcode && ` near ${postcode.toUpperCase()}`}
                      {category &&
                        category !== "all" &&
                        ` in category: ${category}`}
                      {postcode &&
                        entries.length > 0 &&
                        entries[0].distance &&
                        entries[0].distance !== Infinity &&
                        ` (closest: ${entries[0].distance.toFixed(1)} miles)`}
                    </span>
                  </>
                )}
              </div>
            </div>
          ) : null}

          {mounted && (
            <DirectoryToolbar
              entries={entries}
              categories={categories}
              mapEntries={mapEntries}
            />
          )}

          <DirectoryList
            entries={entries}
            searchPostcode={postcode || undefined}
          />
        </div>
      </Container>
    </div>
  );
}

function DirectoryPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
          <Container className="py-16">
            <div className="text-center">
              <div className="w-6 h-6 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <div className="text-neutral-500">Loading...</div>
            </div>
          </Container>
        </div>
      }
    >
      <DirectoryContent />
    </Suspense>
  );
}

export default function DirectoryPage() {
  return <DirectoryPageWrapper />;
}
