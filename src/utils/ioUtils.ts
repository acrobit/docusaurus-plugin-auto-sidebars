import { readFileSync, existsSync} from 'fs';
// const path = require('path');

export function fileContent(fullPath:string):string|null {
    if(!existsSync(fullPath))
        return null;

    return readFileSync(fullPath, 'utf8');
}
