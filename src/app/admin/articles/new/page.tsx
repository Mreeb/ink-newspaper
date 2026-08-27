import React from "react";
import { db } from "@/lib/services/db";
import { ArticleEditorForm } from "@/components/admin/ArticleEditorForm";

export default function NewArticlePage() {
  const categories = db.getCategories();
  const editions = db.getWeeklyEditions();

  return (
    <ArticleEditorForm
      categories={categories}
      editions={editions}
      isNew={true}
    />
  );
}
