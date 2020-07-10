import fs from "fs";
import path from "path";
import { LoadContext, Plugin } from "@docusaurus/types";
import { PluginOptions } from "./types";

import { generate } from "./generator";

const _moduleFileTemplate = `
module.exports = {
  docs: $items$
};
`;

function generateSidebarFile(
  siteDir: string,
  docsRelPath: string,
  customSidebarPath: string
) {
  const docsPath = path.join(siteDir, docsRelPath);

  var sidebarItems = generate(docsPath);
  var data = _moduleFileTemplate.replace(
    "$items$",
    JSON.stringify(sidebarItems, null, "    ")
  );

  const sidebarPath = path.join(siteDir, customSidebarPath);
  fs.writeFileSync(sidebarPath, data, "utf8");
}

const DEFAULT_OPTIONS: PluginOptions = {
  path: "docs", // Path to docs on filesystem, relative to site dir.
  sidebarPath: "sidebars.auto.js", // Path to generated sidebar path.
};

export default function pluginContentPages(
  context: LoadContext,
  opts: Partial<PluginOptions>
): Plugin<null> {
  const options = { ...DEFAULT_OPTIONS, ...opts };

  generateSidebarFile(context.siteDir, options.path, options.sidebarPath);

  return {
    name: "docusaurus-plugin-auto-sidebars",
    getPathsToWatch() {
      const contentPath = path.join(
        context.siteDir,
        options.path,
        "sidebars.yaml"
      );

      return [`${contentPath}`];
    },
  };
}
