# INK Newspaper — The Weekly Editorial

A production-ready, AI-assisted weekly newspaper web application designed with a **clay-inspired editorial minimalism** molded from warm paper and refined tactile surfaces.

---

## 1. Key Features

- **Editorial Design System**:
  - Custom palette: `#F4EFE6` (paper background), `#FFFBF4` (elevated clay surface), `#171716` (primary ink), `#C96846` (clay accent), and `#91442F` (dark clay).
  - High-contrast typography featuring **Fraunces** for editorial headlines and **Manrope** for interface clarity.
  - Tactile clay elevation shadows, subtle warm borders, and responsive `clamp()` font scaling.
  - Seamless Light / Dark theme persistence with zero hydration flicker.

- **Public Publication Experience**:
  - **Homepage**: Dominant lead story, supporting top stories, categorized sections (World, Politics, Tech, Business, Culture, Spirituality, Sports), breaking news alerts, and curated newsletter box.
  - **Dexter’s Vantage Point**: Branded weekly column showcase with wax seal / signature detail, author profile, and complete essay archives.
  - **Weekly Editions**: Volume & Issue cover index with table of contents and grouped articles.
  - **Long-Form Reading**: Drop caps, breakout pull quotes, image captions & credits, social sharing, reading progress indicator, supporting citations, AI disclosure, and JSON-LD `NewsArticle` structured data.
  - **Global Search**: Instant search modal (`⌘K` / `Ctrl+K`) with live keyword matching.
  - **Full Standards**: RSS 2.0 feed (`/feed.xml`), dynamic sitemap (`/sitemap.xml`), and robots configuration.

- **Newsroom CMS & Admin Suite (`/admin`)**:
  - **Dashboard**: Review queues, scheduled publication counters, live editions status, and failed AI tasks monitor.
  - **Article Editor**: TipTap rich text engine with custom formatting, revision history rollback, and live preview modal.
  - **Dexter’s Column Studio**: 8-step streamlined workflow with drag-and-drop `.docx` to HTML converter.
  - **News Discovery Pipeline**: One-click ingestion from **NewsData.io** and **GDELT 2.0 Doc API**, automatic deduplication, clustering, and license policy enforcement (`metadata_only`, `licensed_republish`, `public_domain`, `blocked`).
  - **AI Drafting Engine**: **OpenAI Responses/Structured Output API** with strict Zod schema validation enforcing journalistic standards (zero hallucinations, primary source linking, factual claims extraction, conflict warnings).
  - **Publishing Ledger**: Complete audit logging of all editorial actions.

---

## 2. Technical Stack

- **Framework**: Next.js (App Router, Server Components & Actions)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables Design Tokens
- **Rich Text**: TipTap (`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-image`, `@tiptap/extension-link`)
- **Animations**: Framer Motion
- **AI Engine**: OpenAI API with Structured Output JSON Schema & Zod
- **News Discovery**: NewsData.io API + GDELT 2.0 Doc API
- **Document Processing**: Mammoth (.docx converter)
- **Database**: Supabase PostgreSQL Schema + Local Persistent Singleton Adapter

---

## 3. Getting Started

### 1. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Ensure the following environment variables are present in `.env.local`:
```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_TEXT_MODEL=gpt-4o-mini
NEWSDATA_API_KEY=your_newsdata_api_key

GDELT_API_BASE_URL=https://api.gdeltproject.org/api/v2/doc/doc

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

CRON_SECRET=ink_editorial_cron_secret_key_prod_2026
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Development Server
Run the application locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Staff CMS Access
Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login) and select one of the built-in staff profiles:
- **Administrator**: `editor-in-chief@inknewspaper.com` (Eleanor Vance)
- **Desk Editor**: `marcus.thorne@inknewspaper.com` (Marcus Thorne)

---

## 4. Database Setup (Supabase)

To connect a remote Supabase project:
1. Create a new Supabase PostgreSQL project.
2. Open the SQL Editor in Supabase and run `supabase/migrations/001_init.sql`.
3. Fill `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.

---

## 5. Deployment

Deploy seamlessly to Vercel:
```bash
npx vercel
```
Set all environment variables from `.env.local` into the Vercel project settings.
