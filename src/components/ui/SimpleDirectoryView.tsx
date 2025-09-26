"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { DirectoryEntry } from "@/types/content";

// Lazy load the map component for better performance
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

type DirectoryToolbarProps = {
  entries: DirectoryEntry[];
  selectedEntryId?: string;
  onEntryClick: (entryId: string) => void;
  onCategoryFilter?: (category: string) => void;
  selectedCategory?: string;
};

export function SimpleDirectoryView({
  entries,
  selectedEntryId,
  onEntryClick,
  onCategoryFilter,
  selectedCategory,
}: DirectoryToolbarProps) {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [mapReady, setMapReady] = useState(false);

  // Get unique categories from entries
  const availableCategories = Array.from(
    new Set(
      entries
        .flatMap((entry) => entry.serviceCategories || [])
        .map((cat) => cat.categoryName)
    )
  ).sort();

  // Load map in background after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapReady(true);
    }, 1000); // Load map 1 second after page loads

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      {/* Directory Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-neutral-50 rounded-lg">
        {/* Left side - Count and Category Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="text-sm text-neutral-600">
            <span className="font-semibold text-neutral-800">
              {entries.length}
            </span>{" "}
            service
            {entries.length !== 1 ? "s" : ""} found
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="category-filter"
              className="text-sm text-neutral-600 font-medium"
            >
              Filter:
            </label>
            <select
              id="category-filter"
              value={selectedCategory || "all"}
              onChange={(e) => onCategoryFilter?.(e.target.value)}
              className="text-sm border border-neutral-200 rounded-md px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right side - View Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-600 font-medium">View:</span>
          <div className="inline-flex rounded-lg border border-neutral-200 overflow-hidden">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-neutral-800 text-white"
                  : "bg-white text-neutral-600 hover:text-neutral-800"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                viewMode === "map"
                  ? "bg-neutral-800 text-white"
                  : mapReady
                    ? "bg-white text-neutral-600 hover:text-neutral-800"
                    : "bg-neutral-50 text-neutral-400 cursor-not-allowed"
              }`}
              disabled={!mapReady}
            >
              Map{" "}
              {!mapReady && (
                <span className="ml-1 inline-flex items-center">
                  <div className="w-3 h-3 border border-neutral-400 border-t-transparent rounded-full animate-spin ml-1"></div>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Map View */}
      {viewMode === "map" && mapReady && (
        <div className="mb-8">
          <DirectoryMap
            entries={entries}
            selectedEntryId={selectedEntryId}
            onMarkerClick={onEntryClick}
          />
        </div>
      )}
    </div>
  );
}
