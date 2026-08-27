import {
  Article,
  ArticleRevision,
  ArticleStatus,
  Category,
  DexterColumn,
  ImportedSourceItem,
  WeeklyEdition,
  SiteSettings,
  AiJob,
  AuditLog,
  User,
} from "@/lib/types";
import {
  initialArticles,
  initialCategories,
  initialDexterColumns,
  initialImportedSources,
  initialWeeklyEditions,
  initialSiteSettings,
  initialAiJobs,
  initialAuditLogs,
  initialUsers,
} from "@/lib/data/initial-data";

// Global singleton for server-side persistence in development
class DatabaseStore {
  private categories: Category[] = [...initialCategories];
  private articles: Article[] = [...initialArticles];
  private revisions: ArticleRevision[] = [];
  private editions: WeeklyEdition[] = [...initialWeeklyEditions];
  private columns: DexterColumn[] = [...initialDexterColumns];
  private importedSources: ImportedSourceItem[] = [...initialImportedSources];
  private aiJobs: AiJob[] = [...initialAiJobs];
  private auditLogs: AuditLog[] = [...initialAuditLogs];
  private siteSettings: SiteSettings = { ...initialSiteSettings };
  private users: User[] = [...initialUsers];

  // --- Users & Auth ---
  public getUsers(): User[] {
    return this.users;
  }

  public getUserByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  // --- Categories ---
  public getCategories(): Category[] {
    return [...this.categories].sort((a, b) => a.orderIndex - b.orderIndex);
  }

  public getCategoryBySlug(slug: string): Category | undefined {
    return this.categories.find((c) => c.slug === slug);
  }

  public getCategoryById(id: string): Category | undefined {
    return this.categories.find((c) => c.id === id);
  }

  public createCategory(category: Omit<Category, "id">): Category {
    const newCat: Category = {
      ...category,
      id: `cat-${Date.now()}`,
    };
    this.categories.push(newCat);
    return newCat;
  }

  public updateCategory(id: string, updates: Partial<Category>): Category | null {
    const index = this.categories.findIndex((c) => c.id === id);
    if (index === -1) return null;
    this.categories[index] = { ...this.categories[index], ...updates };
    return this.categories[index];
  }

