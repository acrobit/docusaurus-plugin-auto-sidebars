// import path from 'path';
// import * as yaml from 'js-yaml';
const  yaml = require("js-yaml");
import path from 'path';

import {fileContent} from './ioUtils';

/**
 * Converts yamlObject to array of normalized folderInfo object
 * folderNameWithPath:{
 *  name: ...
 *  order: ...
 * }
 * @param {yamlObject} yamelFolders 
 */
function toFlattenFolders(yamelFolders:any[], parentFolder = "") {
    let result:any[] = [];

    yamelFolders.forEach((folderEntry, order) => {
        var key = Object.keys(folderEntry)[0];
        var value = folderEntry[key];

        let title = typeof value === "string" ? value : value[0];
        if (typeof title === "object") {
            var titleKey = Object.keys(title)[0];
            order = title[titleKey] || order
            title = titleKey;
        }
        const flattenFolder = {
            path: parentFolder + key,
            title,
            order
        };
        result.push(flattenFolder);
        if (Array.isArray(value)) {
            const [, ...rest] = value;
            if (rest.length)
                result = result.concat(toFlattenFolders(rest, flattenFolder.path + "/"));
        }

    });

    return result;
}


export function loadMetadata(docsPath:string)
{
    const sidebarsYamlPath = path.join(docsPath, "sidebars.yaml");
    var yamlContent = fileContent(sidebarsYamlPath);
    if(!yamlContent)
        return [];
    
    return toFlattenFolders(yaml.safeLoad(yamlContent)||[]);
}



