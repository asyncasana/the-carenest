import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "⚙️ Site Settings",
  type: "document",
  icon: () => "⚙️",
  fields: [
    // Site Identity
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      description: "The main site title",
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      description: "Meta description for the site",
    }),
    defineField({
      name: "logo",
      title: "Site Logo",
      type: "image",
      description: "Main site logo",
    }),
    defineField({
      name: "logoAlt",
      title: "Logo Alt Text",
      type: "string",
      description: "Alt text for the logo",
    }),

    // Homepage Hero Section
    defineField({
      name: "heroVideo",
      title: "Hero Video URL",
      type: "url",
      description: "URL for the hero background video",
    }),
    defineField({
      name: "heroTopLine",
      title: "Hero Top Line",
      type: "string",
      description: "Small text above the main hero title",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Main Title",
      type: "string",
      description: "Main hero headline",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      description: "Subtitle/description under the hero title",
    }),
    defineField({
      name: "heroCTAText",
      title: "Hero CTA Button Text",
      type: "string",
      description: "Text for the hero call-to-action button",
    }),
    defineField({
      name: "heroCTAUrl",
      title: "Hero CTA Button URL",
      type: "string",
      description: "URL for the hero call-to-action button",
    }),
    defineField({
      name: "introText",
      title: "Intro Text",
      type: "text",
      description: "Main introduction text on homepage",
    }),

    // Search Section
    defineField({
      name: "searchSectionTitle",
      title: "Search Section Title",
      type: "string",
      description: "Title for the search section",
    }),
    defineField({
      name: "searchSectionSubtitle",
      title: "Search Section Subtitle",
      type: "string",
      description: "Subtitle for the search section",
    }),

    // Search CTA Section
    defineField({
      name: "searchCTAText",
      title: "Search CTA Button Text",
      type: "string",
      description:
        "Text for search call-to-action button (e.g., 'Find Care Services')",
    }),
    defineField({
      name: "postcodeLabel",
      title: "Postcode Input Label",
      type: "string",
      description: "Label for postcode input field",
    }),
    defineField({
      name: "postcodePlaceholder",
      title: "Postcode Placeholder",
      type: "string",
      description: "Placeholder text for postcode input",
    }),
    defineField({
      name: "categoryLabel",
      title: "Category Select Label",
      type: "string",
      description: "Label for category dropdown",
    }),
    defineField({
      name: "categoryPlaceholder",
      title: "Category Placeholder",
      type: "string",
      description: "Placeholder for category dropdown (e.g., 'All Services')",
    }),

    // Footer
    defineField({
      name: "footerLinks",
      title: "Footer Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Link Label", type: "string" },
            { name: "url", title: "URL", type: "string" },
          ],
        },
      ],
      description: "Footer navigation links",
    }),
    defineField({
      name: "footerText",
      title: "Footer Copyright Text",
      type: "string",
      description: "Copyright text in footer",
    }),

    // Blog Page Content
    defineField({
      name: "blogPageTitle",
      title: "Blog Page Title",
      type: "string",
      description: "Main title for the blog page",
    }),
    defineField({
      name: "blogPageSubtitle",
      title: "Blog Page Subtitle",
      type: "text",
      description: "Subtitle/description for the blog page",
    }),

    // FAQ Page Content
    defineField({
      name: "faqPageTitle",
      title: "FAQ Page Title",
      type: "string",
      description: "Main title for the FAQ page",
    }),
    defineField({
      name: "faqPageSubtitle",
      title: "FAQ Page Subtitle",
      type: "text",
      description: "Subtitle/description for the FAQ page",
    }),

    // Directory Page Content
    defineField({
      name: "directoryPageTitle",
      title: "Directory Page Title",
      type: "string",
      description: "Main title for the directory page",
    }),
    defineField({
      name: "directoryPageSubtitle",
      title: "Directory Page Subtitle",
      type: "text",
      description: "Subtitle/description for the directory page",
    }),

    // Page Toggles
    defineField({
      name: "showBlogPage",
      title: "Show Blog Page",
      type: "boolean",
      description: "Display blog page in navigation",
      initialValue: true,
    }),
    defineField({
      name: "showFaqPage",
      title: "Show FAQ Page",
      type: "boolean",
      description: "Display FAQ page in navigation",
      initialValue: true,
    }),
  ],
});
