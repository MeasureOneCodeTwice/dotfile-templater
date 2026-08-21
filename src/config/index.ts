import { loadJSONFile } from "@/utils/loadJSONFile";
import { ApplicationError } from "@/utils/applicationError";
import { parseArguments, type Arguments } from "./arguments";
import { parseValuesConfig, type ValuesConfig } from "./values";

export type Config = Arguments & ValuesConfig;

export function parseConfig(): Config {
  const args: Arguments = parseArguments();

  let valuesConfigRaw;
  try {
    valuesConfigRaw = loadJSONFile(args.valuesFile);
  } catch (e) {
    throw ApplicationError.fromError(e).annotate(
      `Could not parse values file "${args.valuesFile}"`,
    );
  }
  const values: ValuesConfig = parseValuesConfig(valuesConfigRaw);

  return { ...args, ...values };
}
