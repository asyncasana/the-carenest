import React from "react";
import { Container } from "@/components/ui/Container";
import { sanityClient } from "@/sanity/client";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { FAQList } from "@/components/ui/FAQList";

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

          <FAQList faqs={faqs} />
        </div>
      </Container>
    </div>
  );
}
