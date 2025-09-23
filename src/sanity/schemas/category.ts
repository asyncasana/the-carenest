import { defineType, defineField } from "sanity";

export default defineType({
  name: "category",
  title: "📂 Service Category",
  type: "document",
  icon: () => "📂",
  fields: [
    defineField({
      name: "categoryName",
      title: "Category Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "categoryName", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Category Description",
      type: "text",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: "categoryName",
      subtitle: "description",
    },
  },
});
