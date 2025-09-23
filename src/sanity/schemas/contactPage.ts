import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactPage",
  title: "📞 Contact Page",
  type: "document",
  icon: () => "📞",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      description: "Main title for the contact page",
    }),
    defineField({
      name: "pageDescription",
      title: "Page Description",
      type: "text",
      description: "Description text for the contact page",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      description: "Primary contact email address",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
      description: "Primary contact phone number",
    }),
    defineField({
      name: "formSuccessMessage",
      title: "Form Success Message",
      type: "string",
      description: "Message shown after successful form submission",
    }),
    defineField({
      name: "howWeCanHelp",
      title: "How We Can Help",
      type: "array",
      description: "List of ways you can help visitors",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "responseTime",
      title: "Response Time",
      type: "string",
      description: "Expected response time for inquiries",
    }),
    defineField({
      name: "serviceArea",
      title: "Service Area",
      type: "string",
      description: "Geographic area served",
    }),
  ],
});
