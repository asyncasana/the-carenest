"use client";
import { useState, useMemo } from "react";
import { PortableText, type PortableTextBlock } from "@portabletext/react";

type FAQ = {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
  displayOrder?: number;
  category?: string;
};

interface FAQListProps {
  faqs: FAQ[];
}

export function FAQList({ faqs }: FAQListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(faqs.filter((faq) => faq.category).map((faq) => faq.category!))
    ).sort();
    return uniqueCategories;
  }, [faqs]);

  // Filter FAQs by selected category
  const filteredFAQs = useMemo(() => {
    if (selectedCategory === "all") return faqs;
    return faqs.filter((faq) => faq.category === selectedCategory);
  }, [faqs, selectedCategory]);

  // Group FAQs by category for display
  const groupedFAQs = useMemo(() => {
    if (selectedCategory !== "all") {
      return { [selectedCategory]: filteredFAQs };
    }

    const grouped: Record<string, FAQ[]> = {};

    // Group categorized FAQs
    categories.forEach((category) => {
      if (category) {
        grouped[category] = faqs.filter((faq) => faq.category === category);
      }
    });

    // Add uncategorized FAQs if any
    const uncategorized = faqs.filter((faq) => !faq.category);
    if (uncategorized.length > 0) {
      grouped["General"] = uncategorized;
    }

    return grouped;
  }, [faqs, filteredFAQs, selectedCategory, categories]);

  if (faqs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">
          No FAQs available yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-accent text-text-main"
                : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-accent text-text-main"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* FAQ Content */}
      {selectedCategory === "all" ? (
        // Show grouped by categories
        <div className="space-y-12">
          {Object.entries(groupedFAQs).map(([category, categoryFAQs]) => (
            <div key={category}>
              <h2 className="text-2xl font-light text-neutral-800 mb-6 pb-2 border-b border-neutral-200">
                {category}
              </h2>
              <div className="space-y-4">
                {categoryFAQs.map((faq) => (
                  <FAQItem key={faq._id} faq={faq} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Show filtered results
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <FAQItem key={faq._id} faq={faq} />
          ))}
        </div>
      )}
    </div>
  );
}

function FAQItem({ faq }: { faq: FAQ }) {
  return (
    <details className="bg-white/80 backdrop-blur border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow group">
      <summary className="cursor-pointer text-lg font-medium text-neutral-800 hover:text-amber-700 transition-colors list-none">
        <div className="flex items-center justify-between">
          <span>{faq.question}</span>
          <span className="text-2xl text-neutral-400 group-open:rotate-45 transition-transform">
            +
          </span>
        </div>
      </summary>
      <div className="mt-4 pt-4 border-t border-neutral-200 prose prose-neutral max-w-none">
        <PortableText value={faq.answer} />
      </div>
    </details>
  );
}
