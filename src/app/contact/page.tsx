import React from "react";
import { Container } from "@/components/ui/Container";
import { ContactPageForm } from "@/components/ui/ContactPageForm";
import { sanityClient } from "@/sanity/client";

type ContactPageContent = {
  pageTitle?: string;
  pageDescription?: string;
  contactEmail?: string;
  contactPhone?: string;
  serviceArea?: string;
  responseTime?: string;
  howWeCanHelp?: string[];
  formSuccessMessage?: string;
};

async function getContactPageContent(): Promise<ContactPageContent> {
  return sanityClient.fetch(
    `*[_type == "contactPage"][0]{
      pageTitle,
      pageDescription,
      contactEmail,
      contactPhone,
      serviceArea,
      responseTime,
      howWeCanHelp,
      formSuccessMessage
    }`
  );
}

export default async function ContactPage() {
  const content = await getContactPageContent();

  // If no content exists in Sanity, show a setup message
  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
        <Container className="py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-light text-neutral-800 mb-6">
              Contact Page Setup Required
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              Please add contact page content in Sanity Studio to display this
              page.
            </p>
            <p className="text-neutral-500">
              Go to <strong>Sanity Studio</strong> →{" "}
              <strong>Contact Page</strong> to add your contact information.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <Container className="py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-light text-neutral-800 mb-6">
            {content.pageTitle || "Contact Us"}
          </h1>
          {content.pageDescription && (
            <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              {content.pageDescription}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-light text-neutral-800 mb-4">
                Get in Touch
              </h2>
              <div className="space-y-4">
                {content.contactEmail && (
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                      <svg
                        className="w-5 h-5 text-neutral-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-800">Email</p>
                      <p className="text-neutral-600">{content.contactEmail}</p>
                    </div>
                  </div>
                )}

                {content.contactPhone && (
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                      <svg
                        className="w-5 h-5 text-neutral-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-800">Phone</p>
                      <p className="text-neutral-600">{content.contactPhone}</p>
                    </div>
                  </div>
                )}

                {content.serviceArea && (
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                      <svg
                        className="w-5 h-5 text-neutral-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-800">
                        Service Area
                      </p>
                      <p className="text-neutral-600">{content.serviceArea}</p>
                    </div>
                  </div>
                )}

                {content.responseTime && (
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                      <svg
                        className="w-5 h-5 text-neutral-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-800">
                        Response Time
                      </p>
                      <p className="text-neutral-600">{content.responseTime}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {content.howWeCanHelp && content.howWeCanHelp.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-neutral-800 mb-3">
                  How we can help
                </h3>
                <ul className="space-y-2 text-neutral-600">
                  {content.howWeCanHelp.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-1.5 h-1.5 bg-neutral-400 rounded-full mt-2"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <ContactPageForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
