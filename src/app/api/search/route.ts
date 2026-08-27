import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || undefined;
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 10;

  const articles = db.getArticles({
    status: "published",
    search: q,
    categorySlug: category,
    limit,
  });

  return NextResponse.json({ articles });
}
