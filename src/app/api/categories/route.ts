import { NextResponse } from "next/server";
import { fetchCategories } from "@/sanity/client";

export async function GET() {
  try {
    const categories = await fetchCategories();

    return NextResponse.json(categories || [], {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
