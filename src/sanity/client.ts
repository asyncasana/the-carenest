import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION || "2025-01-01";

if (!projectId || !dataset) {
  throw new Error("Missing Sanity environment variables.");
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

// Lightweight GROQ fetchers
export async function fetchEntries() {
  return sanityClient.fetch(`*[_type == "entry"] | order(_createdAt desc)`);
}

export async function fetchCategories() {
  return sanityClient.fetch(`*[_type == "category"] | order(displayOrder asc, categoryName asc) {
    _id,
    categoryName,
    slug
  }`);
}
