export type Category = {
  _id: string;
  _type: "category";
  title: string;
  slug: { _type: "slug"; current: string };
  description?: string;
  order?: number;
};

export type Entry = {
  _id: string;
  _type: "entry";
  name: string;
  slug: { _type: "slug"; current: string };
  summary: string;
  problemAreas: Category[];
  area: "Colchester" | "Tendring" | "Nearby";
  town?: string;
  website?: string;
  phone?: string;
  email?: string;
  eligibilityNotes?: string;
  costFlags?: Array<"NHS" | "Private" | "Charity">;
  priority?: number;
  published?: boolean;
};

export type DirectoryEntry = {
  _id: string;
  serviceName: string;
  slug: { current: string };
  shortDescription: string;
  serviceArea: string;
  town?: string;
  website?: string;
  phone?: string;
  email?: string;
  serviceCategories?: Array<{
    categoryName: string;
    slug: { current: string };
  }>;
  fundingTypes?: string[];
  isPublished: boolean;
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
  distance?: number;
};
