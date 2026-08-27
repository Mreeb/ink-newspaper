import { NextRequest, NextResponse } from "next/server";
import { runNewsDiscoveryPipeline } from "@/lib/services/news-pipeline";

export async function POST(request: NextRequest) {
  try {
    const result = await runNewsDiscoveryPipeline();
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
