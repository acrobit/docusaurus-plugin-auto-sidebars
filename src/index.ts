
import fs from 'fs';
import path from 'path';
import {LoadContext, Plugin} from '@docusaurus/types';
import {PluginOptions} from './types';

const {generateSidebar} = require('./generator');

const _moduleFileTemplate=`
module.exports = {
    docs: $items$
};
`;

function generateSidebarFile(siteDir:string, docsRelPath: string )
{
  const docsPath = path.join(siteDir, docsRelPath);

  var sidebarItems = generateSidebar(docsPath);
  var data = _moduleFileTemplate.replace("$items$", JSON.stringify(sidebarItems, null, '    '));
  
  const sidebarPath = path.join(siteDir, '/sidebars.auto.js');
  fs.writeFileSync(sidebarPath, data, 'utf8');

}

const DEFAULT_OPTIONS: PluginOptions = {
  path: 'src/docs', // Path to docs on filesystem, relative to site dir.
};

export default function pluginContentPages(
  context: LoadContext,
  opts: Partial<PluginOptions>,
): Plugin<null> {
  const options = {...DEFAULT_OPTIONS, ...opts};

  generateSidebarFile(context.siteDir, options.path);

  return {
    name: 'docusaurus-plugin-auto-sidebars',
  };
}
