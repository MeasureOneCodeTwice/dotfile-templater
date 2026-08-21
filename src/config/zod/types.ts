import z from "zod";
import { getStats } from "@/utils/getStats";

export const file = z.stringFormat("file", (path: string): true | never => {
  if (!getStats(path)?.isFile()) throw Error(`${path} is not a file`);
  return true;
});

export const directory = z.stringFormat(
  "file",
  (path: string): true | never => {
    if (!getStats(path)?.isDirectory())
      throw Error(`${path} is not a directory`);
    return true;
  },
);
