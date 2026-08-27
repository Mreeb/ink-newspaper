"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  ImageIcon,
  Minus,
  Code,
} from "lucide-react";

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function TipTapEditor({
  content,
  onChange,
  placeholder = "Write or paste your investigative dispatch...",
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      ImageExtension.configure({
        inline: true,
        allowBase64: true,
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[var(--accent-clay)] underline underline-offset-4",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose-ink min-h-[350px] p-6 focus:outline-none bg-[var(--bg-paper)] rounded-b-2xl max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  // Sync if content changes externally (e.g. Docx import or AI generation)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="min-h-[350px] p-6 bg-[var(--bg-paper)] rounded-2xl border border-[var(--border-paper)] animate-pulse text-xs text-[var(--text-muted)]">
        Initializing editorial rich text engine...
      </div>
    );
  }

  const addImage = () => {
    const url = window.prompt("Enter image URL (Unsplash, CDN, or uploaded asset):");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="border border-[var(--border-paper)] rounded-2xl overflow-hidden bg-[var(--bg-surface)] shadow-sm">
      {/* Editor Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-[var(--bg-subtle)]/70 border-b border-[var(--border-paper)]">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg text-xs font-semibold transition-colors ${
            editor.isActive("bold")
              ? "bg-[var(--accent-clay)] text-white"
              : "text-[var(--text-muted)] hover:bg-[var(--bg-paper)] hover:text-[var(--text-ink)]"
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg text-xs font-semibold transition-colors ${
            editor.isActive("italic")
              ? "bg-[var(--accent-clay)] text-white"
              : "text-[var(--text-muted)] hover:bg-[var(--bg-paper)] hover:text-[var(--text-ink)]"
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-[var(--border-paper)] mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-serif font-bold transition-colors ${
            editor.isActive("heading", { level: 2 })
              ? "bg-[var(--accent-clay)] text-white"
              : "text-[var(--text-muted)] hover:bg-[var(--bg-paper)] hover:text-[var(--text-ink)]"
          }`}
          title="Section Heading (H2)"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-serif font-bold transition-colors ${
            editor.isActive("heading", { level: 3 })
              ? "bg-[var(--accent-clay)] text-white"
              : "text-[var(--text-muted)] hover:bg-[var(--bg-paper)] hover:text-[var(--text-ink)]"
          }`}
          title="Subheading (H3)"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-[var(--border-paper)] mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg text-xs transition-colors ${
            editor.isActive("bulletList")
              ? "bg-[var(--accent-clay)] text-white"
              : "text-[var(--text-muted)] hover:bg-[var(--bg-paper)] hover:text-[var(--text-ink)]"
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg text-xs transition-colors ${
            editor.isActive("orderedList")
              ? "bg-[var(--accent-clay)] text-white"
              : "text-[var(--text-muted)] hover:bg-[var(--bg-paper)] hover:text-[var(--text-ink)]"
          }`}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-lg text-xs transition-colors ${
            editor.isActive("blockquote")
              ? "bg-[var(--accent-clay)] text-white"
              : "text-[var(--text-muted)] hover:bg-[var(--bg-paper)] hover:text-[var(--text-ink)]"
          }`}
          title="Editorial Pull Quote"
        >
          <Quote className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-[var(--border-paper)] mx-1" />

        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded-lg text-xs transition-colors ${
            editor.isActive("link")
              ? "bg-[var(--accent-clay)] text-white"
              : "text-[var(--text-muted)] hover:bg-[var(--bg-paper)] hover:text-[var(--text-ink)]"
          }`}
          title="Insert Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded-lg text-xs text-[var(--text-muted)] hover:bg-[var(--bg-paper)] hover:text-[var(--text-ink)] transition-colors"
          title="Insert Image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded-lg text-xs text-[var(--text-muted)] hover:bg-[var(--bg-paper)] hover:text-[var(--text-ink)] transition-colors"
          title="Horizontal Rule"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-[var(--border-paper)] mx-1 ml-auto" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded-lg text-xs text-[var(--text-muted)] hover:bg-[var(--bg-paper)] disabled:opacity-30 transition-colors"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded-lg text-xs text-[var(--text-muted)] hover:bg-[var(--bg-paper)] disabled:opacity-30 transition-colors"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Body */}
      <EditorContent editor={editor} />
    </div>
  );
}
