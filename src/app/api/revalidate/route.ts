import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Verify the secret token to prevent unauthorized revalidations
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (token !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type } = body;

    // Revalidate specific paths based on content type
    switch (type) {
      case "aboutCarouselItem":
      case "siteSettings":
        revalidatePath("/");
        break;
      case "directoryEntry":
        revalidatePath("/directory");
        revalidatePath("/directory/[slug]");
        break;
      case "blog":
        revalidatePath("/blog");
        revalidatePath("/blog/[slug]");
        break;
      case "faq":
        revalidatePath("/faq");
        break;
      case "page":
        revalidatePath("/[slug]");
        break;
      case "category":
        revalidatePath("/directory");
        break;
      default:
        // Revalidate all paths if type is unknown
        revalidatePath("/", "layout");
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type,
    });
  } catch (err) {
    console.error("Error revalidating:", err);
    return NextResponse.json(
      { message: "Error revalidating", error: String(err) },
      { status: 500 }
    );
  }
}
