import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";

// Query for map markers with all popup fields
const MAP_QUERY = `
  *[_type == "directoryEntry" && isPublished == true] {
    _id,
    serviceName,
    slug,
    shortDescription,
    serviceCategories[]-> { categoryName, slug },
    location,
    phone,
    website,
    email
  }
`;

export async function GET() {
  try {
    const entries = await sanityClient.fetch(MAP_QUERY);
    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching map data:", error);
    return NextResponse.json(
      { error: "Failed to fetch map data" },
      { status: 500 }
    );
  }
}
