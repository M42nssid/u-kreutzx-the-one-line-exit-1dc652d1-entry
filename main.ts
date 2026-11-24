// The One-Line Exit — entry program.
// Writes one resignation line to /output/entry.txt. Deterministic:
// no clock, no randomness, no network — the same bytes every run.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I hereby resign as your fortune teller, effective immediately — but you already knew that, which is exactly why I'm leaving.";

// The gate only lets through a single line of 1 to 140 characters that
// is not blank, so refuse to write anything that would fail it.
function gate(line: string): void {
  if (line.includes("\n") || line.trim().length === 0 || line.length > 140) {
    throw new Error("entry line fails the gate: must be one line of 1-140 chars");
  }
}

gate(LINE);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");

// Read the file back: a short or corrupted write must never pass
// silently, so fail loudly unless the bytes on disk are the line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE + "\n") {
  throw new Error("written entry does not match the intended line");
}
