import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("The Carenest CMS")
    .items([
      // Settings (Homepage content is here)
      S.listItem()
        .title("Site Settings & Homepage")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.listItem()
        .title("Contact Page")
        .child(
          S.document().schemaType("contactPage").documentId("contactPage")
        ),

      S.divider(),

      // Directory Content
      S.listItem()
        .title("Directory Entries")
        .child(S.documentTypeList("directoryEntry")),
      S.listItem()
        .title("Service Categories")
        .child(S.documentTypeList("category")),

      S.divider(),

      // Blog & FAQ
      S.listItem().title("Blog Posts").child(S.documentTypeList("blog")),
      S.listItem().title("FAQs").child(S.documentTypeList("faq")),

      S.divider(),

      // Other Pages
      S.listItem().title("Other Pages").child(S.documentTypeList("page")),
    ]);
