import {parseMarkdownMetadata} from "./utils/markdownMetadataParser.js";
import {arrayToObject} from './utils/objectUtils';
import {loadMetadata} from './utils/sidebarsMetadataLoader';
import {fileContent} from './utils/ioUtils';
import {readdirSync, Dirent} from 'fs';
import path from 'path';

// Load folder metadata from `sidebars.yaml`
let folders:any[] = [];
let foldersDic:any = null ;

function generateSidebar(docsPath:string, root = ``) {

    let items:any[] = [];

    var entries=readdirSync(path.join(docsPath,root), {
        withFileTypes: true
    });

    sortFiles(entries).forEach(function (dirent:Dirent) {
        let sidebarItem;
        const relDocPath = (root.length ? root + '/' : '');

        if (dirent.isDirectory()) { 
            // sidebarItem is category
            var folder = foldersDic[relDocPath+dirent.name]
            sidebarItem = {
                type: 'category',
                label: folder?folder.title:dirent.name,
                items: generateSidebar(docsPath, relDocPath + dirent.name)
            };

        } else { 
            // sidebarItem is md file
            
            if (dirent.name.indexOf('.md') < 0) return;

            const filename = relDocPath + dirent.name;
            const filePath = path.join(docsPath, relDocPath, dirent.name);
            const content = fileContent(filePath);
            const metadata = parseMarkdownMetadata(content);
            
            if(metadata.sidebar === false) return;

            sidebarItem = metadata.id ? relDocPath + metadata.id : 
                filename.split('.').slice(0, -1).join('.');

        }
        items.push(sidebarItem);
    });

    return items; //names.sort().reverse();
}

export function generate(docsPath:string) {
    folders = loadMetadata(docsPath);
    foldersDic = arrayToObject(folders, 'path');

    return generateSidebar(docsPath);
}

function getFileOrder(dirent:any){
    var {name} = dirent;
    if(dirent.isDirectory() && foldersDic[name])
    { 
        return foldersDic[name].order;
    }
    var i =name.indexOf('.')
    if(i<0) return 0;

    var order = name.substring(0, i);
    return parseInt(order)|| name;
}

function sortFiles(files:Dirent[])
{
    return files.sort(function(a, b) {
        var oa = getFileOrder(a)
        var ob = getFileOrder(b)
        
        if (oa > ob) {
            return 1;
        }
        if (ob > oa) {
            return -1;
        }
        return 0;
    });
}

