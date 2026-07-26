import z from 'zod';

export const valuesConfigSchema = z.object({
    template: z.object({
        startTag: z.string(),
        endTag: z.string()
    }),
    values: z.object({}).catchall(z.string())
});

export type ValuesConfig = z.infer<typeof valuesConfigSchema>;
export type Config = ValuesConfig & {
    templateDirectory: string,
    outputDirectory: string
}
