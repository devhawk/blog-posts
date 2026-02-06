# Static Site Generator Spec — DevHawk Blog

## 1. Overview

This repo contains 1,335 blog posts (2003–2019) originally hosted on DasBlog at devhawk.net. The goal is to generate a fully static website that faithfully renders all posts, preserves existing URLs, and produces a maintainable build pipeline.

## 2. Goals / Non-Goals

### Goals

1. **Static output** — no server-side rendering at runtime
2. **URL preservation** — keep canonical URLs stable; redirect known DasBlog-era URL patterns
3. **Faithful rendering** — markdown posts, relative images, custom directives (`::: image-right`, `::: image-left`), code blocks with syntax highlighting, and historical comments
4. **Navigation and discovery** — home page, post pages, category/tag/series pages, date archives, RSS feed, sitemap
5. **Simple build and deploy** — one-command local build, CI-friendly, deployable to any static host

### Non-Goals (initial version)

- Full-text search
- Image optimization pipeline
- Client-side SPA behavior
- New comment submission (comments are historical archive only)

## 3. Framework: Eleventy (11ty)

**Decision:** Use [Eleventy (11ty)](https://www.11ty.dev/) as the static site generator.

**Rationale:**

- Works well with content that has no frontmatter — metadata lives in `hawk-post.json`
- Excellent collection/pagination support for tags, categories, and archives
- Node ecosystem makes it easy to parse custom metadata fields and extend markdown-it
- Minimal runtime assumptions and easy hosting
- Node.js LTS (20+) required

**Output directory:** `_site/`

**Hosting target:** Cloudflare Pages — free tier, global CDN, native `_redirects` file support for legacy URL preservation.

## 4. Source Data Model

### 4.1 Post Directories

Each post lives in a directory named `YYYYMMDD-slug-name/` containing:

| File | Required | Description |
|------|----------|-------------|
| `content.md` | Yes | Markdown body (no frontmatter) |
| `hawk-post.json` | Yes | Post metadata |
| `hawk-comments.json` | No | Array of comment objects (474 posts) |
| `*.jpg`, `*.png`, `*.gif` | No | Image assets (89 posts) |

### 4.2 hawk-post.json Schema

| Field | Type | Description |
|-------|------|-------------|
| `slug` | string | URL slug |
| `title` | string | Post title |
| `date` | string | ISO 8601 datetime with timezone |
| `modified` | string? | ISO 8601 datetime |
| `csv-category-slugs` | string | Pipe-delimited pairs, comma-separated: `Display Name\|slug` |
| `csv-tag-slugs` | string | Same format as categories |
| `author` | string | Format: `DisplayName\|username\|email` |
| `comment-count` | number | Number of comments |
| `series` | string? | Format: `Series Name\|series-slug` |
| `dasblog-entry-id` | string | Legacy DasBlog GUID |
| `dasblog-title` | string | Legacy URL-encoded title |
| `dasblog-unique-title` | string | Legacy unique path (e.g. `2003/01/15/Title`) |
| `sha1` | string? | Content hash |

### 4.3 hawk-comments.json Schema

Array of objects:

| Field | Type | Description |
|-------|------|-------------|
| `author-name` | string | Commenter display name |
| `author-email` | string | Commenter email (do not render publicly) |
| `author-url` | string | Commenter URL (optional, may be empty) |
| `date` | string | ISO 8601 datetime |
| `content` | string | Comment body (treat as plain text) |

### 4.4 Other Repo Data

| File | Description |
|------|-------------|
| `social.json` | Social media links for site chrome |
| `msft-presentations.json` | Microsoft presentation links |
| `neo-presentations.json` | Neo blockchain presentation links |

### 4.5 Parsing Rules

**Categories / Tags:** Split by `,` into entries, split each entry by `|` into `{ name, slug }`.

**Author:** Split by `|` into `{ name, username, email }`. Render only `name` publicly.

**Series:** Split by `|` into `{ name, slug }`.

## 5. URL Scheme

### 5.1 Canonical Post URLs

```
/blog/{YYYY}/{MM}/{DD}/{slug}/
```

Example: `/blog/2008/10/31/introducing-foo/`

### 5.2 Category, Tag, and Series URLs

| Page | URL |
|------|-----|
| Categories index | `/blog/categories/` |
| Category page | `/blog/categories/{categorySlug}/` |
| Tags index | `/blog/tags/` |
| Tag page | `/blog/tags/{tagSlug}/` |
| Series index | `/blog/series/` |
| Series page | `/blog/series/{seriesSlug}/` |

### 5.3 Archives

| Page | URL |
|------|-----|
| Archive index | `/blog/archive/` |
| Year archive | `/blog/archive/{YYYY}/` |
| Month archive | `/blog/archive/{YYYY}/{MM}/` |

### 5.4 Home and Pagination

| Page | URL |
|------|-----|
| Home | `/` |
| Blog index | `/blog/` |
| Blog page N | `/blog/page/{N}/` |

### 5.5 Legacy URL Redirects

Generate redirect mappings from legacy DasBlog fields (`dasblog-unique-title`, `dasblog-title`, `dasblog-entry-id`) to canonical permalinks.

Output a Cloudflare Pages `_redirects` file in the build output. Cloudflare supports up to 2,000 static redirects and 100 dynamic redirects. Format:

```
/old/path /new/path 301
```

**Open question:** What are the exact historical devhawk.net URL patterns that must be preserved? An audit of old sitemaps or web archive data should be performed before finalizing redirect rules.

## 6. Templates

### 6.1 Layouts (Nunjucks)

| Layout | Purpose |
|--------|---------|
| `base.njk` | HTML head, CSS, header/nav/footer, site-wide chrome |
| `post.njk` | Post title, date, categories/tags, series, body, comments, prev/next |
| `list.njk` | Generic list view for tag/category/archive/blog index pages |
| `page.njk` | Static pages (About, Presentations) |

### 6.2 Pages to Generate

1. **Home page** — recent posts (e.g. latest 10)
2. **Blog index** — paginated list of all posts (e.g. 20 per page)
3. **Post pages** — 1,335 individual post pages
4. **Tags index + tag pages** — one page per tag
5. **Categories index + category pages** — one page per category (10 categories)
6. **Series index + series pages** — one page per series
7. **Archive index + year + month pages**
8. **RSS feed** — `/feed.xml` (RSS 2.0)
9. **Sitemap** — `/sitemap.xml`
10. **404 page**

### 6.3 Navigation

Header nav: Home, Blog, Categories, Tags, Archive, About, Presentations

Social links from `social.json` in footer.

## 7. Markdown Rendering

### 7.1 Engine

Use `markdown-it` (via 11ty config) with CommonMark-compatible settings.

### 7.2 Custom Directives

Implement a `markdown-it-container` plugin for `::: image-right` and `::: image-left`:

```markdown
::: image-right
[![](thumbnail.jpg)](full.jpg)
:::
```

Renders to:

```html
<div class="image-float image-right">
  <a href="full.jpg"><img src="thumbnail.jpg" alt=""></a>
</div>
```

CSS:

```css
.image-float.image-right { float: right; margin: 0 0 1rem 1rem; max-width: 50%; }
.image-float.image-left  { float: left; margin: 0 1rem 1rem 0; max-width: 50%; }
@media (max-width: 768px) {
  .image-float { float: none; max-width: 100%; margin: 1rem 0; }
}
```

### 7.3 Relative Images

Copy all non-markdown/json assets from each post directory to the output alongside the rendered HTML. This preserves relative image references without rewriting:

```
Input:  20040101-national-champions/PatrickTrojan.JPG
Output: _site/blog/2004/01/01/national-champions/PatrickTrojan.JPG
```

### 7.4 Syntax Highlighting

Use `@11ty/eleventy-plugin-syntaxhighlight` (Prism-based) for fenced code blocks.

## 8. Comments

- Render comments at the bottom of post pages when `hawk-comments.json` exists
- Display: author name (linked if `author-url` is non-empty), date, content
- Treat comment `content` as plain text — escape HTML, convert line breaks to `<br>`
- Do not display `author-email`
- No mechanism for new comment submission

## 9. Build Pipeline

### 9.1 Project Structure

```
/.eleventy.js               # 11ty config
/package.json
/src/
  _includes/
    layouts/
      base.njk
      post.njk
      list.njk
      page.njk
    components/              # partial templates
  assets/
    css/
    js/
  pages/
    index.njk
    blog.njk
    tags.njk
    categories.njk
    series.njk
    archive.njk
    about.njk
    presentations.njk
    feed.njk
    sitemap.njk
    404.njk
/scripts/
  build-data.mjs            # prebuild data indexing
/_generated/                 # gitignored, produced by build-data
  posts.json
  tags.json
  categories.json
  series.json
  redirects.json
/_site/                      # gitignored, 11ty output
```

Post directories remain at the repo root to minimize churn.

### 9.2 Data Indexing Step

A prebuild script (`scripts/build-data.mjs`) scans all `YYYYMMDD-*` directories and:

1. Reads and parses `hawk-post.json`, `content.md`, and optionally `hawk-comments.json`
2. Normalizes metadata (parses CSV fields, author, series, dates)
3. Collects asset filenames
4. Writes normalized data to `_generated/`:
   - `posts.json` — full post list with parsed metadata and content
   - `tags.json` — tag index with post references
   - `categories.json` — category index with post references
   - `series.json` — series index with post references
   - `redirects.json` — legacy URL to canonical URL mapping

Eleventy consumes `_generated/*.json` as global data.

### 9.3 Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run build-data` | Generate `_generated/` indexes |
| `npm run build` | Run 11ty to produce `_site/` |
| `npm run serve` | 11ty dev server |
| `npm run clean` | Remove `_site/` and `_generated/` |

### 9.4 Dependencies

- `@11ty/eleventy`
- `luxon` (date parsing/formatting)
- `markdown-it`
- `markdown-it-container`
- `@11ty/eleventy-plugin-syntaxhighlight`

## 10. SEO and Metadata

- `<title>` tag per page
- Meta description: first ~160 characters of post content (stripped of HTML)
- Canonical `<link>` tag pointing to canonical permalink
- Open Graph tags: `og:title`, `og:url`, `og:type=article`, `article:published_time`, `article:modified_time`
- RSS feed at `/feed.xml`
- Sitemap at `/sitemap.xml`
- `robots.txt`

## 11. Styling

Minimal, readable, blog-first design:

- Responsive layout
- System font stack for performance
- Code block styling with horizontal scroll for long lines
- Floating image directive styling (see §7.2)
- Dark mode support deferred to a future iteration

## 12. Validation

Automated checks the build should verify:

1. Build completes without errors
2. Generated post page count equals 1,335
3. Posts with `hawk-comments.json` render a comments section
4. RSS feed is valid XML
5. Sitemap includes all canonical post URLs
6. No broken relative image references

## 13. Rollout Plan

### Phase 1 — Core rendering

- Set up Eleventy skeleton, base layouts, data indexing script
- Render all 1,335 post pages with correct URLs
- Copy image assets, verify relative references work
- Implement custom markdown containers for floating images

### Phase 2 — Navigation and feeds

- Add tag, category, series, and archive pages
- Add blog index with pagination
- Add RSS feed and sitemap
- Add basic styling

### Phase 3 — Legacy URLs and polish

- Implement redirect generation for legacy DasBlog URLs
- Perform URL audit and add test fixtures
- Add SEO metadata, Open Graph tags
- Add About and Presentations pages using repo JSON data

## Appendix A — Open Questions

1. ~~**Hosting target**~~ — Resolved: Cloudflare Pages.
2. **Historical URL patterns** — What exact DasBlog URL shapes need redirects? Provide examples or old sitemap data if available.
3. **About page content** — `.gitignore` references `about-me.html`; source content for this page needs to be identified or authored.
