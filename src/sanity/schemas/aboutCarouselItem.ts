import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutCarouselItem",
  title: "📖 About Carousel Item",
  type: "document",
  icon: () => "📖",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
      description: "Keep it concise - max 60 characters",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.max(300),
      description: "Brief description - max 300 characters",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for accessibility and SEO",
          validation: (Rule) => Rule.required(),
        },
      ],
      description: "Optional image - will be displayed in a circle on desktop",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      validation: (Rule) => Rule.max(30),
      description: "Optional - leave blank to hide button",
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA URL",
      type: "string",
      description: "Can be external (https://...) or internal (/page-name)",
      validation: (Rule) =>
        Rule.custom((url, context) => {
          const ctaText = (context.parent as any)?.ctaText;
          if (ctaText && !url) {
            return "URL is required when CTA text is provided";
          }
          return true;
        }),
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      validation: (Rule) => Rule.required().integer().positive(),
      description:
        "Order in which this item appears in the carousel (1, 2, 3, etc.)",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Uncheck to hide this item from the carousel",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "displayOrder",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "image",
      order: "displayOrder",
      active: "isActive",
    },
    prepare(selection) {
      const { title, subtitle, media, order, active } = selection;
      return {
        title: `${order}. ${title}${active ? "" : " (Hidden)"}`,
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
