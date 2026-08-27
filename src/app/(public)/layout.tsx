import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTopWithProgress } from "@/components/ui/ScrollToTopWithProgress";
import { db } from "@/lib/services/db";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = db.getCategories().map((c) => ({
    name: c.name,
    slug: c.slug,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-paper)] text-[var(--text-ink)]">
      <Header categories={categories} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <Footer />
      <ScrollToTopWithProgress />
    </div>
  );
}
