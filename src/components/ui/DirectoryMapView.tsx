"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
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

  return (
    <DirectoryMap
      entries={entriesWithLocation}
      selectedEntryId={selectedEntryId}
      onMarkerClick={handleMarkerClick}
    />
  );
}
