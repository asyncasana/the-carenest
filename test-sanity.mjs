import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "lawxbwsy";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2025-01-01";

console.log("🔍 Testing Sanity connection...");
console.log("Project ID:", projectId);
console.log("Dataset:", dataset);
console.log("API Version:", apiVersion);

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

async function testSanity() {
  try {
    console.log("\n📋 Testing directory entries query...");
    const entries = await sanityClient.fetch(`
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
        fundingTypes,
        isPublished,
        location
      }
    `);

    console.log("✅ Query successful!");
    console.log("📊 Total entries found:", entries?.length || 0);

    if (entries && entries.length > 0) {
      console.log("\n📝 First entry sample:");
      console.log(JSON.stringify(entries[0], null, 2));

      console.log("\n📍 Entries with location data:");
      const withLocation = entries.filter(
        (entry) => entry.location?.lat && entry.location?.lng
      );
      console.log("Entries with coordinates:", withLocation.length);
    } else {
      console.log("⚠️  No entries found - check Sanity CMS data");
    }
  } catch (error) {
    console.error("❌ Sanity query failed:", error);
  }
}

testSanity();
