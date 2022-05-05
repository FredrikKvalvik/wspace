#! /usr/bin/env node

import { ls, findByIndex, findByName, openEditor } from "./utils.js";
import {
  getAllWorkSpaces,
  getWsData,
  pushWsToJSON,
  writeToDataWs,
} from "./generateList.js";
import config from "../config.js";
import { openUrls, validateUrlList } from "./url.js";

import Yargs from "yargs";

const handleLs = () => {
  ls();
  process.exit(0);
};
const handleUpdate = () => {
  pushWsToJSON();
  process.exit(0);
};

const argv = Yargs(process.argv.slice(2))
  .usage("Usage: $0 <command> [options]")
  .command("ls", "list all workspaces", handleLs)
  .command("update", "update ws list", handleUpdate)
  .demandCommand()
  .example("$0 cool-project", 'Open workspace for "cool-project"')
  .example(
    "$0 cool-project -a https://google.com https://github.com",
    'add the links to project so they open when you open cool-project workspace"'
  )
  .boolean("a")
  .describe("a", "add links to the project")
  .boolean("b")
  .describe("b", "opens saved urls for the selected ws")
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

if (argv.a) {
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
if (argv.b) {
  openUrls(targetWs.links);
}
