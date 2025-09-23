import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'lawxbwsy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

const categories = [
  { title: "Elderly Care", order: 1 },
  { title: "Mental Health Support", order: 2 },
  { title: "Disability Support", order: 3 },
  { title: "Family Support", order: 4 },
  { title: "Home Care Services", order: 5 },
];

async function createCategories() {
  console.log("Creating sample categories...");
  
  for (const category of categories) {
    const slug = category.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    const doc = {
      _type: "category",
      title: category.title,
      slug: { current: slug },
      order: category.order,
      description: `Services and support for ${category.title.toLowerCase()}`,
    };
    
    try {
      const result = await client.create(doc);
      console.log(`✅ Created: ${category.title}`);
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log(`⚠️  Already exists: ${category.title}`);
      } else {
        console.error(`❌ Error creating ${category.title}:`, error.message);
      }
    }
  }
}

createCategories().catch(console.error);
