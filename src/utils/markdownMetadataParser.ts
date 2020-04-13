const  yaml = require('js-yaml') 

function getYamlContentFromMarkdown(markdownContent:string)
{
    var yamlContent=''
    var iFrom = markdownContent.indexOf('---');
    if(iFrom>=0){
        iFrom+=3;
        var iTo = markdownContent.indexOf('---', iFrom);
        if(iTo<0) return "";
        yamlContent = markdownContent.substring(iFrom, iTo);
    }

    return yamlContent;
}

export function parseMarkdownMetadata(markdownContent:string|null)
{
    if(markdownContent===null)
        return;
    var yamelPart = getYamlContentFromMarkdown(markdownContent);
    if(!yamelPart) return {};
    return yaml.safeLoad(yamelPart)

}

