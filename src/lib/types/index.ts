export type Role = "admin" | "editor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  createdAt: string;
}

export type SourcePermission = "metadata_only" | "licensed_republish" | "public_domain" | "blocked";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color?: string;
  orderIndex: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export type ArticleStatus =
  | "draft"
  | "in_review"
  | "approved"
  | "scheduled"
  | "published"
  | "rejected"
  | "archived";

export interface ArticleSource {
  id: string;
  name: string;
  url: string;
  publisher: string;
  publishedAt?: string;
  permission: SourcePermission;
}

export interface ImportedSourceItem {
  id: string;
  title: string;
  description: string;
  url: string;
  sourceName: string;
  sourceUrl?: string;
  publishedAt: string;
  categorySlug?: string;
  rawJson?: Record<string, unknown>;
  permission: SourcePermission;
  isProcessed: boolean;
  clusterId?: string;
  imageUrl?: string;
}

export interface ArticleRevision {
  id: string;
  articleId: string;
  title: string;
  deck: string;
  content: string;
  summary: string;
  editedBy: string;
  createdAt: string;
  note?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  deck: string;
  summary: string;
  content: string;
  categoryId: string;
  category?: Category;
  tags: string[];
  authorName: string;
  authorAvatar?: string;
  authorRole?: string;
  featuredImage: string;
  imageCaption?: string;
  imageCredit?: string;
  imageAlt?: string;
  status: ArticleStatus;
  isFeatured: boolean;
  isLead: boolean;
  isBreaking: boolean;
  readingTimeMinutes: number;
  publishedAt?: string;
  scheduledAt?: string;
  updatedAt: string;
  createdAt: string;
  seoTitle?: string;
  seoDescription?: string;
  aiGenerated: boolean;
  aiConfidence?: number;
  aiClaims?: string[];
  aiWarnings?: string[];
  suggestedImageConcept?: string;
  sources?: ArticleSource[];
  weeklyEditionId?: string;
  weeklyEdition?: WeeklyEdition;
}

export interface WeeklyEdition {
  id: string;
  volumeNumber: number;
  issueNumber: number;
  title: string;
  theme: string;
  coverImage: string;
  publicationDate: string;
  isCurrent: boolean;
  description: string;
  articleIds: string[];
}

export interface DexterColumn {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  editionId?: string;
  editionName?: string;
  signatureQuote: string;
  tags: string[];
  featuredImage: string;
  status: ArticleStatus;
  readingTimeMinutes: number;
  authorBio?: string;
}

export type AiJobStatus = "pending" | "running" | "completed" | "failed";

export interface AiJob {
  id: string;
  status: AiJobStatus;
  storyClusterTitle: string;
  sourceUrls: string[];
  promptText: string;
  resultArticleId?: string;
  errorLog?: string;
  createdAt: string;
  completedAt?: string;
  claimsFound?: string[];
  confidenceScore?: number;
}

export interface AuditLog {
  id: string;
  actorName: string;
  actorEmail: string;
  action: string;
  targetType: "article" | "dexter_column" | "edition" | "category" | "source" | "settings" | "ai_job";
  targetId: string;
  details: string;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  currentEditionId: string;
  leadArticleId: string;
  topStoryIds: string[];
  breakingNewsText?: string;
  breakingNewsActive: boolean;
  footerQuote: string;
}
