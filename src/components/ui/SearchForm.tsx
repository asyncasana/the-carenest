"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { sanityClient } from "../../sanity/client";

type Category = {
  _id: string;
  title: string;
  slug: { current: string };
};

type SearchFormProps = {
  searchCTAText?: string;
  postcodeLabel?: string;
  postcodePlaceholder?: string;
  categoryLabel?: string;
  categoryPlaceholder?: string;
};

export function SearchForm({
  searchCTAText,
  postcodeLabel,
  postcodePlaceholder,
  categoryLabel,
  categoryPlaceholder,
}: SearchFormProps) {
  const [postcode, setPostcode] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await sanityClient.fetch(
          `*[_type == "category"] | order(order asc, title asc) {
            _id,
            title,
            slug
          }`
        );
        setCategories(fetchedCategories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build search params
    const params = new URLSearchParams();
    if (postcode.trim()) {
      params.set("postcode", postcode.trim());
    }
    if (category) {
      params.set("category", category);
    }

    // Navigate to directory with filters
    const searchString = params.toString();
    router.push(`/directory${searchString ? `?${searchString}` : ""}`);
  };

  return (
    <div className="bg-white/90 backdrop-blur border border-neutral-200/60 rounded-2xl p-8 shadow-lg">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="postcode"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              {postcodeLabel || "Postcode or Area"}
            </label>
            <input
              id="postcode"
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder={postcodePlaceholder || "e.g. CO1 1AA or Colchester"}
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200 bg-white/50"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              {categoryLabel || "Service Type"}
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200 bg-white/50"
            >
              <option value="">{categoryPlaceholder || "All services"}</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.slug.current}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-6 py-3 text-lg"
        >
          {searchCTAText || "Search Services"}
        </Button>
      </form>
    </div>
  );
}
