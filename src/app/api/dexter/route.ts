import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined;
  const columns = db.getDexterColumns({ status: "all", limit });
  return NextResponse.json({ columns });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newColumn = db.createDexterColumn(body, {
      name: "Dexter",
      email: "dexter@inknewspaper.com",
    });
    return NextResponse.json({ success: true, column: newColumn }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
