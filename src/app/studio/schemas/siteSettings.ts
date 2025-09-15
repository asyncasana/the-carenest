import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title (SEO/meta only)",
      type: "string",
      description:
        "Used for the meta <title> tag and SEO. Not shown on the website UI.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description (SEO/meta only)",
      type: "text",
      description:
        "Used for the meta description tag and SEO. Not shown on the website UI.",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "logoAlt",
      title: "Logo Alt Text",
      type: "string",
      description:
        "Alternative text for the logo image (for accessibility and SEO)",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      description: "Main heading for the homepage hero section.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroText",
      title: "Hero Text",
      type: "text",
      description: "Main subheading or tagline for the homepage hero section.",
    }),
    defineField({
      name: "introText",
      title: "Intro Text",
      type: "text",
      description: "Introductory paragraph for the homepage.",
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Video",
      type: "url",
      description: "URL to the hero background video (optional)",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      description:
        "Text for the main call-to-action button on the homepage hero.",
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA Button URL",
      type: "url",
      description:
        "URL for the main call-to-action button on the homepage hero.",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "text",
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "link",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      description: "Links to show in the footer (e.g. Terms, Privacy, Social)",
    }),
  ],
});
