import { NextRequest, NextResponse } from "next/server";
import { fetchCategories } from "@/sanity/client";

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 API: Fetching categories for client...");

    const categories = await fetchCategories();

    console.log("📋 API: Categories fetched:", categories?.length, categories);

    return NextResponse.json(categories || [], {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("❌ API: Failed to fetch categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
