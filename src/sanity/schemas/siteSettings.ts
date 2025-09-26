import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "⚙️ Site Settings",
  type: "document",
  icon: () => "⚙️",
  fieldsets: [
    {
      name: "seo",
      title: "🔍 SEO & Social Sharing",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "branding",
      title: "🎨 Logo & Branding",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "hero",
      title: "🦸 Hero Section",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "about",
      title: "👋 About Section",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "search",
      title: "🔍 Search Section",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "blog",
      title: "📝 Blog Settings",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "faq",
      title: "❓ FAQ Settings",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "footer",
      title: "📄 Footer Settings",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // Site Identity & SEO
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      description: "The main site title",
      fieldset: "seo",
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      description: "Meta description for the site",
      fieldset: "seo",
    }),
    defineField({
      name: "metaImage",
      title: "📸 Social Sharing Image",
      type: "image",
      description:
        "Image shown when site is shared on Facebook, Twitter, etc. (1200x630px recommended)",
      options: {
        hotspot: true,
      },
      fieldset: "seo",
    }),
    defineField({
      name: "metaImageAlt",
      title: "Social Image Alt Text",
      type: "string",
      description: "Alt text for the social sharing image",
      fieldset: "seo",
    }),
    defineField({
      name: "logo",
      title: "Site Logo",
      type: "image",
      description: "Main site logo",
      fieldset: "branding",
    }),
    defineField({
      name: "logoAlt",
      title: "Logo Alt Text",
      type: "string",
      description: "Alt text for the logo",
      fieldset: "branding",
    }),

    // Homepage Hero Section
    defineField({
      name: "heroVideo",
      title: "Hero Video URL",
      type: "url",
      description: "URL for the hero background video",
      fieldset: "hero",
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
      fieldset: "hero",
    }),
    defineField({
      name: "heroCTAText",
      title: "Hero CTA Button Text",
      type: "string",
      description: "Text for the hero call-to-action button",
      fieldset: "hero",
    }),
    defineField({
      name: "heroCTAUrl",
      title: "Hero CTA Button URL",
      type: "string",
      description: "URL for the hero call-to-action button",
      fieldset: "hero",
    }),
    defineField({
      name: "introText",
      title: "Intro Text",
      type: "text",
      description: "Main introduction text on homepage",
      fieldset: "hero",
    }),

    // About Section
    defineField({
      name: "showAboutSection",
      title: "Show About Section",
      type: "boolean",
      description: "Display About section on homepage between hero and search",
      initialValue: false,
      fieldset: "about",
    }),
    defineField({
      name: "aboutSectionTitle",
      title: "About Section Title",
      type: "string",
      description: "Main title for the About section",
      fieldset: "about",
    }),
    defineField({
      name: "aboutSectionDescription",
      title: "About Section Description",
      type: "string",
      validation: (Rule) => Rule.max(200),
      fieldset: "about",
      description: "Optional subtitle/description - max 200 characters",
    }),

    // Search Section
    defineField({
      name: "searchSectionTitle",
      title: "Search Section Title",
      type: "string",
      description: "Title for the search section",
      fieldset: "search",
    }),
    defineField({
      name: "searchSectionSubtitle",
      title: "Search Section Subtitle",
      type: "string",
      description: "Subtitle for the search section",
      fieldset: "search",
    }),
    defineField({
      name: "searchSectionBackgroundImage",
      title: "Search Section Background Image",
      type: "image",
      description: "Optional subtle background image for search section",
      fieldset: "search",
    }),

    // Search CTA Section
    defineField({
      name: "searchCTAText",
      title: "Search CTA Button Text",
      type: "string",
      description:
        "Text for search call-to-action button (e.g., 'Find Care Services')",
      fieldset: "search",
    }),
    defineField({
      name: "postcodeLabel",
      title: "Postcode Input Label",
      type: "string",
      fieldset: "search",
      description: "Label for postcode input field",
    }),
    defineField({
      name: "postcodePlaceholder",
      title: "Postcode Placeholder",
      type: "string",
      description: "Placeholder text for postcode input",
      fieldset: "search",
    }),
    defineField({
      name: "categoryLabel",
      title: "Category Select Label",
      type: "string",
      description: "Label for category dropdown",
      fieldset: "search",
    }),
    defineField({
      name: "categoryPlaceholder",
      fieldset: "search",
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
      fieldset: "footer",
    }),
    defineField({
      name: "footerText",
      title: "Footer Copyright Text",
      type: "string",
      description: "Copyright text in footer",
      fieldset: "footer",
    }),

    // Blog Page Content
    defineField({
      name: "blogPageTitle",
      title: "Blog Page Title",
      type: "string",
      description: "Main title for the blog page",
      fieldset: "blog",
    }),
    defineField({
      name: "blogPageSubtitle",
      title: "Blog Page Subtitle",
      type: "text",
      description: "Subtitle/description for the blog page",
      fieldset: "blog",
    }),

    // FAQ Page Content
    defineField({
      name: "faqPageTitle",
      title: "FAQ Page Title",
      type: "string",
      description: "Main title for the FAQ page",
      fieldset: "faq",
    }),
    defineField({
      name: "faqPageSubtitle",
      title: "FAQ Page Subtitle",
      type: "text",
      description: "Subtitle/description for the FAQ page",
      fieldset: "faq",
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
