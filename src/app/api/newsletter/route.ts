import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.email || !body.email.includes("@")) {
      return NextResponse.json({ error: "Valid email address required." }, { status: 400 });
    }

    db.addAuditLog({
      actorName: "Public Reader",
      actorEmail: body.email,
      action: "NEWSLETTER_SUBSCRIBE",
      targetType: "settings",
      targetId: "newsletter",
      details: `Reader subscribed to weekly dispatch: ${body.email}`,
    });

    return NextResponse.json({ success: true, message: "Subscription confirmed." });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
