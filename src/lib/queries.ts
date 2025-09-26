import { unstable_cache } from "next/cache";
import { sanityClient } from "@/sanity/client";
import type { DirectoryEntry } from "@/types/content";

// GROQ queries for Sanity
export const entriesQuery = `*[_type == "entry"] | order(_createdAt desc)`;
export const categoriesQuery = `*[_type == "category"] | order(title asc)`;

// Lean query for list view - no location/geo data to minimize payload
export const LIST_SUMMARY_QUERY = `
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
    fundingTypes
  }
`;

export const PAGE_CONTENT_QUERY = `
  *[_type == "siteSettings"][0]{
    directoryPageTitle,
    directoryPageSubtitle
  }
`;

// Cached data fetching functions with 15-minute revalidation
export const getDirectoryEntries = unstable_cache(
  async (): Promise<DirectoryEntry[]> => {
    return sanityClient.fetch(LIST_SUMMARY_QUERY);
  },
  ["directory-entries"],
  { revalidate: 900 }
);

// Simple server-side map data fetching (no caching for now)
export const getMapData = async () => {
  const query = `
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
  return sanityClient.fetch(query);
};

export const getDirectoryPageContent = unstable_cache(
  async () => {
    return sanityClient.fetch(PAGE_CONTENT_QUERY);
  },
  ["directory-page-content"],
  { revalidate: 900 }
);
