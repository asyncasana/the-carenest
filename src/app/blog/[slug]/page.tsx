import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  content?: any[];
  featuredImage?: any;
  publishedAt: string;
  author?: string;
  _createdAt: string;
};

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return sanityClient.fetch(
    `
    *[_type == "blog" && slug.current == $slug && defined(publishedAt)][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      publishedAt,
      author,
      _createdAt
    }
  `,
    { slug }
  );
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || "Blog image"}
          width={800}
          height={400}
          className="rounded-lg w-full h-auto"
        />
        {value.caption && (
          <p className="text-sm text-neutral-500 mt-2 text-center italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold text-neutral-800 mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold text-neutral-800 mt-6 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold text-neutral-800 mt-5 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-medium text-neutral-800 mt-4 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-amber-200 pl-4 my-6 italic text-neutral-700 bg-amber-50/50 py-2">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="text-neutral-700 leading-relaxed mb-4">{children}</p>
    ),
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src={urlFor(post.featuredImage).url()}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-light text-neutral-800 mb-4 leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-neutral-600 leading-relaxed mb-6">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-neutral-500 border-t border-neutral-200 pt-4">
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              )}
              {post.author && <span>By {post.author}</span>}
            </div>
          </header>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            {post.content && (
              <PortableText
                value={post.content}
                components={portableTextComponents}
              />
            )}
          </article>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-neutral-200">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium transition-colors"
              >
                ← More Articles
              </Link>

              <div className="text-sm text-neutral-500">Share this article</div>
            </div>
          </footer>
        </div>
      </Container>
    </div>
  );
}
