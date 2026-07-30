import { parseConfig, type Config } from "@/config/config"
import { wrapError } from "@/utils/wrapError"
function main() {
    let config: Config;
    try {
        config = parseConfig();
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

