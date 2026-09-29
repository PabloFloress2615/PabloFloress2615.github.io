#!/usr/bin/env node
/**
 * Reports every TODO_ placeholder still present in src/data/site.ts.
 *
 * It checks the source, not the build: placeholders are rendered as a visible
 * "TODO" chip rather than a broken href, so the raw constant never reaches the
 * HTML and scanning dist/ would always pass.
 *
 * This is a pre-launch gate, not a build step — placeholders are expected while
 * the site is being filled in.
 *
 *   npm run check:todo
 */
import { readFileSync } from 'node:fs';

const SOURCE = 'src/data/site.ts';
const PATTERN = /'(TODO_[A-Z0-9_]+)'/g;

const lines = readFileSync(SOURCE, 'utf8').split('\n');
const found = [];

lines.forEach((line, i) => {
  for (const [, name] of line.matchAll(PATTERN)) {
    found.push({ line: i + 1, name });
  }
});

if (found.length > 0) {
  console.error(`${found.length} placeholder(s) still to fill in ${SOURCE}:\n`);
  for (const { line, name } of found) {
    console.error(`  ${SOURCE}:${line}  ${name}`);
  }
  console.error('\nReplace each one with the real URL.');
  process.exit(1);
}

console.log(`No TODO_ placeholders left in ${SOURCE}.`);
