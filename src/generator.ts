import {parseMarkdownMetadata} from "./libs/markdownMetadataParser.js";
import {arrayToObject} from './libs/objectUtils';
import {loadFolderMetadata} from './libs/folderMetadataLoader';
import {fileContent} from './libs/ioUtils';
import {readdirSync, Dirent} from 'fs';
import path from 'path';

// Load folder metadata from `sidebars.yaml`
const folders = loadFolderMetadata();
const foldersDic = arrayToObject(folders, 'path');
export function generateSidebar(docsPath:string, root = ``) {

    let items:any[] = [];

    var entries=readdirSync(path.join(docsPath,root), {
        withFileTypes: true
    });

    sortFiles(entries).forEach(function (dirent:Dirent) {
        let sidebarItem;
        const relDocPath = (root.length ? root + '/' : '');

        if (dirent.isDirectory()) { 
            // sidebarItem is category
            var folder = foldersDic[dirent.name]
            sidebarItem = {
                type: 'category',
                label: folder?folder.title:dirent.name,
                items: generateSidebar(docsPath, relDocPath + dirent.name)
            };

        } else { 
            // sidebarItem is md file
            
            if (dirent.name.indexOf('.md') < 0) return;

            const filename = relDocPath + dirent.name;
            const filePath = path.join(docsPath, dirent.name);
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

