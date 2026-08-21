import { getStats } from "@/utils/getStats";
import fs from "node:fs";
import path from "path";

export function* recursiveFileIterator(rootDirectory: string) {
  const stack: Array<string> = [rootDirectory];

  while (stack.length > 0) {
    const curr: string = stack.pop()!;
    const stats = getStats(curr);

    if (!stats) {
      console.error(`Could not stat ${curr}`);
      continue;
    }

    if (stats.isFile()) {
      yield curr;
    } else if (stats.isDirectory()) {
      const paths = fs.readdirSync(curr).map((name) => path.join(curr, name));
      stack.push(...paths);
    } else if (stats.isSymbolicLink()) {
      const target = fs.readlinkSync(curr);
      //curr is the link, we want to resolve from the current directory.
      path.resolve(curr, "../", target);
    }
  }

  return;
}