  // --- Articles ---
  public getArticles(filter?: {
    status?: ArticleStatus | "all";
    categorySlug?: string;
    categoryId?: string;
    featured?: boolean;
    lead?: boolean;
    limit?: number;
    editionId?: string;
    search?: string;
    tag?: string;
  }): Article[] {
    let result = [...this.articles];

    if (filter?.status && filter.status !== "all") {
      result = result.filter((a) => a.status === filter.status);
    } else if (!filter?.status) {
      // Default to published for public queries
      result = result.filter((a) => a.status === "published");
    }

    if (filter?.categoryId) {
      result = result.filter((a) => a.categoryId === filter.categoryId);
    }

    if (filter?.categorySlug) {
      const cat = this.getCategoryBySlug(filter.categorySlug);
      if (cat) {
        result = result.filter((a) => a.categoryId === cat.id);
      } else {
        return [];
      }
    }

    if (filter?.featured !== undefined) {
      result = result.filter((a) => a.isFeatured === filter.featured);
    }

    if (filter?.lead !== undefined) {
      result = result.filter((a) => a.isLead === filter.lead);
    }

    if (filter?.editionId) {
      result = result.filter((a) => a.weeklyEditionId === filter.editionId);
    }

    if (filter?.tag) {
      const searchTag = filter.tag.toLowerCase();
      result = result.filter((a) =>
        a.tags.some((t) => t.toLowerCase() === searchTag)
      );
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.deck?.toLowerCase().includes(q) ||
          a.summary?.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Attach category object
    result = result.map((a) => ({
      ...a,
      category: this.getCategoryById(a.categoryId),
    }));

    // Sort by publication date or updated date descending
    result.sort((a, b) => {
      const dateA = a.publishedAt || a.updatedAt || a.createdAt;
      const dateB = b.publishedAt || b.updatedAt || b.createdAt;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

    if (filter?.limit) {
      result = result.slice(0, filter.limit);
    }

    return result;
  }

  public getArticleBySlug(slug: string): Article | null {
    const article = this.articles.find((a) => a.slug === slug);
    if (!article) return null;
    return {
      ...article,
      category: this.getCategoryById(article.categoryId),
      weeklyEdition: article.weeklyEditionId
        ? this.getWeeklyEditionById(article.weeklyEditionId) || undefined
        : undefined,
    };
  }

  public getArticleById(id: string): Article | null {
    const article = this.articles.find((a) => a.id === id);
    if (!article) return null;
    return {
      ...article,
      category: this.getCategoryById(article.categoryId),
      weeklyEdition: article.weeklyEditionId
        ? this.getWeeklyEditionById(article.weeklyEditionId) || undefined
        : undefined,
    };
  }

  public createArticle(
    articleData: Omit<Article, "id" | "createdAt" | "updatedAt">,
    actor?: { name: string; email: string }
  ): Article {
    const now = new Date().toISOString();
    const newArticle: Article = {
      ...articleData,
      id: `art-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
      publishedAt:
        articleData.status === "published" && !articleData.publishedAt
          ? now
          : articleData.publishedAt,
    };

    if (newArticle.isLead) {
      // Unset lead flag on other articles
      this.articles.forEach((a) => {
        if (a.id !== newArticle.id) a.isLead = false;
      });
    }

    this.articles.unshift(newArticle);

    this.addAuditLog({
      actorName: actor?.name || "System",
      actorEmail: actor?.email || "system@inknewspaper.com",
      action: "CREATE_ARTICLE",
      targetType: "article",
      targetId: newArticle.id,
      details: `Created article: "${newArticle.title}" (Status: ${newArticle.status})`,
    });

    return {
      ...newArticle,
      category: this.getCategoryById(newArticle.categoryId),
    };
  }

  public updateArticle(
    id: string,
    updates: Partial<Article>,
    actor?: { name: string; email: string }
  ): Article | null {
    const index = this.articles.findIndex((a) => a.id === id);
    if (index === -1) return null;

    const current = this.articles[index];
    const now = new Date().toISOString();

    // Create revision before updating
    const revision: ArticleRevision = {
      id: `rev-${Date.now()}`,
      articleId: current.id,
      title: current.title,
      deck: current.deck,
      content: current.content,
      summary: current.summary,
      editedBy: actor?.name || "Editor",
      createdAt: now,
      note: updates.status && updates.status !== current.status ? `Status changed to ${updates.status}` : "Content edit",
    };
    this.revisions.push(revision);

    if (updates.isLead) {
      this.articles.forEach((a) => {
        if (a.id !== id) a.isLead = false;
      });
    }

    const updatedPublishedAt =
      updates.status === "published" && !current.publishedAt
        ? now
        : updates.publishedAt || current.publishedAt;

    this.articles[index] = {
      ...current,
      ...updates,
      publishedAt: updatedPublishedAt,
      updatedAt: now,
    };

    this.addAuditLog({
      actorName: actor?.name || "Editor",
      actorEmail: actor?.email || "editor@inknewspaper.com",
      action: "UPDATE_ARTICLE",
      targetType: "article",
      targetId: id,
      details: `Updated article "${this.articles[index].title}" (Status: ${this.articles[index].status})`,
    });

    return {
      ...this.articles[index],
      category: this.getCategoryById(this.articles[index].categoryId),
    };
  }

  public deleteArticle(id: string, actor?: { name: string; email: string }): boolean {
    const index = this.articles.findIndex((a) => a.id === id);
    if (index === -1) return false;
    const title = this.articles[index].title;
    this.articles.splice(index, 1);

    this.addAuditLog({
      actorName: actor?.name || "Editor",
      actorEmail: actor?.email || "editor@inknewspaper.com",
      action: "DELETE_ARTICLE",
      targetType: "article",
      targetId: id,
      details: `Deleted article: "${title}"`,
    });

    return true;
  }

  public getRevisions(articleId: string): ArticleRevision[] {
    return this.revisions
      .filter((r) => r.articleId === articleId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // --- Weekly Editions ---
  public getWeeklyEditions(): WeeklyEdition[] {
    return [...this.editions].sort((a, b) => {
      if (a.volumeNumber !== b.volumeNumber) return b.volumeNumber - a.volumeNumber;
      return b.issueNumber - a.issueNumber;
    });
  }

  public getCurrentWeeklyEdition(): WeeklyEdition | null {
    const current = this.editions.find((e) => e.isCurrent);
    return current || this.editions[0] || null;
  }

  public getWeeklyEditionById(id: string): WeeklyEdition | null {
    return this.editions.find((e) => e.id === id) || null;
  }

  public createWeeklyEdition(editionData: Omit<WeeklyEdition, "id">): WeeklyEdition {
    if (editionData.isCurrent) {
      this.editions.forEach((e) => (e.isCurrent = false));
    }
    const newEdition: WeeklyEdition = {
      ...editionData,
      id: `edition-vol${editionData.volumeNumber}-iss${editionData.issueNumber}-${Date.now()}`,
    };
    this.editions.unshift(newEdition);
    return newEdition;
  }

  public updateWeeklyEdition(id: string, updates: Partial<WeeklyEdition>): WeeklyEdition | null {
    const index = this.editions.findIndex((e) => e.id === id);
    if (index === -1) return null;

    if (updates.isCurrent) {
      this.editions.forEach((e) => {
        if (e.id !== id) e.isCurrent = false;
      });
    }

    this.editions[index] = { ...this.editions[index], ...updates };
    return this.editions[index];
  }

  // --- Dexter's Vantage Point ---
  public getDexterColumns(filter?: { status?: ArticleStatus | "all"; limit?: number }): DexterColumn[] {
    let result = [...this.columns];
    if (filter?.status && filter.status !== "all") {
      result = result.filter((c) => c.status === filter.status);
    } else if (!filter?.status) {
      result = result.filter((c) => c.status === "published");
    }

    result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    if (filter?.limit) {
      result = result.slice(0, filter.limit);
    }
    return result;
  }

  public getDexterColumnBySlug(slug: string): DexterColumn | null {
    return this.columns.find((c) => c.slug === slug) || null;
  }

  public getDexterColumnById(id: string): DexterColumn | null {
    return this.columns.find((c) => c.id === id) || null;
  }

  public createDexterColumn(columnData: Omit<DexterColumn, "id">, actor?: { name: string; email: string }): DexterColumn {
    const newColumn: DexterColumn = {
      ...columnData,
      id: `col-dexter-${Date.now()}`,
    };
    this.columns.unshift(newColumn);

    this.addAuditLog({
      actorName: actor?.name || "Dexter",
      actorEmail: actor?.email || "dexter@inknewspaper.com",
      action: "CREATE_COLUMN",
      targetType: "dexter_column",
      targetId: newColumn.id,
      details: `Created column: "${newColumn.title}"`,
    });

    return newColumn;
  }

  public updateDexterColumn(id: string, updates: Partial<DexterColumn>, actor?: { name: string; email: string }): DexterColumn | null {
    const index = this.columns.findIndex((c) => c.id === id);
    if (index === -1) return null;
    this.columns[index] = { ...this.columns[index], ...updates };

    this.addAuditLog({
      actorName: actor?.name || "Dexter",
      actorEmail: actor?.email || "dexter@inknewspaper.com",
      action: "UPDATE_COLUMN",
      targetType: "dexter_column",
      targetId: id,
      details: `Updated column: "${this.columns[index].title}"`,
    });

    return this.columns[index];
  }

  // --- Imported News Discovery Pool ---
  public getImportedSources(filter?: { isProcessed?: boolean; categorySlug?: string; limit?: number }): ImportedSourceItem[] {
    let result = [...this.importedSources];
    if (filter?.isProcessed !== undefined) {
      result = result.filter((s) => s.isProcessed === filter.isProcessed);
    }
    if (filter?.categorySlug) {
      result = result.filter((s) => s.categorySlug === filter.categorySlug);
    }
    result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    if (filter?.limit) {
      result = result.slice(0, filter.limit);
    }
    return result;
  }

  public addImportedSources(sources: ImportedSourceItem[]): number {
    let count = 0;
    for (const src of sources) {
      const exists = this.importedSources.some((s) => s.url === src.url || s.title.toLowerCase() === src.title.toLowerCase());
      if (!exists) {
        this.importedSources.unshift(src);
        count++;
      }
    }
    return count;
  }

  public markSourceProcessed(id: string): boolean {
    const item = this.importedSources.find((s) => s.id === id);
    if (item) {
      item.isProcessed = true;
      return true;
    }
    return false;
  }

  // --- AI Generation Jobs ---
  public getAiJobs(limit?: number): AiJob[] {
    const jobs = [...this.aiJobs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return limit ? jobs.slice(0, limit) : jobs;
  }

  public getAiJobById(id: string): AiJob | null {
    return this.aiJobs.find((j) => j.id === id) || null;
  }

  public createAiJob(job: Omit<AiJob, "id" | "createdAt">): AiJob {
    const newJob: AiJob = {
      ...job,
      id: `job-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.aiJobs.unshift(newJob);
    return newJob;
  }

  public updateAiJob(id: string, updates: Partial<AiJob>): AiJob | null {
    const index = this.aiJobs.findIndex((j) => j.id === id);
    if (index === -1) return null;
    this.aiJobs[index] = { ...this.aiJobs[index], ...updates };
    return this.aiJobs[index];
  }

  public deleteAiJob(id: string): boolean {
    const index = this.aiJobs.findIndex((j) => j.id === id);
    if (index === -1) return false;
    this.aiJobs.splice(index, 1);
    return true;
  }

  public clearFailedAiJobs(): number {
    const initialCount = this.aiJobs.length;
    this.aiJobs = this.aiJobs.filter((j) => j.status !== "failed");
    return initialCount - this.aiJobs.length;
  }

  // --- Site Settings ---
  public getSiteSettings(): SiteSettings {
    return { ...this.siteSettings };
  }

  public updateSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
    this.siteSettings = { ...this.siteSettings, ...settings };
    return { ...this.siteSettings };
  }

  // --- Audit Logs ---
  public getAuditLogs(limit?: number): AuditLog[] {
    const logs = [...this.auditLogs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return limit ? logs.slice(0, limit) : logs;
  }

  public addAuditLog(log: Omit<AuditLog, "id" | "createdAt">): AuditLog {
    const newLog: AuditLog = {
      ...log,
      id: `log-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.auditLogs.unshift(newLog);
    return newLog;
  }
}

// Global server instance
const globalForDb = globalThis as unknown as { inkDatabase: DatabaseStore | undefined };
export const db = globalForDb.inkDatabase ?? new DatabaseStore();
if (process.env.NODE_ENV !== "production") globalForDb.inkDatabase = db;
