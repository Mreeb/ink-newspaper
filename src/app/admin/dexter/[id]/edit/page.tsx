import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/services/db";
import { DexterColumnForm } from "@/components/admin/DexterColumnForm";

interface EditDexterPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditDexterPage({ params }: EditDexterPageProps) {
  const { id } = await params;
  const column = db.getDexterColumnById(id);

  if (!column) {
    notFound();
  }

  const editions = db.getWeeklyEditions();

  return (
    <DexterColumnForm
      initialColumn={column}
      editions={editions}
      isNew={false}
    />
  );
}
