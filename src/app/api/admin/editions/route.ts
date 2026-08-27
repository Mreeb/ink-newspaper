import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/db";

export async function GET() {
  const editions = db.getWeeklyEditions();
  return NextResponse.json({ editions });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newEdition = db.createWeeklyEdition({
      volumeNumber: body.volumeNumber || 14,
      issueNumber: body.issueNumber || 34,
      title: body.title || "Untitled Folio",
      theme: body.theme || "",
      coverImage: body.coverImage || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
      publicationDate: body.publicationDate || new Date().toISOString().split("T")[0],
      isCurrent: !!body.isCurrent,
      description: body.description || "",
      articleIds: body.articleIds || [],
    });
    return NextResponse.json({ success: true, edition: newEdition }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
