import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const column = db.getDexterColumnById(id);
  if (!column) {
    return NextResponse.json({ error: "Column not found" }, { status: 404 });
  }
  return NextResponse.json({ column });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const body = await request.json();
    const updated = db.updateDexterColumn(id, body, {
      name: "Dexter",
      email: "dexter@inknewspaper.com",
    });
    if (!updated) {
      return NextResponse.json({ error: "Column not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, column: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const column = db.getDexterColumnById(id);
  if (!column) {
    return NextResponse.json({ error: "Column not found" }, { status: 404 });
  }
  // Soft delete / archive
  db.updateDexterColumn(id, { status: "archived" });
  return NextResponse.json({ success: true });
}
