import { defineType, defineField } from "sanity";

export default defineType({
  name: "location",
  title: "Location",
  type: "object",
  fields: [
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "latitude",
      title: "Latitude",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "longitude",
      title: "Longitude",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
