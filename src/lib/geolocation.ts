// Utility functions for geolocation and distance calculations

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in miles
 */
export function calculateDistance(
  coord1: Coordinates,
  coord2: Coordinates
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLng = toRad(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) *
      Math.cos(toRad(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Geocode a UK postcode to get coordinates
 * Uses the free postcodes.io API for UK postcodes
 */
export async function geocodePostcode(
  postcode: string
): Promise<Coordinates | null> {
  try {
    const cleanPostcode = postcode.trim().replace(/\s+/g, "");
    const response = await fetch(
      `https://api.postcodes.io/postcodes/${cleanPostcode}`
    );

    if (!response.ok) {
      throw new Error("Postcode not found");
    }

    const data = await response.json();

    if (data.result && data.result.latitude && data.result.longitude) {
      return {
        lat: data.result.latitude,
        lng: data.result.longitude,
      };
    }

    return null;
  } catch (error) {
    console.error("Error geocoding postcode:", error);
    return null;
  }
}

/**
 * Sort directory entries by distance from given coordinates
 */
export function sortByDistance<T extends { location?: Coordinates }>(
  entries: T[],
  fromCoordinates: Coordinates
): (T & { distance?: number })[] {
  return entries
    .map((entry) => {
      if (!entry.location || !entry.location.lat || !entry.location.lng) {
        return { ...entry, distance: Infinity };
      }

      const distance = calculateDistance(fromCoordinates, entry.location);
      return { ...entry, distance };
    })
    .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
}
