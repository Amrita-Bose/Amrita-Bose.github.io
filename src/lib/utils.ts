import type { Publication } from '../data/content';

/**
 * Generates a standard BibTeX citation string from a publication object.
 */
export function generateBibTeX(pub: Publication): string {
  const fields: string[] = [];
  
  if (pub.author) fields.push(`  author = {${pub.author}}`);
  if (pub.title) fields.push(`  title = {${pub.title}}`);
  if (pub.booktitle) fields.push(`  booktitle = {${pub.booktitle}}`);
  if (pub.journal) fields.push(`  journal = {${pub.journal}}`);
  if (pub.volume) fields.push(`  volume = {${pub.volume}}`);
  if (pub.editor) fields.push(`  editor = {${pub.editor}}`);
  if (pub.series) fields.push(`  series = {${pub.series}}`);
  if (pub.year) fields.push(`  year = {${pub.year}}`);
  if (pub.pages) fields.push(`  pages = {${pub.pages}}`);
  if (pub.publisher) fields.push(`  publisher = {${pub.publisher}}`);
  if (pub.address) fields.push(`  address = {${pub.address}}`);
  if (pub.doi) fields.push(`  doi = {${pub.doi}}`);

  return `@${pub.type}{${pub.citeKey},\n${fields.join(",\n")}\n}`;
}
