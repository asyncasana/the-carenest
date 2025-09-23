import { defineType, defineField } from "sanity";

export default defineType({
  name: "location",
  title: "📍 Location",
  type: "object",
  fields: [
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "lat",
      title: "Latitude",
      type: "number",
    }),
    defineField({
      name: "lng",
      title: "Longitude", 
      type: "number",
    }),
  ],
});
