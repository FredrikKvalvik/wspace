#! /usr/bin/env node

import { ls, findByIndex, openEditor } from "./utils.js";
import { getAllWorkSpaces, pushWsToJSON } from "./generateList.js";
import config from "../config.js";

import Yargs from "yargs";

const argv = Yargs(process.argv.slice(2))
  .usage("Usage: $0 <command> [options]")
  .command("ls", "list all workspaces", () => ls())
  .command("update", "update ws list", () => pushWsToJSON())
  .demandCommand()
  .example("$0 cool-project", 'Open workspace for "cool-project"')
  .boolean("b")
  .describe("b", "stop open-browser function")
  .help("h")
  .alias("h", "help").argv;

if(argv._[0] === ("ls" || "update")){
  process.exit(0)
}

if(typeof argv._[0] === "number"){
  const ws = findByIndex(argv._[0])
  openEditor(ws.path)
}



// else{
//   console.log(`oof, could not find workspace '${argv._[0]}'`)
//   process.exit(0)
// }
