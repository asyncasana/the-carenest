import { defineType, defineField } from "sanity";

export default defineType({
  name: "page",
  title: "📄 Page",
  type: "document",
  icon: () => "📄",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "isPublished",
      title: "Published",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "showInFooter",
      title: "Show in Footer",
      type: "boolean",
      description: "Show this page as a legal link in the footer",
      initialValue: false,
    }),
    defineField({
      name: "footerOrder",
      title: "Footer Display Order",
      type: "number",
      description: "Order in footer (lower numbers appear first)",
      hidden: ({ document }) => !document?.showInFooter,
    }),
  ],
});
