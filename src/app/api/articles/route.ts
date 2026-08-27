import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/db";
import { ArticleStatus } from "@/lib/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as ArticleStatus | "all" | null;
  const categorySlug = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;
  const tag = searchParams.get("tag") || undefined;
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined;

  const articles = db.getArticles({
    status: status || undefined,
    categorySlug,
    search,
    tag,
    limit,
  });

  return NextResponse.json({ articles });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newArticle = db.createArticle(body, {
      name: "Admin User",
      email: "admin@inknewspaper.com",
    });
    return NextResponse.json({ success: true, article: newArticle }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
