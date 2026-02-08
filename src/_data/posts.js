import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export default async function () {
  const filePath = resolve('_generated/posts.json');
  const raw = await readFile(filePath, 'utf8');
  const posts = JSON.parse(raw);

  const seriesPosts = {};
  for (const post of posts) {
    if (post.series) {
      if (!seriesPosts[post.series.slug]) seriesPosts[post.series.slug] = [];
      seriesPosts[post.series.slug].push(post);
    }
  }

  for (const slug of Object.keys(seriesPosts)) {
    const group = seriesPosts[slug].sort((a, b) => new Date(a.date) - new Date(b.date));
    for (let i = 0; i < group.length; i++) {
      if (i > 0) {
        group[i].seriesPrev = { title: group[i - 1].title, permalink: group[i - 1].permalink };
      }
      if (i < group.length - 1) {
        group[i].seriesNext = { title: group[i + 1].title, permalink: group[i + 1].permalink };
      }
    }
  }

  return posts;
}
