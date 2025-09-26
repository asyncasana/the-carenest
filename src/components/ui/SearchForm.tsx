"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";

type Category = {
  _id: string;
  categoryName: string;
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
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [postcodeError, setPostcodeError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        console.log("🔍 SearchForm: Fetching categories...");

        const response = await fetch("/api/categories", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fetchedCategories = await response.json();
        console.log(
          "📋 SearchForm: Categories fetched:",
          fetchedCategories?.length,
          fetchedCategories
        );
        setCategories(fetchedCategories || []);
      } catch (error) {
        console.error("❌ SearchForm: Failed to fetch categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // UK postcode validation regex
  const validatePostcode = (postcode: string): boolean => {
    const postcodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]?\s?[0-9][A-Z]{2}$/i;
    return postcodeRegex.test(postcode.trim());
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    setPostcodeError("");
    setIsSearching(true);

    try {
      // Validate postcode if provided
      if (postcode.trim()) {
        if (!validatePostcode(postcode)) {
          setPostcodeError(
            "Please enter a valid UK postcode (e.g., CO1 1AA, M1 1AA, B33 8TH)"
          );
          setIsSearching(false);
          return;
        }
      }

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
    } catch (error) {
      console.error("Search failed:", error);
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur border border-neutral-200/60 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-neutral-300/60 transition-all duration-300">
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
              onChange={(e) => {
                setPostcode(e.target.value);
                if (postcodeError) setPostcodeError("");
              }}
              placeholder={postcodePlaceholder || "e.g. CO1 1AA or Colchester"}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent hover:border-accent/60 hover:shadow-md transition-all duration-200 bg-white/50 transform hover:scale-[1.02] ${
                postcodeError ? "border-red-300" : "border-neutral-200"
              }`}
            />
            {postcodeError && (
              <p className="text-red-600 text-sm mt-1 flex items-start gap-1">
                <span className="flex-shrink-0 text-red-500 mt-0.5">⚠</span>
                {postcodeError}
              </p>
            )}
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
              disabled={isLoadingCategories}
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent hover:border-accent/60 hover:shadow-md transition-all duration-200 bg-white/50 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <option value="">
                {isLoadingCategories
                  ? "Loading categories..."
                  : categories.length === 0
                    ? "No categories available"
                    : categoryPlaceholder || "All services"}
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.slug.current}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={isSearching || isLoadingCategories}
          className="w-full mt-6 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Searching...</span>
            </div>
          ) : (
            searchCTAText || "Search Services"
          )}
        </Button>
      </form>
    </div>
  );
}
