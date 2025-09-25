import { notFound } from "next/navigation";
import { sanityClient } from "../../../sanity/client";
import { Container } from "../../../components/ui/Container";
import { urlFor } from "../../../lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import Breadcrumb from "../../../components/ui/Breadcrumb";

type DirectoryEntry = {
  serviceName: string;
  slug: { current: string };
  shortDescription: string;
  fullDescription?: PortableTextBlock[];
  galleryImages?: Array<{
    _key: string;
    asset: { url: string };
    alt?: string;
    caption?: string;
  }>;
  serviceCategories: Array<{ categoryName: string; _id: string }>;
  serviceArea: string;
  town?: string;
  website?: string;
  phone?: string;
  email?: string;
  eligibilityInfo?: string;
  fundingTypes?: string[];
  specificServices?: string[];
  openingHours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  specialties?: string[];
  qualifications?: string[];
  clientReviews?: Array<{
    reviewText: string;
    clientName?: string;
    starRating?: number;
  }>;
  location?: {
    address?: string;
    lat?: number;
    lng?: number;
  };
};

async function getEntry(slug: string): Promise<DirectoryEntry | null> {
  return sanityClient.fetch(
    `*[_type == "directoryEntry" && slug.current == $slug && isPublished == true][0]{
      serviceName,
      slug,
      shortDescription,
      fullDescription,
      galleryImages[]{
        _key,
        asset->{url},
        alt,
        caption
      },
      serviceCategories[]->{categoryName, _id},
      serviceArea,
      town,
      website,
      phone,
      email,
      eligibilityInfo,
      fundingTypes,
      specificServices,
      openingHours,
      specialties,
      qualifications,
      clientReviews,
      location
    }`,
    { slug }
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const entry = await getEntry(params.slug);
  if (!entry) return {};

  return {
    title: `${entry.serviceName} | The Carenest Directory`,
    description: entry.shortDescription,
  };
}

export default async function DirectoryEntryPage({
  params,
}: {
  params: { slug: string };
}) {
  const entry = await getEntry(params.slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <Container className="py-16">
        {/* Header */}
        <div className="mb-12">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Directory", href: "/directory" },
                { label: entry.serviceName },
              ]}
            />
          </div>

          <Link
            href="/directory"
            className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 mb-4"
          >
            ← Back to Directory
          </Link>
          <h1 className="text-4xl font-light text-neutral-800 mb-4">
            {entry.serviceName}
          </h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {entry.serviceCategories?.map((category) => (
              <span
                key={category._id}
                className="px-3 py-1 bg-accent text-text-main text-sm rounded-full"
              >
                {category.categoryName}
              </span>
            ))}
          </div>
          <p className="text-lg text-neutral-600 max-w-3xl">
            {entry.shortDescription}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Images */}
            {entry.galleryImages && entry.galleryImages.length > 0 && (
              <section>
                <div className="grid md:grid-cols-2 gap-4">
                  {entry.galleryImages.map((image) => (
                    <div key={image._key} className="relative">
                      <Image
                        src={image.asset.url}
                        alt={image.alt || entry.serviceName}
                        width={400}
                        height={300}
                        className="rounded-lg object-cover w-full h-48"
                      />
                      {image.caption && (
                        <p className="text-sm text-neutral-600 mt-2">
                          {image.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Detailed Description */}
            {entry.fullDescription && (
              <section>
                <h2 className="text-2xl font-light text-neutral-800 mb-4">
                  About This Service
                </h2>
                <div className="prose prose-neutral max-w-none">
                  <PortableText value={entry.fullDescription} />
                </div>
              </section>
            )}

            {/* Services Offered */}
            {entry.specificServices && entry.specificServices.length > 0 && (
              <section>
                <h2 className="text-2xl font-light text-neutral-800 mb-4">
                  Services Offered
                </h2>
                <ul className="grid md:grid-cols-2 gap-2">
                  {entry.specificServices.map((service, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span className="text-neutral-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Specializations */}
            {entry.specialties && entry.specialties.length > 0 && (
              <section>
                <h2 className="text-2xl font-light text-neutral-800 mb-4">
                  Specializations
                </h2>
                <div className="flex flex-wrap gap-2">
                  {entry.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Accreditations */}
            {entry.qualifications && entry.qualifications.length > 0 && (
              <section>
                <h2 className="text-2xl font-light text-neutral-800 mb-4">
                  Accreditations & Certifications
                </h2>
                <ul className="space-y-1">
                  {entry.qualifications.map((qualification, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-accent mt-1">🏆</span>
                      <span className="text-neutral-700">{qualification}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Testimonials */}
            {entry.clientReviews && entry.clientReviews.length > 0 && (
              <section>
                <h2 className="text-2xl font-light text-neutral-800 mb-4">
                  What People Say
                </h2>
                <div className="space-y-4">
                  {entry.clientReviews.map((review, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm"
                    >
                      <p className="text-neutral-700 italic mb-3">
                        &ldquo;{review.reviewText}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        {review.starRating && (
                          <div className="flex text-yellow-400">
                            {Array.from({ length: 5 }, (_, i) => (
                              <span key={i}>
                                {i < review.starRating! ? "★" : "☆"}
                              </span>
                            ))}
                          </div>
                        )}
                        {review.clientName && (
                          <span className="text-sm text-neutral-600">
                            — {review.clientName}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
              <h3 className="text-lg font-medium text-neutral-800 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                {entry.phone && (
                  <div className="flex items-start gap-3">
                    <span className="text-accent">📞</span>
                    <div>
                      <p className="text-sm font-medium text-neutral-800">
                        Phone
                      </p>
                      <p className="text-neutral-600">{entry.phone}</p>
                    </div>
                  </div>
                )}

                {entry.email && (
                  <div className="flex items-start gap-3">
                    <span className="text-accent">📧</span>
                    <div>
                      <p className="text-sm font-medium text-neutral-800">
                        Email
                      </p>
                      <p className="text-neutral-600">{entry.email}</p>
                    </div>
                  </div>
                )}

                {entry.website && (
                  <div className="flex items-start gap-3">
                    <span className="text-accent">🌐</span>
                    <div>
                      <p className="text-sm font-medium text-neutral-800">
                        Website
                      </p>
                      <a
                        href={entry.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-neutral-900 underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}

                {entry.location?.address && (
                  <div className="flex items-start gap-3">
                    <span className="text-accent">📍</span>
                    <div>
                      <p className="text-sm font-medium text-neutral-800">
                        Address
                      </p>
                      <p className="text-neutral-600">
                        {entry.location.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {entry.website && (
                <a
                  href={entry.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 bg-accent text-text-main font-medium rounded-lg hover:bg-[#e5e1d1] transition-all duration-200 text-center"
                >
                  Visit Website
                </a>
              )}
            </div>

            {/* Operating Hours */}
            {entry.openingHours && (
              <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
                <h3 className="text-lg font-medium text-neutral-800 mb-4">
                  Operating Hours
                </h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(entry.openingHours).map(
                    ([day, hours]) =>
                      hours && (
                        <div key={day} className="flex justify-between">
                          <span className="capitalize text-neutral-700">
                            {day}:
                          </span>
                          <span className="text-neutral-600">{hours}</span>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

            {/* Cost Information */}
            {entry.fundingTypes && entry.fundingTypes.length > 0 && (
              <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
                <h3 className="text-lg font-medium text-neutral-800 mb-4">
                  Funding
                </h3>
                <div className="flex flex-wrap gap-2">
                  {entry.fundingTypes.map((flag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-800 text-xs rounded border border-blue-200"
                    >
                      {flag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Eligibility */}
            {entry.eligibilityInfo && (
              <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
                <h3 className="text-lg font-medium text-neutral-800 mb-4">
                  Eligibility
                </h3>
                <p className="text-sm text-neutral-600">
                  {entry.eligibilityInfo}
                </p>
              </div>
            )}

            {/* Area Coverage */}
            <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
              <h3 className="text-lg font-medium text-neutral-800 mb-4">
                Area Coverage
              </h3>
              <p className="text-sm text-neutral-600">
                {entry.serviceArea}
                {entry.town && ` (${entry.town})`}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
