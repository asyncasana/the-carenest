import { sanityClient } from "./src/sanity/client.js";

// Site Settings Content
const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  siteTitle: "The Carenest - Care Directory for Colchester & Tendring",
  siteDescription:
    "A trusted directory of wellbeing and care services in Colchester, Tendring, and nearby areas. Find quality care support for elderly, disability, mental health, and family needs.",
  logoAlt: "The Carenest logo",
  heroTitle: "Find trusted care and wellbeing support in your area",
  heroText:
    "A carefully curated directory of quality care services across Colchester, Tendring, and nearby areas.",
  introText:
    "Whether you're looking for elderly care, mental health support, disability services, or family assistance, we've gathered trusted providers to help you make informed decisions about care.",
  ctaText: "Search Directory",
  ctaUrl: "/directory",
  contactEmail: "info@thecarenest.co.uk",
  contactPhone: "",
  address: "Colchester, Tendring, and nearby areas",
  footerText: "© 2025 The Carenest. All rights reserved.",
  footerLinks: [
    { label: "Terms", url: "/terms" },
    { label: "Privacy", url: "/privacy" },
    { label: "Instagram", url: "https://instagram.com/thecarenest" },
  ],
  showBlogPage: true,
  showFaqPage: true,
  contactPageTitle: "Contact Us",
  contactPageDescription:
    "We'd love to hear from you. Whether you have questions about our directory, want to suggest a service, or need help finding the right care support, we're here to help.",
  serviceArea: "Colchester, Tendring, and nearby areas",
  responseTime: "We aim to respond within 24 hours",
  howWeCanHelp: [
    "Finding the right care services",
    "Questions about our directory",
    "Suggesting new services to include",
    "Reporting outdated information",
    "General support and guidance",
  ],
};

// Sample Blog Posts
const blogPosts = [
  {
    _type: "blog",
    title: "Understanding Care Options in Colchester",
    slug: { current: "understanding-care-options-colchester" },
    publishedAt: new Date().toISOString(),
    excerpt:
      "A comprehensive guide to the different types of care services available in the Colchester area.",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Finding the right care can be overwhelming. This guide helps you understand the different types of care services available in the Colchester and Tendring areas.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    published: true,
  },
  {
    _type: "blog",
    title: "How to Choose Quality Care Providers",
    slug: { current: "how-to-choose-quality-care-providers" },
    publishedAt: new Date().toISOString(),
    excerpt:
      "Essential tips for evaluating and selecting the best care providers for your needs.",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Choosing the right care provider is crucial for quality of life. Here are key factors to consider when making this important decision.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    published: true,
  },
];

// Sample FAQ Content
const faqItems = [
  {
    _type: "faq",
    question: "How do I know if a care service is right for me?",
    answer:
      "Consider your specific needs, budget, location preferences, and any special requirements. Don't hesitate to ask providers about their experience with similar cases.",
    published: true,
  },
  {
    _type: "faq",
    question: "Are the services in your directory vetted?",
    answer:
      "Yes, we carefully review all providers before including them in our directory. However, we recommend doing your own research and asking for references.",
    published: true,
  },
  {
    _type: "faq",
    question: "How often is the directory updated?",
    answer:
      "We regularly update our directory and encourage users to report any outdated information. Contact us if you notice anything that needs updating.",
    published: true,
  },
  {
    _type: "faq",
    question: "Is there a cost to use this directory?",
    answer:
      "No, our directory is completely free to use. We're here to help you find the care services you need without any barriers.",
    published: true,
  },
];

// Sample Pages Content
const pages = [
  {
    _type: "page",
    title: "Terms of Service",
    slug: { current: "terms" },
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "These terms of service outline the rules and regulations for the use of The Carenest directory.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "By accessing this website, we assume you accept these terms of service. Do not continue to use The Carenest if you do not agree to take all of the terms and conditions stated on this page.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    published: true,
  },
  {
    _type: "page",
    title: "Privacy Policy",
    slug: { current: "privacy" },
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "At The Carenest, we are committed to protecting your privacy and ensuring the security of your personal information.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "This privacy policy explains how we collect, use, and protect your information when you use our care directory service.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    published: true,
  },
];

