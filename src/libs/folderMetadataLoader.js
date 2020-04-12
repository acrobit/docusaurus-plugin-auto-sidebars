const path = require('path');
const yaml = require('js-yaml')
const {fileContent} = require('./ioUtils')

/**
 * Converts yamlObject to array of normalized folderInfo object
 * folderNameWithPath:{
 *  name: ...
 *  order: ...
 * }
 * @param {yamlObject} yamelFolders 
 */
function toFlattenFolders(yamelFolders, parentFolder = "") {
    let result = [];

    yamelFolders.forEach((folderEntry, order) => {
        var key = Object.keys(folderEntry)[0];
        var value = folderEntry[key];

        let title = typeof folder === "string" ? value : value[0];
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


function loadFolderMetadata()
{
    var yamlContent = fileContent('sidebars.yaml');
    if(!yamlContent)
        return [];
    
        return toFlattenFolders(yaml.safeLoad(yamlContent)||[]);
}


module.exports = {
    loadFolderMetadata
};


