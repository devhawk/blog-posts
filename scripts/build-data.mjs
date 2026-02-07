import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const OUT = join(ROOT, '_generated');
const DIR_RE = /^\d{8}-/;

const HTML_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
  ndash: '\u2013', mdash: '\u2014', hellip: '\u2026',
  lsquo: '\u2018', rsquo: '\u2019', ldquo: '\u201C', rdquo: '\u201D',
  nbsp: '\u00A0',
};

function decodeHtmlEntities(str) {
  if (!str) return str;
  return str
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&([a-zA-Z]+);/g, (full, name) => HTML_ENTITIES[name] ?? full);
}

function parseCSV(csv) {
  if (!csv) return [];
  return csv.split(',').map(s => s.trim()).filter(Boolean).map(entry => {
    const [name, slug] = entry.split('|');
    return { name, slug };
  });
}

function parseAuthor(raw) {
  if (!raw) return { name: '', username: '' };
  const [name, username] = raw.split('|');
  return { name, username };
}

function parseSeries(raw) {
  if (!raw) return null;
  const [name, slug] = raw.split('|');
  return { name, slug };
}

function parseDateParts(isoDate) {
  const m = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return { year: m[1], month: m[2], day: m[3] };
  const d = new Date(isoDate);
  const year = String(d.getUTCFullYear());
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return { year, month, day };
}

function zeroPad(val) {
  return String(val).padStart(2, '0');
}

