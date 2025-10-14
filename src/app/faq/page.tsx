import React from "react";
import { Container } from "@/components/ui/Container";
import { sanityClient } from "@/sanity/client";
import { PortableText, type PortableTextBlock } from "@portabletext/react";

type FAQ = {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
  displayOrder?: number;
  category?: string;
};

async function getFAQs(): Promise<FAQ[]> {
  return sanityClient.fetch(`
    *[_type == "faq"] | order(displayOrder asc, question asc) {
      _id,
      question,
      answer,
      displayOrder,
      category
    }
  `);
}

async function getFAQPageContent() {
  return sanityClient.fetch(`
    *[_type == "siteSettings"][0]{
      faqPageTitle,
      faqPageSubtitle
    }
  `);
}

export default async function FAQPage() {
  const faqs = await getFAQs();
  const content = await getFAQPageContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-light text-neutral-800 mb-6">
            {content?.faqPageTitle || "Frequently Asked Questions"}
          </h1>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed">
            {content?.faqPageSubtitle ||
              "Common questions about care and wellbeing services in your area."}
          </p>

          <div className="space-y-4">
            {faqs.length > 0 ? (
              faqs.map((faq) => (
                <details
                  key={faq._id}
                  className="bg-white/80 backdrop-blur border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow group"
                >
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
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-500">
                  No FAQs available yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
