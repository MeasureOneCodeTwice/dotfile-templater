import fs, { type Stats } from 'node:fs';
import { wrapError } from '@/utils/wrapError'
import { valuesConfigSchema, type ValuesConfig, type Config } from './Config'

export class ConfigBuilder {

    #valuesConfig:      Object | undefined = undefined;
    #templateDirectory: string | undefined = undefined;
    #outputDirectory:   string | undefined = undefined; 

    constructor() {}

    setValues(values: Object): ConfigBuilder {
        this.#valuesConfig = values;
        return this;
    }

    setTemplateDirectory(path: string): ConfigBuilder {
        this.#templateDirectory = path;
        return this;
    }

    setOutputDirectory(path: string): ConfigBuilder {
        this.#outputDirectory = path;
        return this;
    }

    build(): Config {
        if(this.#valuesConfig === undefined) 
            throw Error("Must provide values before calling build.")

        if(this.#outputDirectory === undefined) 
            throw Error("Must provide outputDirecotry before calling build");

        if(this.#templateDirectory === undefined) 
            throw Error("Must provide templateDirecotry before calling build"); 

        this.#assertDirectory(this.#templateDirectory);
        this.#assertDirectory(this.#outputDirectory);
        return {
            ...this.#parseValues(this.#valuesConfig),
            templateDirectory: this.#templateDirectory,
            outputDirectory: this.#outputDirectory
        }
    }

    #parseValues(valuesConfig: Object): ValuesConfig {
        try {
            return valuesConfigSchema.parse(valuesConfig);
        } catch(e) {
            throw wrapError(e, "Values are of an invalid schema");
        }
    }

    #assertDirectory(path: string) {
        let stats: Stats
        try {
            stats = fs.lstatSync(path, { throwIfNoEntry: true });
        } catch (e) {
            throw wrapError(e, `Could not stat ${path}`);
        }
        if (! (stats.isDirectory()) ) throw Error(`${path} is not a directory`)
    }
}
