import { defineType, defineField } from "sanity";

export default defineType({
  name: "directoryEntry",
  title: "🏥 Directory Entry",
  type: "document",
  icon: () => "🏥",
  fields: [
    defineField({
      name: "serviceName",
      title: "Service/Provider Name", 
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "serviceName", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription", 
      title: "Short Description",
      type: "text",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "serviceCategories",
      title: "Service Categories", 
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "serviceArea",
      title: "Service Area",
      type: "string",
      options: {
        list: [
          { title: "Colchester", value: "Colchester" },
          { title: "Tendring", value: "Tendring" },
          { title: "Nearby Areas", value: "Nearby" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "town",
      title: "Town/City", 
      type: "string",
    }),
    defineField({
      name: "website",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "email", 
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "eligibilityInfo",
      title: "Who Can Use This Service?",
      type: "text",
    }),
    defineField({
      name: "fundingTypes",
      title: "Funding/Payment Types",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "isPublished",
      title: "Published on Website", 
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "location",
      title: "Address & Map Location",
      type: "location",
    }),
    defineField({
      name: "fullDescription",
      title: "Full Service Description",
      type: "array", 
      of: [{ type: "block" }],
    }),
    defineField({
      name: "galleryImages",
      title: "Photo Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text", 
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "specificServices",
      title: "Specific Services Offered", 
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "openingHours",
      title: "Opening Hours",
      type: "object",
      fields: [
        { name: "monday", title: "Monday", type: "string" },
        { name: "tuesday", title: "Tuesday", type: "string" },
        { name: "wednesday", title: "Wednesday", type: "string" },
        { name: "thursday", title: "Thursday", type: "string" },
        { name: "friday", title: "Friday", type: "string" },
        { name: "saturday", title: "Saturday", type: "string" },
        { name: "sunday", title: "Sunday", type: "string" },
      ],
    }),
    defineField({
      name: "specialties",
      title: "Areas of Expertise",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "qualifications", 
      title: "Qualifications & Accreditations",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "clientReviews",
      title: "Client Reviews & Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          name: "review",
          fields: [
            { name: "reviewText", title: "Review Text", type: "text", validation: (Rule) => Rule.required() },
            { name: "clientName", title: "Client Name", type: "string" },
            { name: "starRating", title: "Star Rating", type: "number", validation: (Rule) => Rule.min(1).max(5).integer() },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "serviceName",
      subtitle: "shortDescription", 
      area: "serviceArea",
    },
    prepare(selection) {
      const { title, subtitle, area } = selection;
      return {
        title: title,
        subtitle: `${area} - ${subtitle?.substring(0, 60)}...`,
      };
    },
  },
});
