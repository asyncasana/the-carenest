import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/lib/sanity";

type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  featuredImage?: any;
  publishedAt: string;
  _createdAt: string;
  author?: string;
};

async function getBlogPosts(): Promise<BlogPost[]> {
  return sanityClient.fetch(`
    *[_type == "blog" && defined(publishedAt)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      publishedAt,
      _createdAt,
      author
    }
  `);
}

async function getBlogPageContent() {
  return sanityClient.fetch(`
    *[_type == "siteSettings"][0]{
      blogPageTitle,
      blogPageSubtitle
    }
  `);
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const content = await getBlogPageContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-light text-neutral-800 mb-6">
            {content?.blogPageTitle || "Blog & Resources"}
          </h1>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed">
            {content?.blogPageSubtitle ||
              "Insights, updates, and helpful resources about care and wellbeing services in our community."}
          </p>

          <div className="space-y-8">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <article
                  key={post._id}
                  className="group bg-white/90 backdrop-blur border border-neutral-200/60 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300 hover:scale-[1.02] hover:border-neutral-300/80"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  <div className="md:flex">
                    {/* Featured Image */}
                    {post.featuredImage && (
                      <div className="md:w-1/3 flex-shrink-0">
                        <Link href={`/blog/${post.slug.current}`}>
                          <div className="relative h-48 md:h-full">
                            <Image
                              src={urlFor(post.featuredImage).url()}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </Link>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-8 flex-1">
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="block"
                      >
                        <h2 className="text-2xl font-semibold text-neutral-800 mb-4 group-hover:text-amber-700 transition-colors duration-200">
                          {post.title}
                        </h2>
                      </Link>
                      {post.excerpt && (
                        <p className="text-neutral-600 mb-6 leading-relaxed text-lg">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-neutral-500">
                        {post.publishedAt && (
                          <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </time>
                        )}
                        {post.author && <span>By {post.author}</span>}
                      </div>
                      <div className="pt-4">
                        <Link
                          href={`/blog/${post.slug.current}`}
                          className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium transition-colors"
                        >
                          Read more →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-500">
                  No blog posts published yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
