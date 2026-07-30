import z from 'zod'
import { wrapError } from "@/utils/wrapError";


const valuesConfigSchema = z.object({
    template: z.object({
        startTag: z.string(),
        endTag: z.string()
    }),
    values: z.object({}).catchall(z.string())
});
export type ValuesConfig = z.infer<typeof valuesConfigSchema>;

export function parseValuesConfig(config: Object): ValuesConfig {
  try {
    return valuesConfigSchema.parse(config);
  } catch (e) {
    throw wrapError(e, "Could not parse values config");
  }
}

