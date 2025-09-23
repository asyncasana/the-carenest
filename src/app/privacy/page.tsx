import React from "react";
import { Container } from "@/components/ui/Container";
import { sanityClient } from "@/sanity/client";

type PageContent = {
  title: string;
  content: string;
  updatedAt: string;
};

async function getPageContent(slug: string): Promise<PageContent | null> {
  return sanityClient.fetch(
    `
    *[_type == "page" && slug.current == $slug][0] {
      title,
      content,
      "updatedAt": _updatedAt
    }
  `,
    { slug }
  );
}

export default async function PrivacyPage() {
  const page = await getPageContent("privacy-policy");

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <Container className="py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-light text-neutral-800 mb-8">
            {page?.title || "Privacy Policy"}
          </h1>
          <div className="prose prose-neutral max-w-none">
            {page?.content ? (
              <div className="whitespace-pre-wrap text-neutral-700 leading-relaxed">
                {page.content}
              </div>
            ) : (
              <div className="space-y-6 text-neutral-700">
                <p>
                  The Carenest respects your privacy and is committed to
                  protecting your personal data.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">
                  Information We Collect
                </h2>
                <p>
                  We may collect information you provide directly to us, such as
                  when you contact us through our contact form or subscribe to
                  updates.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">
                  How We Use Information
                </h2>
                <p>
                  We use the information we collect to respond to your
                  inquiries, provide services, and improve our website and
                  services.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">Contact</h2>
                <p>
                  If you have questions about this Privacy Policy, please
                  contact us at info@thecarenest.co.uk
                </p>
              </div>
            )}
            <p className="text-sm text-neutral-500 mt-12 pt-8 border-t border-neutral-200">
              Last updated:{" "}
              {page?.updatedAt
                ? new Date(page.updatedAt).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
