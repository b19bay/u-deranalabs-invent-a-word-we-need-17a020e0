// cancelief — one invented English word and its one-line definition.
// Writes entry.txt (1-140 chars, single line) to MAKEFUN_OUTPUT_DIR.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "cancelief \u2014 the sudden joy when a meeting is canceled and the hour returns to you.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (ENTRY.length < 1 || ENTRY.length > 140) {
  console.error(`entry must be 1-140 characters, got ${ENTRY.length}`);
  process.exit(1);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  console.error("entry must be a single non-blank line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, ENTRY, "utf8");
// Read back and confirm the written file is byte-identical to the entry.
if (readFileSync(target, "utf8") !== ENTRY) {
  console.error("read-back mismatch: entry.txt differs from the entry");
  process.exit(1);
}
console.log(`wrote entry.txt (${ENTRY.length} characters)`);
