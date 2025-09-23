// Simple script to create a test blog post
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "lawxbwsy",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You'll need to set this or use studio
});

async function createTestBlogPost() {
  try {
    const result = await sanityClient.create({
      _type: "blog",
      title: "How to Choose the Right Care Service",
      slug: {
        _type: "slug",
        current: "how-to-choose-care-service",
      },
      excerpt:
        "A comprehensive guide to selecting the best care services for your loved ones in the Colchester and Tendring areas.",
      author: "The Carenest Team",
      publishedAt: new Date().toISOString(),
      isPublished: true,
      content: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Choosing the right care service for yourself or a loved one can feel overwhelming. With so many options available in the Colchester and Tendring areas, it's important to know what to look for.",
            },
          ],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Key Factors to Consider",
            },
          ],
          style: "h2",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "When evaluating care services, consider these important factors:",
            },
          ],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "1. Qualifications and training of staff",
            },
          ],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "2. Reviews and recommendations from other families",
            },
          ],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "3. Range of services offered",
            },
          ],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "4. Location and accessibility",
            },
          ],
          style: "normal",
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "5. Cost and funding options",
            },
          ],
          style: "normal",
        },
      ],
    });

    console.log("✅ Created test blog post:", result._id);
  } catch (error) {
    console.error("❌ Error creating blog post:", error);
  }
}

createTestBlogPost();
