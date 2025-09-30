import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import DirectoryClientComponent from "./DirectoryClientComponent";

interface DirectoryPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DirectoryPage({
  searchParams,
}: DirectoryPageProps) {
  const resolvedSearchParams = await searchParams;
  const postcode = resolvedSearchParams?.postcode as string | undefined;
  const category = resolvedSearchParams?.category as string | undefined;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
          <Container className="py-16">
            <div className="text-center">
              <div className="w-6 h-6 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <div className="text-neutral-500">Loading...</div>
            </div>
          </Container>
        </div>
      }
    >
      <DirectoryClientComponent postcode={postcode} category={category} />
    </Suspense>
  );
}
