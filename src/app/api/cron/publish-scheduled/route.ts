import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/db";

export async function GET(request: NextRequest) {
  return handlePublishScheduled(request);
}

export async function POST(request: NextRequest) {
  return handlePublishScheduled(request);
}

async function handlePublishScheduled(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const { searchParams } = new URL(request.url);
  const querySecret = searchParams.get("secret");

  const expectedSecret = process.env.CRON_SECRET || "ink_secret_cron_key_production_2026";
  const providedSecret = authHeader ? authHeader.replace(/^Bearer\s+/i, "") : querySecret;

  if (providedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized cron access." }, { status: 401 });
  }

  const allArticles = db.getArticles({ status: "all" });
  const now = new Date().getTime();
  let publishedCount = 0;

  for (const art of allArticles) {
    if (art.status === "scheduled") {
      const scheduleTime = art.scheduledAt ? new Date(art.scheduledAt).getTime() : 0;
      if (scheduleTime <= now) {
        db.updateArticle(
          art.id,
          { status: "published", publishedAt: new Date().toISOString() },
          { name: "Cron Daemon", email: "cron@inknewspaper.com" }
        );
        publishedCount++;
      }
    }
  }

  return NextResponse.json({
    success: true,
    publishedCount,
    timestamp: new Date().toISOString(),
  });
}
