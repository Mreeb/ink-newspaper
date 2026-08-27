import { NextRequest, NextResponse } from "next/server";
import { generateAiArticleDraft } from "@/lib/services/openai-drafting";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.storyTitle || !body.sourceSummaries || body.sourceSummaries.length === 0) {
      return NextResponse.json(
        { error: "storyTitle and at least one sourceSummary are required." },
        { status: 400 }
      );
    }

    const result = await generateAiArticleDraft({
      storyTitle: body.storyTitle,
      sourceSummaries: body.sourceSummaries,
      editorialAngle: body.editorialAngle,
      targetCategorySlug: body.targetCategorySlug,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error, jobId: result.jobId }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
