// Content Types
import contactPage from "./contactPage";
import directoryEntry from "./directoryEntry";
import category from "./category";
import blog from "./blog";
import faq from "./faq";
import page from "./page";

// System Types
import siteSettings from "./siteSettings";
import location from "./location";

export const schemaTypes = [
  // Main Content
  contactPage,
  directoryEntry,
  category,

  // Blog & FAQ
  blog,
  faq,

  // Other Pages
  page,

  // System Settings
  siteSettings,
  location,
];
