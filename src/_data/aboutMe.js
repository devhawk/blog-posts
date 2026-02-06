import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export default async function () {
  const mdPath = resolve('about-me.md');
  let content = await readFile(mdPath, 'utf8');

  const postsPath = resolve('_generated/posts.json');
  const posts = JSON.parse(await readFile(postsPath, 'utf8'));

  const slugToPermalink = new Map();
  for (const post of posts) {
    slugToPermalink.set(post.slug, post.permalink);
  }

  content = content.replace(/\(~\/blog\/([^)]+)\)/g, (match, slug) => {
    const permalink = slugToPermalink.get(slug);
    if (permalink) {
      return `(${permalink})`;
    }
    return match;
  });

  return content;
}
