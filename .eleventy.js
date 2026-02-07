import { readFile, copyFile, mkdir } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { existsSync } from 'node:fs';
import markdownIt from 'markdown-it';
import markdownItContainer from 'markdown-it-container';
import markdownItFootnote from 'markdown-it-footnote';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';

const md = markdownIt({ html: true, linkify: true, typographer: true });

function containerRenderer(name) {
  return {
    validate(params) {
      return params.trim() === name;
    },
    render(tokens, idx) {
      if (tokens[idx].nesting === 1) {
        return `<div class="image-float ${name}">`;
      }
      return '</div>\n';
    },
  };
}

md.use(markdownItContainer, 'image-right', containerRenderer('image-right'));
md.use(markdownItContainer, 'image-left', containerRenderer('image-left'));
md.use(markdownItFootnote);

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy('src/assets/');

  // Filters
  eleventyConfig.addFilter('dateDisplay', (value) => {
    if (!value) return '';
    const d = new Date(value);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  eleventyConfig.addFilter('htmlDateString', (value) => {
    if (!value) return '';
    return new Date(value).toISOString();
  });

  eleventyConfig.addFilter('head', (array, n) => {
    if (!Array.isArray(array)) return [];
    return array.slice(0, n);
  });

  eleventyConfig.addFilter('escapeHtml', (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  });

  eleventyConfig.addFilter('nl2br', (str) => {
    if (!str) return '';
    return String(str).replace(/\n/g, '<br>');
  });

  eleventyConfig.addFilter('markdownify', (str) => {
    if (!str) return '';
    return md.render(String(str));
  });

  eleventyConfig.addFilter('mergeObj', (obj, key, value) => {
    return { ...obj, [key]: value };
  });

  eleventyConfig.addFilter('excerpt', (str, len = 160) => {
    if (!str) return '';
    const plain = md.render(String(str))
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (plain.length <= len) return plain;
    return plain.substring(0, len).replace(/\s\S*$/, '') + '...';
  });

  eleventyConfig.addFilter('monthName', (month) => {
    const names = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return names[parseInt(month, 10) - 1] || '';
  });

  eleventyConfig.addFilter('tagCloudStyle', (count, minCount, maxCount) => {
    const minSize = 0.75;
    const maxSize = 2.5;
    if (minCount === maxCount) {
      return `font-size: ${((minSize + maxSize) / 2).toFixed(2)}rem`;
    }
    const logMin = Math.log(minCount);
    const logMax = Math.log(maxCount);
    const scale = (Math.log(count) - logMin) / (logMax - logMin);
    const size = minSize + scale * (maxSize - minSize);
    return `font-size: ${size.toFixed(2)}rem`;
  });

  // Collections from taxonomy data
  eleventyConfig.addCollection('categoryList', async () => {
    const raw = await readFile(resolve('_generated/categories.json'), 'utf8');
    return Object.values(JSON.parse(raw));
  });

  eleventyConfig.addCollection('tagList', async () => {
    const raw = await readFile(resolve('_generated/tags.json'), 'utf8');
    return Object.values(JSON.parse(raw));
  });

  eleventyConfig.addCollection('seriesList', async () => {
    const raw = await readFile(resolve('_generated/series.json'), 'utf8');
    return Object.values(JSON.parse(raw));
  });

  // Copy post assets after build
  eleventyConfig.on('eleventy.after', async () => {
    const postsPath = resolve('_generated/posts.json');
    const posts = JSON.parse(await readFile(postsPath, 'utf8'));

    for (const post of posts) {
      if (!post.assets || post.assets.length === 0) continue;

      for (const asset of post.assets) {
        const src = resolve(post.sourceDir, asset);
        const dest = resolve('_site', post.permalink.replace(/^\//, ''), asset);

        if (!existsSync(src)) continue;

        await mkdir(dirname(dest), { recursive: true });
        await copyFile(src, dest);
      }
    }
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['njk', 'md'],
  };
}
