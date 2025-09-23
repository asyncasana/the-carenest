"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

import type { DirectoryEntry } from "@/types/content";

type DirectoryMapProps = {
  entries: DirectoryEntry[];
  selectedEntryId?: string;
  onMarkerClick: (entryId: string) => void;
};

// Custom icon for care services
const createCustomIcon = (isSelected: boolean) => {
  return L.divIcon({
    html: `
      <div style="
        width: 12px;
        height: 12px;
        background-color: ${isSelected ? "#ef4444" : "#6366f1"};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      "></div>
    `,
    className: "custom-marker",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

// Component to handle map centering when selection changes
function MapController({ selectedEntry }: { selectedEntry?: DirectoryEntry }) {
  const map = useMap();

  useEffect(() => {
    if (selectedEntry?.location) {
      map.setView([selectedEntry.location.lat, selectedEntry.location.lng], 14);
    }
  }, [selectedEntry, map]);

  return null;
}

export function DirectoryMap({
  entries,
  selectedEntryId,
  onMarkerClick,
}: DirectoryMapProps) {
  const [isClient, setIsClient] = useState(false);

  // Only render map on client side to avoid SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-96 bg-neutral-100 rounded-lg flex items-center justify-center">
        <div className="text-neutral-500">Loading map...</div>
      </div>
    );
  }

  // Filter entries that have location data
  const entriesWithLocation = entries.filter((entry) => entry.location);

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
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController selectedEntry={selectedEntry} />

        {entriesWithLocation.map((entry) => (
          <Marker
            key={entry._id}
            position={[entry.location!.lat, entry.location!.lng]}
            icon={createCustomIcon(entry._id === selectedEntryId)}
            eventHandlers={{
              click: () => onMarkerClick(entry._id),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-neutral-800 mb-2">
                  {entry.serviceName}
                </h3>
                <p className="text-sm text-neutral-600 mb-2">
                  {entry.shortDescription}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {entry.serviceCategories?.slice(0, 2).map((category) => (
                    <span
                      key={category.slug.current}
                      className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded"
                    >
                      {category.categoryName}
                    </span>
                  ))}
                </div>
                {entry.location?.address && (
                  <p className="text-xs text-neutral-500">
                    {entry.location.address}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
