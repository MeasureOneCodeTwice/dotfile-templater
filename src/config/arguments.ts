import z from "zod";
import commandLineArgs from "command-line-args";
import { file, directory } from "./zod/types";

const argumentDefinitions = [
  { name: "valuesFile", type: String, defaultValue: "values.json" },
  { name: "templateDirectory", type: String, defaultValue: "./template" },
  { name: "outputDirectory", type: String, defaultValue: "./rendered" },
];

const argumentsSchema = z.object({
  valuesFile: file,
  templateDirectory: directory,
  outputDirectory: directory,
});
export type Arguments = z.infer<typeof argumentsSchema>;

export function parseArguments(): Arguments {
  return argumentsSchema.parse(commandLineArgs(argumentDefinitions));
}
