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

export default async function TermsPage() {
  const page = await getPageContent("terms-and-conditions");

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <Container className="py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-light text-neutral-800 mb-8">
            {page?.title || "Terms and Conditions"}
          </h1>
          <div className="prose prose-neutral max-w-none">
            {page?.content ? (
              <div className="whitespace-pre-wrap text-neutral-700 leading-relaxed">
                {page.content}
              </div>
            ) : (
              <div className="space-y-6 text-neutral-700">
                <p>
                  Welcome to The Carenest. These terms and conditions outline
                  the rules and regulations for the use of our website.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">
                  Use of Information
                </h2>
                <p>
                  The information provided on this website is for general
                  information purposes only. While we strive to keep the
                  information up to date and correct, we make no representations
                  or warranties of any kind about the completeness, accuracy,
                  reliability, suitability, or availability of the information,
                  products, services, or related graphics contained on the
                  website.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">Disclaimer</h2>
                <p>
                  In no event will we be liable for any loss or damage including
                  without limitation, indirect or consequential loss or damage,
                  or any loss or damage whatsoever arising from loss of data or
                  profits arising out of, or in connection with, the use of this
                  website.
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
