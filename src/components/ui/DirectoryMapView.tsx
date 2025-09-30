"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Tag } from "./Tag";
import type { DirectoryEntry } from "@/types/content";

// Lazy load the actual map component
const DirectoryMap = dynamic(
  () => import("./DirectoryMap").then((mod) => ({ default: mod.DirectoryMap })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 bg-neutral-100 rounded-lg flex items-center justify-center">
        <div className="text-neutral-500 flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin"></div>
          Loading map...
        </div>
      </div>
    ),
  }
);

interface DirectoryMapViewProps {
  entries: DirectoryEntry[];
  mapEntries: DirectoryEntry[];
}

export default function DirectoryMapView({
  entries,
  mapEntries,
}: DirectoryMapViewProps) {
  const [selectedEntryId, setSelectedEntryId] = useState<string>();

  const handleMarkerClick = useCallback((entryId: string) => {
    setSelectedEntryId(entryId);
  }, []);

  // Filter map entries based on filtered entries (for category filtering)
  const filteredMapEntries =
    entries.length > 0
      ? mapEntries.filter((mapEntry) =>
          entries.some((entry) => entry._id === mapEntry._id)
        )
      : mapEntries;

  // Filter entries that actually have location data
  const entriesWithLocation = filteredMapEntries.filter(
    (entry) =>
      entry.location &&
      typeof entry.location.lat === "number" &&
      typeof entry.location.lng === "number"
  );

  // If no entries with location data, show a helpful message
  if (entriesWithLocation.length === 0) {
    return (
      <div className="w-full h-96 bg-neutral-100 rounded-lg flex items-center justify-center">
        <div className="text-center text-neutral-500">
          <div className="mb-2">📍</div>
          <p>No services with location data found.</p>
          <p className="text-sm mt-2">
            Location information may need to be added in the CMS.
          </p>
        </div>
      </div>
    );
  }

  const handleListingClick = useCallback((entryId: string) => {
    setSelectedEntryId(entryId);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Listings - Left side on desktop */}
      <div className="lg:w-1/2 max-h-96 overflow-y-auto lg:order-1 order-2">
        <div className="space-y-4">
          {entries.length > 0 ? (
            entries.map((entry) => (
              <article
                key={entry._id}
                className={`group cursor-pointer bg-white border rounded-lg p-4 transition-all duration-300 hover:shadow-lg ${
                  entry._id === selectedEntryId
                    ? "border-amber-300 bg-amber-50 shadow-md"
                    : "border-neutral-200 hover:border-amber-200"
                }`}
                onClick={() => handleListingClick(entry._id)}
              >
                <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-neutral-900 transition-colors">
                  {entry.serviceName}
                </h3>
                <p
                  className="text-neutral-600 mb-3 text-sm leading-relaxed overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {entry.shortDescription}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {entry.serviceCategories?.slice(0, 2).map((category) => (
                    <Tag key={category.slug.current} variant="category">
                      {category.categoryName}
                    </Tag>
                  ))}
                  {entry.fundingTypes?.slice(0, 1).map((funding) => (
                    <Tag key={funding} variant="cost">
                      {funding}
                    </Tag>
                  ))}
                </div>

                <div className="text-sm text-neutral-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-3 h-3 text-neutral-400"
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
                  </div>
                  {entry.phone && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-3 h-3 text-neutral-400"
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
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-neutral-100 mt-3 flex items-center justify-between">
                  <Link
                    href={`/directory/${entry.slug.current}`}
                    className="inline-flex items-center gap-1 text-neutral-700 hover:text-neutral-900 font-medium text-sm transition-all duration-200 hover:gap-2"
                    onClick={(e) => e.stopPropagation()}
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
                      className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-800 font-medium text-sm transition-all duration-200 hover:gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Website</span>
                      <span className="transition-transform group-hover:translate-x-1">
                        ↗
                      </span>
                    </Link>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-neutral-500">No services found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Map - Right side on desktop */}
      <div className="lg:w-1/2 lg:order-2 order-1">
        <DirectoryMap
          entries={entriesWithLocation}
          selectedEntryId={selectedEntryId}
          onMarkerClick={handleMarkerClick}
        />
      </div>
    </div>
  );
}
