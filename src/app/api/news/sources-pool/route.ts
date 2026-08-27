import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("category") || undefined;
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 50;

  const sources = db.getImportedSources({
    categorySlug,
    limit,
  });

  return NextResponse.json({ sources });
}
