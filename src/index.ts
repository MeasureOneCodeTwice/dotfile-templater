import { parseConfig, type Config } from "@/config";
import { ApplicationError } from "@/utils/applicationError";
import { recursiveFileIterator } from "@/templater/recursiveFileIterator";

function main() {
  let config: Config;
  try {
    config = parseConfig();
  } catch (e) {
    const error = ApplicationError.fromError(e);
    throw error.annotate("Failed to generate config");
  }

  const files = recursiveFileIterator(config.templateDirectory);
  for (const file of files) {
    console.log(file);
  }
}

try {
  main();
} catch (e) {
  if (e instanceof Error) console.error(e.message);
  else console.error(e);
}
