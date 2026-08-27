import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/services/db";
import { ArticleEditorForm } from "@/components/admin/ArticleEditorForm";

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;
  const article = db.getArticleById(id);

  if (!article) {
    notFound();
  }

  const categories = db.getCategories();
  const editions = db.getWeeklyEditions();
  const revisions = db.getRevisions(article.id);

  return (
    <ArticleEditorForm
      initialArticle={article}
      categories={categories}
      editions={editions}
      revisions={revisions}
      isNew={false}
    />
  );
}
