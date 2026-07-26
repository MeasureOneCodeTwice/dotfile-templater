import { ConfigBuilder } from './ConfigBuilder'
import { ArgumentsParser, type Arguments } from './ArgumentsParser'
import type { Config } from './Config'
import { loadJSONFile } from '@/utils/loadJSONFile'
import { wrapError } from '@/utils/wrapError'

export class ConfigGenerator {
    constructor() {}

    generate(CLIArguments: string[]): Config {

        const args: Arguments = new ArgumentsParser().load(CLIArguments);

        let values: Object;
        try {
            values = loadJSONFile(args.valuesFile);
        } catch(e) {
            throw wrapError(e, `Could not load values file ${args.valuesFile}`);
        }

        const configBuilder = new ConfigBuilder()
        .setValues(values)
        .setTemplateDirectory(args.templateDirectory)
        .setOutputDirectory(args.outputDirectory);


        try {
            return configBuilder.build();
        } catch(e) {
            throw wrapError(e, "Could not build config");
        }
    }
}
