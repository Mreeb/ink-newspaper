import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 100;
  const logs = db.getAuditLogs(limit);
  return NextResponse.json({ logs });
}
