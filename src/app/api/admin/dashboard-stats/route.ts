import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/db";

export async function GET(request: NextRequest) {
  const allArticles = db.getArticles({ status: "all" });
  const draftsCount = allArticles.filter((a) => a.status === "draft").length;
  const reviewCount = allArticles.filter((a) => a.status === "in_review").length;
  const scheduledCount = allArticles.filter((a) => a.status === "scheduled").length;
  const publishedCount = allArticles.filter((a) => a.status === "published").length;

  const aiJobs = db.getAiJobs(20);
  const failedJobs = aiJobs.filter((j) => j.status === "failed");
  const inReviewArticles = allArticles.filter((a) => a.status === "in_review" || a.status === "draft").slice(0, 5);
  const recentPublished = allArticles.filter((a) => a.status === "published").slice(0, 6);
  const currentEdition = db.getCurrentWeeklyEdition();

  return NextResponse.json({
    stats: {
      draftsCount,
      reviewCount,
      scheduledCount,
      publishedCount,
      failedJobsCount: failedJobs.length,
    },
    inReviewArticles,
    recentPublished,
    currentEdition,
    failedJobs,
  });
}
