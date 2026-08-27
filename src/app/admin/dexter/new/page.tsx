import React from "react";
import { db } from "@/lib/services/db";
import { DexterColumnForm } from "@/components/admin/DexterColumnForm";

export default function NewDexterColumnPage() {
  const editions = db.getWeeklyEditions();

  return (
    <DexterColumnForm
      editions={editions}
      isNew={true}
    />
  );
}
