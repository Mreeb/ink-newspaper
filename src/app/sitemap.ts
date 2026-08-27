import { MetadataRoute } from "next";
import { db } from "@/lib/services/db";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const articles = db.getArticles({ status: "published" });
  const categories = db.getCategories();
  const editions = db.getWeeklyEditions();
  const columns = db.getDexterColumns({ status: "published" });

  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/column`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/editions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/editorial-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/ai-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  categories.forEach((cat) => {
    routes.push({
      url: `${siteUrl}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    });
  });

  articles.forEach((art) => {
    routes.push({
      url: `${siteUrl}/article/${art.slug}`,
      lastModified: new Date(art.updatedAt || art.createdAt),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  });

  columns.forEach((col) => {
    routes.push({
      url: `${siteUrl}/column/${col.slug}`,
      lastModified: new Date(col.publishedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  editions.forEach((ed) => {
    routes.push({
      url: `${siteUrl}/editions/${ed.id}`,
      lastModified: new Date(ed.publicationDate),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  return routes;
}
