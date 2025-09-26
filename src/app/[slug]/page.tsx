import { notFound } from "next/navigation";
import { sanityClient } from "@/sanity/client";
import { Container } from "@/components/ui/Container";
import { PortableText } from "@portabletext/react";

interface PageData {
  title: string;
  content?: any[];
  isPublished: boolean;
}

async function getPage(slug: string): Promise<PageData | null> {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      title,
      content,
      isPublished
    }`,
    { slug }
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page || !page.isPublished) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-light text-neutral-800 mb-8">
            {page.title}
          </h1>

          {page.content && (
            <div className="prose prose-lg prose-neutral max-w-none">
              <PortableText
                value={page.content}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="mb-4 leading-relaxed text-neutral-700">
                        {children}
                      </p>
                    ),
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-semibold text-neutral-800 mb-6 mt-8">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-semibold text-neutral-800 mb-4 mt-6">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold text-neutral-800 mb-3 mt-5">
                        {children}
                      </h3>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="list-disc ml-6 mb-4 space-y-1">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="list-decimal ml-6 mb-4 space-y-1">
                        {children}
                      </ol>
                    ),
                  },
                  listItem: {
                    bullet: ({ children }) => (
                      <li className="text-neutral-700">{children}</li>
                    ),
                    number: ({ children }) => (
                      <li className="text-neutral-700">{children}</li>
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="font-semibold text-neutral-800">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                    link: ({ children, value }) => (
                      <a
                        href={value.href}
                        className="text-amber-600 hover:text-amber-700 underline"
                        target={value.blank ? "_blank" : undefined}
                        rel={value.blank ? "noopener noreferrer" : undefined}
                      >
                        {children}
                      </a>
                    ),
                  },
                }}
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
