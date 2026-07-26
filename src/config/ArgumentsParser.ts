export type Arguments = {
    valuesFile: string,
    templateDirectory: string,
    outputDirectory: string
};

export class ArgumentsParser {
    constructor() {}

    load(CLIArguments: string[]): Arguments {
        const args = CLIArguments.slice(2);
        return {
            valuesFile: args[0] ?? "values.json",
            templateDirectory: args[1] ?? "template",
            outputDirectory: args[2] ?? "."
        }
    }
}
