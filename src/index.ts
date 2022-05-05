#! /usr/bin/env node

import { ls, findByIndex, findByName, openEditor } from "./utils.js";
import {
  getAllWorkSpaces,
  getWsData,
  updateList,
  writeToDataWs,
} from "./generateList.js";
import config from "../config.js";
import { openUrls, validateUrlList } from "./url.js";

import Yargs from "yargs";

const handleLs = () => {
  updateList();
  ls();
  process.exit(0);
};

const argv = Yargs(process.argv.slice(2))
  .usage("Usage: $0 <command> [options]")
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
  .describe("r", "wspace <workspace> -r url1 url2... \nremoves links to workspace")
  .boolean("b")
  .describe("b", "wspace <workspace> -b \nopens saved links for the selected workspace")
  .help("h")
  .alias("h", "help").argv;

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
if (targetWs === undefined) {
  console.log("could not find ws at all");
  process.exit(0);
}

// we now know that we have found a workspace

if(argv.a && argv.r){
  console.log("one flag at a time plz")
}

if (argv.a || argv.r) {
  //find and validate links
  const links = argv._.slice(1);
  const validLinks = validateUrlList(links);
  // we mutate this object and then write it to wsData.json
  const wsData = getWsData();
  const targetIndex: number = wsData.findIndex(
    (obj): boolean => obj.workSpace === targetWs.workSpace
  );

  if (!validLinks) {
    console.log("no valid urls");
    process.exit(0);
  }

    const updatedLinks: string[] = validLinks.reduce((list, link) => {
      if (list.includes(link)) {
        console.log(link, " is already in the list");
        return list;
      } else {
        console.log(`added ${link} to list`);
        return [...list, link];
      }
    }, wsData[targetIndex].links);

  wsData[targetIndex].links = updatedLinks;
  writeToDataWs(wsData);

  process.exit(0)
}

openEditor(targetWs.path);
console.log("project is at:\n",targetWs.path)
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