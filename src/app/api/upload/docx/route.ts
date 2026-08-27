import { NextRequest, NextResponse } from "next/server";
import { convertDocxToHtml } from "@/lib/services/docx-importer";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await convertDocxToHtml(buffer);

    return NextResponse.json({
      success: true,
      html: result.html,
      messages: result.messages,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
