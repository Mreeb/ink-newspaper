import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const body = await request.json();
    const updated = db.updateWeeklyEdition(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Edition not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, edition: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
