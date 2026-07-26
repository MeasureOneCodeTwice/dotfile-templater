import { ConfigGenerator } from "@/config/ConfigGenerator"
import type { Config } from "@/config/Config"
import { wrapError } from "@/utils/wrapError"
function main() {
    let config: Config;
    try {
        config = new ConfigGenerator().generate(process.argv);
    } catch(e) {
        throw wrapError(e, "Failed to generate config")
    }

    console.log(config)
}

try {
    main();
} catch (e) {
    if(e instanceof Error)
        console.error(e.message);
    else
        console.error(e);
}

