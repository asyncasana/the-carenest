// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.

// Note: defineLive has been deprecated in next-sanity v11+
// Using standard sanity client for now
import { client } from "./client";

export const sanityFetch = client.fetch.bind(client);
export const SanityLive = () => null; // Placeholder component
