import { db } from "@/lib/services/db";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const articles = db.getArticles({ status: "published", limit: 30 });
  const columns = db.getDexterColumns({ status: "published", limit: 10 });

  const allItems = [
    ...articles.map((a) => ({
      title: a.title,
      link: `${siteUrl}/article/${a.slug}`,
      description: a.deck || a.summary,
      pubDate: new Date(a.publishedAt || a.createdAt).toUTCString(),
      author: a.authorName,
      category: a.category?.name || "News",
    })),
    ...columns.map((c) => ({
      title: `[Dexter's Vantage] ${c.title}`,
      link: `${siteUrl}/column/${c.slug}`,
      description: c.subtitle || c.excerpt,
      pubDate: new Date(c.publishedAt).toUTCString(),
      author: "Dexter",
      category: "Philosophy",
    })),
  ].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>INK Newspaper — The Weekly Editorial</title>
    <link>${siteUrl}</link>
    <description>Molded from warm paper and refined clay surfaces. Investigative reporting, cultural essays, and philosophical dispatches.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${allItems
      .map(
        (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <description><![CDATA[${item.description}]]></description>
      <author>${item.author}</author>
      <category>${item.category}</category>
      <pubDate>${item.pubDate}</pubDate>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
