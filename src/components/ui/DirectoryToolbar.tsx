"use client";

import { useState, useCallback, useMemo, useRef, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import type { DirectoryEntry } from "@/types/content";

// Memoized loading component to prevent re-creation
const LoadingComponent = memo(() => (
  <div className="w-full h-96 bg-neutral-100 rounded-lg flex items-center justify-center">
    <div className="text-neutral-500 flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin"></div>
      Loading map...
    </div>
  </div>
));
LoadingComponent.displayName = "LoadingComponent";

// Lazy load map component with optimized prefetching and proper chunk naming
const DirectoryMapView = dynamic(
  () => import("@/components/ui/DirectoryMapView"),
  {
    ssr: false,
    loading: LoadingComponent,
  }
);

interface DirectoryToolbarProps {
  entries: DirectoryEntry[];
  categories: string[];
  mapEntries: DirectoryEntry[];
}

export const DirectoryToolbar = memo(function DirectoryToolbar({
  entries,
  categories,
  mapEntries,
}: DirectoryToolbarProps) {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const prefetchedRef = useRef(false);

  // Optimized prefetch - only when user shows intent to use map
  useEffect(() => {
    if (!prefetchedRef.current && "requestIdleCallback" in window) {
      const prefetchMap = () => {
        // Prefetch both map components together
        Promise.all([
          import("@/components/ui/DirectoryMapView"),
          import("@/components/ui/DirectoryMap"),
        ]);
        prefetchedRef.current = true;
      };

      // Conservative prefetch - only on user interaction intent
      const timeoutId = setTimeout(() => {
        requestIdleCallback(prefetchMap, { timeout: 5000 });
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  // Filter entries based on selected category
  const filteredEntries = useMemo(() => {
    if (selectedCategory === "all") return entries;

    return entries.filter((entry) =>
      entry.serviceCategories?.some(
        (cat) => cat.categoryName === selectedCategory
      )
    );
  }, [entries, selectedCategory]);

  // Debounced category filter handler (300ms)
  const handleCategoryFilter = useCallback((category: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setSelectedCategory(category);
    }, 300);
  }, []);

  // Handle view mode change with passive event handling
  const handleViewChange = useCallback((mode: "list" | "map") => {
    // Use requestIdleCallback for non-critical state updates
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        setViewMode(mode);
      });
    } else {
      setViewMode(mode);
    }
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Toolbar - Minimized for performance */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-neutral-50 rounded-lg">
        {/* Left side - Count and Category Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="text-sm text-neutral-600">
            <span className="font-semibold text-neutral-800">
              {filteredEntries.length}
            </span>{" "}
            service
            {filteredEntries.length !== 1 ? "s" : ""} found
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
              value={selectedCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="text-sm border border-neutral-200 rounded-md px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right side - View Toggle (No emojis) */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-600 font-medium">View:</span>
          <div className="inline-flex rounded-lg border border-neutral-200 overflow-hidden">
            <button
              type="button"
              onClick={() => handleViewChange("list")}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-neutral-800 text-white"
                  : "bg-white text-neutral-600 hover:text-neutral-800"
              }`}
              aria-pressed={viewMode === "list"}
            >
              List
            </button>
            <button
              type="button"
              onClick={() => handleViewChange("map")}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                viewMode === "map"
                  ? "bg-neutral-800 text-white"
                  : "bg-white text-neutral-600 hover:text-neutral-800"
              }`}
              aria-pressed={viewMode === "map"}
            >
              Map
            </button>
          </div>
        </div>
      </div>

      {/* Map View - Only render when selected */}
      {viewMode === "map" && (
        <div className="mb-8">
          <DirectoryMapView entries={filteredEntries} mapEntries={mapEntries} />
        </div>
      )}
    </>
  );
});
