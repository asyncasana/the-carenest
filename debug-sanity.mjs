import { sanityClient } from "./src/lib/sanity.ts";

console.log("=== DEBUGGING SANITY DATA ===");

async function debugSanity() {
  try {
    console.log("Testing Sanity connection...");

    // Test basic query
    const allEntries = await sanityClient.fetch('*[_type == "directoryEntry"]');
    console.log(`Total directoryEntry documents: ${allEntries.length}`);

    // Test published entries
    const published = await sanityClient.fetch(
      '*[_type == "directoryEntry" && isPublished == true]'
    );
    console.log(`Published entries: ${published.length}`);

    // Check each published entry
    published.forEach((entry, i) => {
      console.log(`\n${i + 1}. ${entry.serviceName}`);
      console.log(`   ID: ${entry._id}`);
      console.log(`   Location field exists: ${!!entry.location}`);
      if (entry.location) {
        console.log(
          `   Coordinates: lat=${entry.location.lat}, lng=${entry.location.lng}`
        );
      }
    });

    // Test the MAP_MINIMAL_QUERY
    const mapQuery = `*[_type == "directoryEntry" && isPublished == true && defined(location)] {
      _id,
      serviceName,
      slug,
      shortDescription,
      serviceCategories[]-> { categoryName, slug },
      location
    }`;

    const mapEntries = await sanityClient.fetch(mapQuery);
    console.log(`\nEntries returned by MAP query: ${mapEntries.length}`);

    mapEntries.forEach((entry, i) => {
      console.log(`\nMap Entry ${i + 1}:`);
      console.log(`   Name: ${entry.serviceName}`);
      console.log(`   ID: ${entry._id}`);
      console.log(`   Location:`, entry.location);
    });
  } catch (error) {
    console.error("Error debugging Sanity:", error);
  }
}

debugSanity();
