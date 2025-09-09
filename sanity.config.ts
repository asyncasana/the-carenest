import { defineConfig } from "sanity";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "The Carenest",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  schema: {
    types: schemaTypes,
  },
});
