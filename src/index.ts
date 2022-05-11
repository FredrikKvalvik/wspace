#! /usr/bin/env node

import {
  ls,
  findByIndex,
  findByName,
  openEditor,
  isMultipleFlags,
} from "./utils.js";
import {
  getAllWorkSpaces,
  getWsData,
  updateList,
  writeToDataWs,
} from "./generateList.js";
import config from "../config.js";
import { openUrls, updateUrlsHelper } from "./url.js";

import Yargs from "yargs";

const handleLs = () => {
  updateList();
  ls();
  process.exit(0);
};

const argv = Yargs(process.argv.slice(2))
  .usage("Usage: $0 <workspace> [options]")
  .usage("Usage: $0 <command>")
  .command("ls", "list all workspaces", handleLs)
  .demandCommand()
  .example("$0 cool-project", 'Open workspace for "cool-project"')
  .example(
    "$0 cool-project -a https://google.com https://github.com",
    'add the links to project so they open when you open cool-project workspace"'
  )
  .boolean("a")
  .describe("a", "wspace <workspace> -a url1 url2... \nAdds links to workspace")
  .boolean("r")
  // r has not been implemented yet. just a placeholder
  .describe(
    "r",
    "wspace <workspace> -r url1 url2... \nremoves links to workspace"
  )
  .boolean("b")
  .describe(
    "b",
    "wspace <workspace> -b \nopens saved links for the selected workspace"
  )
  .boolean("i")
  .describe("i", "wspace <workspace> -i \nshows all data saved for <workspace>")
  .help("h")
  .alias("h", "help").argv;

// stop execution if multiple flags are used
if (isMultipleFlags(argv)) {
  console.log("one flag at a time plz");
  process.exit(0);
}
// this will either be a workspace or undefined
let targetWs;

if (typeof argv._[0] === "number") {
  const ws = findByIndex(argv._[0]);
  if (ws === undefined) {
    console.log("could not find ws as index");
    process.exit(0);
  }
  targetWs = ws;
}
if (typeof argv._[0] === "string") {
  const ws = findByName(argv._[0]);
  if (ws === undefined) {
    console.log("could not find ws as string");
    process.exit(0);
  }
  targetWs = ws;
}
// one last check to try to cover unknown edge cases
if (!targetWs) {
  console.log("could not find ws at all");
  process.exit(0);
}

// we now know that we have found a workspace

if (argv.i) {
  const { workSpace, path, links } = targetWs;
  console.log(`
Workspace name:
- ${workSpace}
Path:
- ${path}`
  );
  if (links.length) {
    console.log("Links:");
    links.forEach((link) => console.log("-", link));
  }
  process.exit(0);
}

// If one of these flags are called, do operation and exit.
if (argv.a) {
  updateUrlsHelper({ argv, targetWs }, "add");
}
if (argv.r) {
  updateUrlsHelper({ argv, targetWs }, "remove");
}

openEditor(targetWs.path);
console.log("project is at:\n", targetWs.path);
if (argv.b) {
  openUrls(targetWs.links);
}

/* 
Dette må gjøres:
  - gi mulighet til å fjerne lenker fra listen.
  - viser hva lenker som hører til en ws
    - det kan vel gjøres med et -l flagg når man kaller på en ws
  - på sikt, rydde i koden
*/
