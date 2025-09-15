import { defineType, defineField } from "sanity";

export default defineType({
  name: "entry",
  title: "Entry",
  type: "document",
  orderings: [
    {
      title: "Priority",
      name: "priorityAsc",
      by: [
        { field: "priority", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "problemAreas",
      title: "Problem Areas",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "area",
      title: "Area",
      type: "string",
      options: {
        list: [
          { title: "Colchester", value: "Colchester" },
          { title: "Tendring", value: "Tendring" },
          { title: "Nearby", value: "Nearby" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "town",
      title: "Town",
      type: "string",
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "eligibilityNotes",
      title: "Eligibility Notes",
      type: "text",
    }),
    defineField({
      name: "costFlags",
      title: "Cost Flags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "NHS", value: "NHS" },
          { title: "Private", value: "Private" },
          { title: "Charity", value: "Charity" },
        ],
      },
    }),
    defineField({
      name: "priority",
      title: "Priority",
      type: "number",
      initialValue: 100,
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "location",
      description: "Address and coordinates for map display.",
    }),
  ],
});
