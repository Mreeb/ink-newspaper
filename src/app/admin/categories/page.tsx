"use client";

import React, { useState, useEffect } from "react";
import { FolderTree, Plus, Edit2, Check, X } from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";
import { Category } from "@/lib/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const loadCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleStartEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditDesc(cat.description || "");
  };

  const handleSaveEdit = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, description: editDesc }),
      });
      if (res.ok) {
        setEditingId(null);
        loadCategories();
      }
    } catch (err) {
      console.error("Update category failed:", err);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-paper)]">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent-clay)] flex items-center gap-1">
            <FolderTree className="w-3.5 h-3.5" />
            <span>Taxonomy Management</span>
          </span>
          <h1 className="font-editorial text-3xl font-bold text-[var(--text-ink)]">
            Editorial Sections & Desks
          </h1>
        </div>
      </div>

      <div className="clay-card-static overflow-hidden border border-[var(--border-paper)]">
        <table className="w-full text-left text-xs">
          <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-muted)] uppercase tracking-wider font-semibold border-b border-[var(--border-paper)]">
            <tr>
              <th className="py-3.5 px-4">Section Name</th>
              <th className="py-3.5 px-4">URL Slug</th>
              <th className="py-3.5 px-4">Description</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-paper)]/60">
            {categories.map((cat) => {
              const isEditing = editingId === cat.id;
              return (
                <tr key={cat.id} className="hover:bg-[var(--bg-subtle)]/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-sm text-[var(--text-ink)]">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="px-2 py-1 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-lg text-xs"
                      />
                    ) : (
                      cat.name
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    <Link
                      href={`/category/${cat.slug}`}
                      target="_blank"
                      className="text-[var(--accent-clay)] hover:underline inline-flex items-center gap-1 font-semibold"
                      title="View public category page"
                    >
                      <span>/category/{cat.slug}</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </Link>
                  </td>

                  <td className="py-3.5 px-4 text-[var(--text-muted)] max-w-sm">
                    {isEditing ? (
                      <textarea
                        rows={2}
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="w-full px-2 py-1 bg-[var(--bg-paper)] border border-[var(--border-paper)] rounded-lg text-xs"
                      />
                    ) : (
                      cat.description
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    {isEditing ? (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleSaveEdit(cat.id)}
                          className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-[var(--text-muted)]"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleStartEdit(cat)}
                        className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent-clay)] hover:bg-[var(--bg-subtle)]"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
