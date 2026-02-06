import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export default async function () {
  const filePath = resolve('_generated/series.json');
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw);
}
