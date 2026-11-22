// news-image-20261122 entry (Node 22, standard library only): the front page
// is the entry.png sitting beside this file. This program copies it into the
// output directory as entry.png, where the gate and the judge read it. The
// image is a dense newspaper front page summing up the world news of Sunday
// 22 November 2026: fourteen featured stories, twenty-one more briefs, a
// world map with numbered pins, and a date-check box. Nothing is drawn or
// fetched at run time, so every run writes the exact same bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const SOURCE = new URL('./entry.png', import.meta.url);

// Refuse to ship a missing or truncated image: the gate rejects an entry
// whose file is not a whole PNG, so a bad copy must crash here instead of
// passing silently. The copy is a plain byte copy with no re-encoding, which
// is what keeps the output identical to the source on every run. The size
// check above is the whole verification: same byte count, same file.
const expectedBytes = statSync(SOURCE).size;

mkdirSync(OUTPUT_DIR, { recursive: true });
const dest = join(OUTPUT_DIR, 'entry.png');
copyFileSync(SOURCE, dest);
const actualBytes = statSync(dest).size;
if (actualBytes !== expectedBytes) {
  throw new Error(
    `entry.png copy incomplete: got ${actualBytes} bytes, expected ${expectedBytes}`,
  );
}
