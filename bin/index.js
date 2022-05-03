#! /usr/bin/env node

const utils = require("./utils")
const config = require("../config")

var argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('Usage: $0 <command> [options]')
    .command("ls", "list all worplaces")
    .demandCommand()
    .example('$0 cool-project', 'Open workspace for "cool-project"')
    .boolean('b')
    .describe('b', 'stop open-browser function')
    .help('h')
    .alias('h', 'help')
    .argv;

const wsList = utils.getAllWorkSpaces(config.workplaceDirectory)

const ls = (wsList) => {
  console.log("==========")
  wsList.forEach(ws => {
    console.log("Name:", ws.workSpace)
    console.log("Path:", ws.path)
    console.log("==========")
  })
}


  switch(argv._[0]){
    case "ls":
      ls(wsList)
      process.exit(0)

    default:
      const ws = wsList.find(ws => ws.workSpace == argv._[0])
      console.log(ws.workSpace)
      console.log(ws)
      if(ws){
        utils.openEditor(ws.path)
        process.exit(0)
      }
  }
  console.log(argv)


