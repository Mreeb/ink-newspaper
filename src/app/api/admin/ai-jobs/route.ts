import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/db";

export async function GET() {
  const jobs = db.getAiJobs(100);
  return NextResponse.json({ jobs });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status");

  if (!status || status === "failed") {
    const deletedCount = db.clearFailedAiJobs();
    return NextResponse.json({ success: true, deletedCount });
  }

  return NextResponse.json({ error: "Invalid status parameter." }, { status: 400 });
}