// Sample Directory Entries
const directoryEntries = [
  {
    _type: "entry",
    name: "Colchester Community Care",
    slug: { current: "colchester-community-care" },
    summary:
      "Comprehensive home care services for elderly and disabled residents in Colchester and surrounding areas.",
    area: "Colchester",
    town: "Colchester",
    website: "https://example.com",
    phone: "01206 123456",
    email: "info@colchestercare.co.uk",
    eligibilityNotes:
      "Available to all ages, specializing in elderly care and disability support.",
    costFlags: ["NHS", "Private"],
    priority: 1,
    published: true,
    detailedDescription: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Colchester Community Care has been serving the local community for over 15 years, providing compassionate and professional home care services.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    services: [
      "Personal care assistance",
      "Medication management",
      "Meal preparation",
      "Companionship",
      "Light housekeeping",
      "Transportation assistance",
    ],
    specializations: [
      "Dementia care",
      "Post-surgery recovery",
      "Chronic illness support",
    ],
    accreditations: [
      "CQC Registered",
      "Skills for Care certified",
      "First Aid trained staff",
    ],
  },
  {
    _type: "entry",
    name: "Tendring Mental Health Support",
    slug: { current: "tendring-mental-health-support" },
    summary:
      "Professional mental health counselling and support services for individuals and families in the Tendring district.",
    area: "Tendring",
    town: "Clacton-on-Sea",
    website: "https://example.com",
    phone: "01255 987654",
    email: "help@tendringmh.org.uk",
    eligibilityNotes:
      "Open to all ages, with specialized programs for different age groups.",
    costFlags: ["NHS", "Charity"],
    priority: 2,
    published: true,
    detailedDescription: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Offering a range of mental health services including counselling, therapy, and support groups in a safe and welcoming environment.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    services: [
      "Individual counselling",
      "Group therapy sessions",
      "Family therapy",
      "Crisis support",
      "Peer support groups",
      "Wellness workshops",
    ],
    specializations: [
      "Anxiety disorders",
      "Depression treatment",
      "Trauma therapy",
      "Addiction support",
    ],
    accreditations: [
      "BACP registered therapists",
      "NHS partnership",
      "Mind charity affiliation",
    ],
  },
];

async function populateSanity() {
  console.log("🚀 Starting to populate Sanity with content...\n");

  try {
    // 1. Create or update site settings
    console.log("📝 Creating site settings...");
    await sanityClient.createOrReplace(siteSettings);
    console.log("✅ Site settings created\n");

    // 2. Create blog posts
    console.log("📰 Creating blog posts...");
    for (const post of blogPosts) {
      await sanityClient.create(post);
      console.log(`✅ Created blog: ${post.title}`);
    }
    console.log("");

    // 3. Create FAQ items
    console.log("❓ Creating FAQ items...");
    for (const faq of faqItems) {
      await sanityClient.create(faq);
      console.log(`✅ Created FAQ: ${faq.question.substring(0, 50)}...`);
    }
    console.log("");

    // 4. Create pages
    console.log("📄 Creating pages...");
    for (const page of pages) {
      await sanityClient.create(page);
      console.log(`✅ Created page: ${page.title}`);
    }
    console.log("");

    // 5. Create directory entries (but only if categories exist)
    console.log("🏢 Creating directory entries...");
    const existingCategories = await sanityClient.fetch(
      '*[_type == "category"]'
    );

    if (existingCategories.length > 0) {
      // Link entries to first available category
      const firstCategory = existingCategories[0];

      for (const entry of directoryEntries) {
        entry.problemAreas = [{ _type: "reference", _ref: firstCategory._id }];
        await sanityClient.create(entry);
        console.log(`✅ Created directory entry: ${entry.name}`);
      }
    } else {
      console.log(
        "⚠️  Skipping directory entries - no categories found. Create categories first!"
      );
    }
    console.log("");

    console.log("🎉 All content has been successfully populated in Sanity!");
    console.log("📍 Check your Sanity Studio at: http://localhost:3000/studio");
  } catch (error) {
    console.error("❌ Error populating Sanity:", error);
  }
}

populateSanity();
