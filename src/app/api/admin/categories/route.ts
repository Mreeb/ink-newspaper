import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/db";

export async function GET() {
  const categories = db.getCategories();
  return NextResponse.json({ categories });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newCat = db.createCategory({
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: body.description || "",
      color: body.color || "#C96846",
      orderIndex: body.orderIndex || db.getCategories().length + 1,
    });
    return NextResponse.json({ success: true, category: newCat }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
