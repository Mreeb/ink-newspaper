-- ==============================================================================
-- INK NEWSPAPER — COMPLETE POSTGRESQL SCHEMA & MIGRATION
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users & Roles
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'editor')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Categories
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    color TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tags
CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Weekly Editions
CREATE TABLE IF NOT EXISTS weekly_editions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    volume_number INTEGER NOT NULL,
    issue_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    theme TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    publication_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_volume_issue UNIQUE (volume_number, issue_number)
);

-- 5. Articles
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    deck TEXT,
    summary TEXT,
    content TEXT NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    tags TEXT[] DEFAULT '{}',
    author_name TEXT NOT NULL DEFAULT 'INK Editorial Board',
    author_avatar TEXT,
    author_role TEXT,
    featured_image TEXT NOT NULL,
    image_caption TEXT,
    image_credit TEXT,
    image_alt TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in_review', 'approved', 'scheduled', 'published', 'rejected', 'archived')),
    is_featured BOOLEAN DEFAULT FALSE,
    is_lead BOOLEAN DEFAULT FALSE,
    is_breaking BOOLEAN DEFAULT FALSE,
    reading_time_minutes INTEGER DEFAULT 5,
    published_at TIMESTAMPTZ,
    scheduled_at TIMESTAMPTZ,
    seo_title TEXT,
    seo_description TEXT,
    ai_generated BOOLEAN DEFAULT FALSE,
    ai_confidence NUMERIC(3, 2),
    ai_claims TEXT[] DEFAULT '{}',
    ai_warnings TEXT[] DEFAULT '{}',
    suggested_image_concept TEXT,
    weekly_edition_id UUID REFERENCES weekly_editions(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Article Revisions (Audit & Rollback history)
CREATE TABLE IF NOT EXISTS article_revisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    deck TEXT,
    content TEXT NOT NULL,
    summary TEXT,
    edited_by TEXT NOT NULL,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Sources & Permissions
CREATE TABLE IF NOT EXISTS sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    domain TEXT UNIQUE NOT NULL,
    permission_policy TEXT NOT NULL DEFAULT 'metadata_only' CHECK (permission_policy IN ('metadata_only', 'licensed_republish', 'public_domain', 'blocked')),
    trust_score NUMERIC(3, 2) DEFAULT 0.85,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Imported Source Items (News Discovery Pool)
CREATE TABLE IF NOT EXISTS imported_source_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    url TEXT UNIQUE NOT NULL,
    source_name TEXT NOT NULL,
    source_url TEXT,
    published_at TIMESTAMPTZ,
    category_slug TEXT,
    image_url TEXT,
    permission TEXT NOT NULL DEFAULT 'metadata_only',
    is_processed BOOLEAN DEFAULT FALSE,
    cluster_id TEXT,
    raw_json JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Article Source Citations (Many-to-Many / Linked Citations)
CREATE TABLE IF NOT EXISTS article_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    publisher TEXT NOT NULL,
    published_at TIMESTAMPTZ,
    permission TEXT NOT NULL DEFAULT 'metadata_only',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Dexter's Vantage Point Columns
CREATE TABLE IF NOT EXISTS dexter_columns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    signature_quote TEXT,
    tags TEXT[] DEFAULT '{}',
    featured_image TEXT NOT NULL,
    edition_id UUID REFERENCES weekly_editions(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'in_review', 'approved', 'scheduled', 'published', 'archived')),
    reading_time_minutes INTEGER DEFAULT 7,
    author_bio TEXT DEFAULT 'Dexter is the Senior Columnist and Philosophical Editor of INK Newspaper.',
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. AI Generation Jobs
CREATE TABLE IF NOT EXISTS ai_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
    story_cluster_title TEXT NOT NULL,
    source_urls TEXT[] DEFAULT '{}',
    prompt_text TEXT NOT NULL,
    result_article_id UUID REFERENCES articles(id) ON DELETE SET NULL,
    error_log TEXT,
    confidence_score NUMERIC(3, 2),
    claims_found TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- 12. Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    site_name TEXT NOT NULL DEFAULT 'INK Newspaper',
    tagline TEXT NOT NULL DEFAULT 'The Weekly Editorial of Distinction',
    current_edition_id UUID REFERENCES weekly_editions(id) ON DELETE SET NULL,
    lead_article_id UUID REFERENCES articles(id) ON DELETE SET NULL,
    top_story_ids TEXT[] DEFAULT '{}',
    breaking_news_text TEXT,
    breaking_news_active BOOLEAN DEFAULT FALSE,
    footer_quote TEXT DEFAULT 'Molded from truth, committed to clarity.',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT single_row CHECK (id = 1)
);

-- 13. Publishing Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_name TEXT NOT NULL,
    actor_email TEXT NOT NULL,
    action TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id TEXT NOT NULL,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for maximum query performance
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_is_featured ON articles(is_featured);
CREATE INDEX IF NOT EXISTS idx_articles_is_lead ON articles(is_lead);
CREATE INDEX IF NOT EXISTS idx_imported_sources_processed ON imported_source_items(is_processed);
CREATE INDEX IF NOT EXISTS idx_imported_sources_published ON imported_source_items(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_dexter_columns_slug ON dexter_columns(slug);
CREATE INDEX IF NOT EXISTS idx_ai_jobs_status ON ai_jobs(status);

-- Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dexter_columns ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_editions ENABLE ROW LEVEL SECURITY;

-- Public can read published articles, editions, categories, and columns
CREATE POLICY "Public Read Published Articles" ON articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read Published Columns" ON dexter_columns FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Editions" ON weekly_editions FOR SELECT USING (true);