function buildLinkRewriter(posts) {
  const slugIndex = new Map();
  const dasblogTitleIndex = new Map();
  const dateSlugIndex = new Map();

  for (const p of posts) {
    const { year, month, day } = parseDateParts(p.meta.date);
    const slug = p.meta.slug;
    const canonical = `/blog/${year}/${month}/${day}/${slug}/`;

    slugIndex.set(slug, { year, month, day, slug, canonical });

    if (p.meta['dasblog-title']) {
      dasblogTitleIndex.set(
        p.meta['dasblog-title'].toLowerCase(),
        canonical
      );
    }

    dateSlugIndex.set(`${year}/${month}/${day}/${slug}`, canonical);
  }

  let rewriteCount = 0;
  let warningCount = 0;

  function rewriteUrl(url, sourceDir) {
    let match;

    // Pattern 1 & 2: http://devhawk.net/YYYY/MM/DD/slug or http://devhawk.net/blog/YYYY/M/D/slug
    match = url.match(/^http:\/\/devhawk\.net\/(?:blog\/)?(\d{4})\/(\d{1,2})\/(\d{1,2})\/([^/?#]+)/);
    if (match) {
      const [, y, m, d, rawSlug] = match;
      const slug = rawSlug.replace(/\.aspx$/i, '').replace(/\+/g, '-').toLowerCase();
      const mp = zeroPad(m);
      const dp = zeroPad(d);
      const key = `${y}/${mp}/${dp}/${slug}`;
      if (dateSlugIndex.has(key)) {
        rewriteCount++;
        return dateSlugIndex.get(key);
      }
      // Try slug index as fallback
      if (slugIndex.has(slug)) {
        rewriteCount++;
        return slugIndex.get(slug).canonical;
      }
      // Construct canonical even if not in index
      rewriteCount++;
      return `/blog/${y}/${mp}/${dp}/${slug}/`;
    }

    // Pattern: http://devhawk.net/tag/... → /tag/...
    if (url.match(/^http:\/\/devhawk\.net\/tag\//)) {
      rewriteCount++;
      return url.replace('http://devhawk.net', '');
    }

    // Pattern: http://devhawk.net/CommentView... → leave as-is (legacy comment links)
    if (url.match(/^http:\/\/devhawk\.net\/CommentView/)) {
      return url;
    }

    // Pattern: http://devhawk.net/CategoryView... → leave as-is (legacy category links)
    if (url.match(/^http:\/\/devhawk\.net\/CategoryView/)) {
      return url;
    }

    // Pattern: http://devhawk.net/PermaLink... → leave as-is
    if (url.match(/^http:\/\/devhawk\.net\/PermaLink/)) {
      return url;
    }

    // Pattern 8: http://devhawk.net/*.aspx (non-blog pages) → leave as-is, log warning
    if (url.match(/^http:\/\/devhawk\.net\/[^/]*\.aspx/)) {
      warningCount++;
      process.stderr.write(`  WARN: non-blog aspx link left as-is: ${url} (in ${sourceDir})\n`);
      return url;
    }

    // Pattern: http://devhawk.net/default... → leave as-is
    if (url.match(/^http:\/\/devhawk\.net\/default/)) {
      return url;
    }

    // Other http://devhawk.net links without date pattern
    if (url.match(/^http:\/\/devhawk\.net\//)) {
      warningCount++;
      process.stderr.write(`  WARN: unhandled devhawk.net link left as-is: ${url} (in ${sourceDir})\n`);
      return url;
    }

    // Pattern 3: /blog/YYYY/M/D/slug → zero-pad date parts
    match = url.match(/^\/blog\/(\d{4})\/(\d{1,2})\/(\d{1,2})\/([^/?#]+)/);
    if (match) {
      const [, y, m, d, slug] = match;
      rewriteCount++;
      return `/blog/${y}/${zeroPad(m)}/${zeroPad(d)}/${slug}/`;
    }

    // Pattern 4: /blog/Title.aspx → dasblog-title lookup
    match = url.match(/^\/blog\/([^/]+)\.aspx$/i);
    if (match) {
      const title = match[1];
      const dasblogKey = title.replace(/\+/g, '+').toLowerCase();
      if (dasblogTitleIndex.has(dasblogKey)) {
        rewriteCount++;
        return dasblogTitleIndex.get(dasblogKey);
      }
      // Try converting CamelCase to + separated
      const plusKey = title.replace(/([a-z])([A-Z])/g, '$1+$2').toLowerCase();
      if (dasblogTitleIndex.has(plusKey)) {
        rewriteCount++;
        return dasblogTitleIndex.get(plusKey);
      }
      warningCount++;
      process.stderr.write(`  WARN: unresolvable /blog/*.aspx link: ${url} (in ${sourceDir})\n`);
      return url;
    }

    // Pattern 5: /blog/*.html → try to match
    match = url.match(/^\/blog\/(.+)\.html$/i);
    if (match) {
      warningCount++;
      process.stderr.write(`  WARN: unresolvable /blog/*.html link: ${url} (in ${sourceDir})\n`);
      return url;
    }

    // Pattern 6: /blog/archive/YYYY/MM/DD/NNN.aspx → match by date
    match = url.match(/^\/blog\/archive\/(\d{4})\/(\d{1,2})\/(\d{1,2})\/(\d+)\.aspx$/i);
    if (match) {
      const [, y, m, d] = match;
      const mp = zeroPad(m);
      const dp = zeroPad(d);
      const prefix = `${y}/${mp}/${dp}/`;
      for (const [key, canonical] of dateSlugIndex) {
        if (key.startsWith(prefix)) {
          rewriteCount++;
          return canonical;
        }
      }
      warningCount++;
      process.stderr.write(`  WARN: unresolvable /blog/archive link: ${url} (in ${sourceDir})\n`);
      return url;
    }

    // Pattern 7: ~/blog/slug
    match = url.match(/^~\/blog\/([^/?#]+)/);
    if (match) {
      const slug = match[1];
      if (slugIndex.has(slug)) {
        rewriteCount++;
        return slugIndex.get(slug).canonical;
      }
      warningCount++;
      process.stderr.write(`  WARN: unresolvable ~/blog/ link: ${url} (in ${sourceDir})\n`);
      return url;
    }

    // Pattern: /blog/series or /blog/... (non-post paths) → leave as-is
    if (url.startsWith('/blog/')) {
      return url;
    }

    return url;
  }

  function rewriteContent(markdown, sourceDir) {
    return markdown.replace(/\[([^\]]*)\]\(([^)]+)\)/g, (full, text, url) => {
      const newUrl = rewriteUrl(url, sourceDir);
      if (newUrl !== url) {
        return `[${text}](${newUrl})`;
      }
      return full;
    });
  }

  return { rewriteContent, getStats: () => ({ rewriteCount, warningCount }) };
}

async function fileExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const entries = await readdir(ROOT);
  const postDirs = entries.filter(e => DIR_RE.test(e)).sort();

  process.stderr.write(`Processing ${postDirs.length} posts...\n`);

  const rawPosts = [];
  for (const dir of postDirs) {
    const dirPath = join(ROOT, dir);
    const metaPath = join(dirPath, 'hawk-post.json');

    if (!(await fileExists(metaPath))) continue;

    const metaRaw = await readFile(metaPath, 'utf-8');
    const meta = JSON.parse(metaRaw.replace(/^\uFEFF/, ''));

    const contentPath = join(dirPath, 'content.md');
    const content = await readFile(contentPath, 'utf-8');

    let comments = null;
    const commentsPath = join(dirPath, 'hawk-comments.json');
    if (await fileExists(commentsPath)) {
      const commentsRaw = await readFile(commentsPath, 'utf-8');
      comments = JSON.parse(commentsRaw.replace(/^\uFEFF/, ''));
    }

    const allFiles = await readdir(dirPath);
    const assets = allFiles.filter(f =>
      !f.endsWith('.md') && !f.endsWith('.json')
    );

    rawPosts.push({ dir, meta, content, comments, assets });
  }

  const rewriter = buildLinkRewriter(rawPosts);

  const tagCounts = {};
  const catCounts = {};
  const seriesCounts = {};

  const posts = rawPosts.map(({ dir, meta, content, comments, assets }) => {
    const { year, month, day } = parseDateParts(meta.date);
    const slug = meta.slug;
    const permalink = `/blog/${year}/${month}/${day}/${slug}/`;

    const categories = parseCSV(meta['csv-category-slugs']);
    const tags = parseCSV(meta['csv-tag-slugs']);
    const author = parseAuthor(meta.author);
    const series = parseSeries(meta.series);

    for (const c of categories) {
      if (!catCounts[c.slug]) catCounts[c.slug] = { name: c.name, slug: c.slug, count: 0 };
      catCounts[c.slug].count++;
    }
    for (const t of tags) {
      if (!tagCounts[t.slug]) tagCounts[t.slug] = { name: t.name, slug: t.slug, count: 0 };
      tagCounts[t.slug].count++;
    }
    if (series) {
      if (!seriesCounts[series.slug]) seriesCounts[series.slug] = { name: series.name, slug: series.slug, count: 0 };
      seriesCounts[series.slug].count++;
    }

    const rewrittenContent = rewriter.rewriteContent(content, dir);

    const safeComments = comments
      ? comments.map(c => ({
          authorName: decodeHtmlEntities(c['author-name'] || ''),
          authorUrl: c['author-url'] || '',
          date: c.date,
          content: c.content,
        }))
      : null;

    return {
      slug,
      title: decodeHtmlEntities(meta.title),
      date: meta.date,
      year,
      month,
      day,
      permalink,
      categories,
      tags,
      author,
      series,
      commentCount: meta['comment-count'] || 0,
      comments: safeComments,
      content: rewrittenContent,
      sourceDir: dir,
      assets,
    };
  });

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const stats = rewriter.getStats();
  process.stderr.write(`Rewrote ${stats.rewriteCount} links, ${stats.warningCount} warnings\n`);

  process.stderr.write(`Writing _generated/posts.json...\n`);
  await writeFile(join(OUT, 'posts.json'), JSON.stringify(posts, null, 2));

  process.stderr.write(`Writing _generated/tags.json...\n`);
  await writeFile(join(OUT, 'tags.json'), JSON.stringify(tagCounts, null, 2));

  process.stderr.write(`Writing _generated/categories.json...\n`);
  await writeFile(join(OUT, 'categories.json'), JSON.stringify(catCounts, null, 2));

  process.stderr.write(`Writing _generated/series.json...\n`);
  await writeFile(join(OUT, 'series.json'), JSON.stringify(seriesCounts, null, 2));

  process.stderr.write(`Done. ${posts.length} posts processed.\n`);
}

main().catch(err => {
  process.stderr.write(`ERROR: ${err.stack}\n`);
  process.exit(1);
});
