import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const deleted = db.deleteAiJob(id);
  if (!deleted) {
    return NextResponse.json({ error: "AI Job not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, deletedId: id });
}
