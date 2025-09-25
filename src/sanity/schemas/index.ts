// Content Types
import contactPage from "./contactPage";
import directoryEntry from "./directoryEntry";
import category from "./category";
import blog from "./blog";
import faq from "./faq";
import page from "./page";
import aboutCarouselItem from "./aboutCarouselItem";

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

  // About Section
  aboutCarouselItem,

  // System Settings
  siteSettings,
  location,
];
