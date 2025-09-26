import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN, // You'll need to set this
  useCdn: false,
});

// Sample locations in Colchester/Tendring area
const sampleLocations = [
  {
    address: "Colchester, Essex, UK",
    lat: 51.8959,
    lng: 0.9034,
  },
  {
    address: "Clacton-on-Sea, Essex, UK",
    lat: 51.7909,
    lng: 1.1563,
  },
  {
    address: "Harwich, Essex, UK",
    lat: 51.9394,
    lng: 1.2881,
  },
];

async function addLocationData() {
  try {
    console.log("🔍 Checking for directory entries...");

    // Get all published directory entries
    const entries = await client.fetch(`
      *[_type == "directoryEntry" && isPublished == true] {
        _id,
        serviceName,
        location,
        serviceArea,
        town
      }
    `);

    console.log(`📍 Found ${entries.length} published directory entries`);

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      console.log(`\\n${i + 1}. ${entry.serviceName}`);
      console.log(`   Service Area: ${entry.serviceArea}`);
      console.log(`   Town: ${entry.town || "Not specified"}`);
      console.log(`   Has location: ${!!entry.location}`);

      if (!entry.location) {
        // Assign a sample location based on service area or use first one
        let sampleLocation = sampleLocations[0]; // Default to Colchester

        if (
          entry.serviceArea === "Tendring" ||
          entry.town?.toLowerCase().includes("clacton")
        ) {
          sampleLocation = sampleLocations[1]; // Clacton
        } else if (entry.town?.toLowerCase().includes("harwich")) {
          sampleLocation = sampleLocations[2]; // Harwich
        }

        // Add some random offset to avoid all markers being in same spot
        const locationWithOffset = {
          address: sampleLocation.address,
          lat: sampleLocation.lat + (Math.random() - 0.5) * 0.01,
          lng: sampleLocation.lng + (Math.random() - 0.5) * 0.01,
        };

        console.log(
          `   ➕ Adding location: ${locationWithOffset.lat.toFixed(4)}, ${locationWithOffset.lng.toFixed(4)}`
        );

        // Update the entry with location data
        await client
          .patch(entry._id)
          .set({ location: locationWithOffset })
          .commit();

        console.log(`   ✅ Location added successfully`);
      } else {
        console.log(
          `   ✅ Already has location: ${entry.location.lat}, ${entry.location.lng}`
        );
      }
    }

    console.log("\\n🎉 Done! All entries now have location data.");
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.message.includes("token")) {
      console.log(
        "\\n💡 You need to set SANITY_API_WRITE_TOKEN in your .env.local file"
      );
      console.log("   Get a token from: https://sanity.io/manage");
    }
  }
}

addLocationData();
