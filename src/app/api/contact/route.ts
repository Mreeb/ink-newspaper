import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    db.addAuditLog({
      actorName: body.name,
      actorEmail: body.email,
      action: "CONTACT_TRANSMISSION",
      targetType: "settings",
      targetId: body.subject || "general",
      details: `Received dispatch: "${body.message.slice(0, 80)}..."`,
    });

    return NextResponse.json({ success: true, message: "Dispatch received by the newsroom." });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
