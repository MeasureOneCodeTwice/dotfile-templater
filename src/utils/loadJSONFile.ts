import { wrapError } from '@/utils/wrapError'
import fs from 'node:fs'

export function loadJSONFile(filepath: string): Object {

    let fileContent: string;
    try { 
        fileContent = fs.readFileSync(filepath, { encoding: 'utf-8' });
    } catch (e) {
        throw wrapError(e, `Could not read file "${filepath}"`);
    }

    try {
       return JSON.parse(fileContent); 
    } catch (e) {
        throw wrapError(e, `Could not parse ${filepath} to JSON`);
    }
}
