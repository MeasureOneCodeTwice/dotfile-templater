import fs, { type Stats } from "node:fs";

export function getStats(path: string): Stats | undefined {
  let stats: Stats | undefined = undefined;
  try {
    stats = fs.lstatSync(path, { throwIfNoEntry: true });
  } catch (e) {}

  return stats;
}
