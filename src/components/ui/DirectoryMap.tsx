"use client";

import { useEffect, useState, useRef, memo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { DirectoryEntry } from "@/types/content";

// Fix for default markers in react-leaflet
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
    ._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

type DirectoryMapProps = {
  entries: DirectoryEntry[];
  selectedEntryId?: string;
  onMarkerClick: (entryId: string) => void;
};

// Clean branded marker for care services
const createCustomIcon = (isSelected: boolean) => {
  return L.divIcon({
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background: ${isSelected ? "#f59e0b" : "#d97706"};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    className: "carenest-marker",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Component to handle map centering when selection changes
function MapController({ selectedEntry }: { selectedEntry?: DirectoryEntry }) {
  const map = useMap();

  useEffect(() => {
    if (selectedEntry?.location && map) {
      const { lat, lng } = selectedEntry.location;
      // Add a small delay to ensure map is ready
      setTimeout(() => {
        try {
          map.setView([lat, lng], 14);
        } catch (error) {
          console.warn("Map not ready for setView:", error);
        }
      }, 100);
    }
  }, [selectedEntry, map]);

  return null;
}

export const DirectoryMap = memo(function DirectoryMap({
  entries,
  selectedEntryId,
  onMarkerClick,
}: DirectoryMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  // Only render map on client side to avoid SSR issues

  // Optimized client-side rendering with performance checks
  useEffect(() => {
    if (typeof window !== "undefined" && L) {
      // Use requestAnimationFrame for smoother rendering
      requestAnimationFrame(() => {
        setIsClient(true);

        // Shorter delay with requestIdleCallback for better performance
        const loadMap = () => setMapReady(true);

        if ("requestIdleCallback" in window) {
          requestIdleCallback(loadMap, { timeout: 100 });
        } else {
          setTimeout(loadMap, 100);
        }
      });
    }
  }, []);
  if (!isClient || !mapReady) {
    return (
      <div className="w-full h-96 bg-neutral-100 rounded-lg flex items-center justify-center">
        <div className="text-neutral-500 flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin"></div>
          Loading map...
        </div>
      </div>
    );
  }

  // Filter entries that have valid location data
  const entriesWithLocation = entries.filter((entry) => {
    const hasLocation =
      entry.location &&
      typeof entry.location.lat === "number" &&
      typeof entry.location.lng === "number" &&
      !isNaN(entry.location.lat) &&
      !isNaN(entry.location.lng);

    return hasLocation;
  });

  // Use entriesWithLocation for map markers

  // Default center (Colchester area)
  const defaultCenter: [number, number] = [51.8959, 0.9035];

  // Find selected entry for map centering
  const selectedEntry = entriesWithLocation.find(
    (entry) => entry._id === selectedEntryId
  );

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-neutral-200">
      <MapContainer
        center={
          selectedEntry?.location
            ? [selectedEntry.location.lat, selectedEntry.location.lng]
            : defaultCenter
        }
        zoom={selectedEntry ? 14 : 11}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
        scrollWheelZoom={false}
        doubleClickZoom={true}
        touchZoom={true}
        dragging={true}
        attributionControl={false}
        zoomControl={true}
        ref={mapRef}
        whenReady={() => {
          // Ensure map is fully initialized after a delay
          setTimeout(() => {
            if (mapRef.current) {
              try {
                mapRef.current.invalidateSize();
              } catch (error) {
                console.warn("Map invalidateSize failed:", error);
              }
            }
          }, 250);
        }}
      >
        <TileLayer
          attribution=""
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController selectedEntry={selectedEntry} />

        {entriesWithLocation.map((entry) => (
          <Marker
            key={entry._id}
            position={[entry.location!.lat, entry.location!.lng]}
            icon={createCustomIcon(entry._id === selectedEntryId)}
            eventHandlers={{
              click: () => {
                onMarkerClick(entry._id);
                // Pan to marker on mobile to center popup
                if (mapRef.current && window.innerWidth < 768) {
                  setTimeout(() => {
                    mapRef.current?.panTo([
                      entry.location!.lat,
                      entry.location!.lng,
                    ]);
                  }, 100);
                }
              },
            }}
          >
            <Popup
              closeButton={true}
              autoPan={true}
              keepInView={true}
              autoPanPadding={[20, 20]}
            >
              <div className="p-3 min-w-[240px] max-w-[280px]">
                <h3 className="font-semibold text-neutral-800 mb-2 text-sm leading-tight">
                  {entry.serviceName}
                </h3>
                <p className="text-xs text-neutral-600 mb-2 leading-relaxed">
                  {entry.shortDescription}
                </p>

                {/* Service Categories */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {entry.serviceCategories?.slice(0, 2).map((category) => (
                    <span
                      key={category.slug.current}
                      className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full"
                    >
                      {category.categoryName}
                    </span>
                  ))}
                </div>

                {/* Contact Information */}
                <div className="space-y-1 mb-3">
                  {entry.location?.address && (
                    <p className="text-xs text-neutral-500 flex items-start gap-1">
                      <span className="text-neutral-400">📍</span>
                      <span>{entry.location.address}</span>
                    </p>
                  )}
                  {entry.phone && (
                    <p className="text-xs text-neutral-500 flex items-center gap-1">
                      <span className="text-neutral-400">📞</span>
                      <a
                        href={`tel:${entry.phone}`}
                        className="hover:text-amber-600"
                      >
                        {entry.phone}
                      </a>
                    </p>
                  )}
                  {entry.website && (
                    <p className="text-xs text-neutral-500 flex items-center gap-1">
                      <span className="text-neutral-400">🌐</span>
                      <a
                        href={entry.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-amber-600"
                      >
                        Visit Website
                      </a>
                    </p>
                  )}
                </div>

                {/* More Details Button */}
                <div className="pt-2 border-t border-neutral-100">
                  <a
                    href={`/directory/${entry.slug.current}`}
                    className="inline-flex items-center justify-center w-full px-3 py-2 text-xs font-semibold text-white bg-stone-300 hover:bg-stone-400 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    View Full Details →
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
});
