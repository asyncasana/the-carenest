import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sanityClient } from "./src/sanity/client";

async function getPageVisibility() {
  try {
    return await sanityClient.fetch(
      `*[_type == "siteSettings"][0]{showBlogPage, showFaqPage}`
    );
  } catch (error) {
    // Default to showing pages if Sanity is unavailable
    return { showBlogPage: true, showFaqPage: true };
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if accessing blog or FAQ pages
  if (
    pathname === "/blog" ||
    pathname.startsWith("/blog/") ||
    pathname === "/faq" ||
    pathname.startsWith("/faq/")
  ) {
    const settings = await getPageVisibility();

    // Redirect to 404 if blog page is disabled
    if (
      (pathname === "/blog" || pathname.startsWith("/blog/")) &&
      settings.showBlogPage === false
    ) {
      return new NextResponse(null, { status: 404 });
    }

    // Redirect to 404 if FAQ page is disabled
    if (
      (pathname === "/faq" || pathname.startsWith("/faq/")) &&
      settings.showFaqPage === false
    ) {
      return new NextResponse(null, { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - studio (Sanity Studio)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|studio).*)",
  ],
};
