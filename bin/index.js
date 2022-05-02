#! /usr/bin/env node

const utils = require("./utils")
const config = require("../config")

const yargs = require("yargs");


const usage = "\nUsage: tran <lang_name> sentence to be translated";
const options = yargs
  .usage(usage)
  .option("l", {
    alias: "languages",
    describe: "List all supported languages.",
    type: "boolean",
    demandOption: false
  })
  .help(true)
  .argv;

const workPlaces = utils.getAllWorkSpaces("/Users/fredrikkvalvik/repos")
console.log(workPlaces)
utils.openEditor(utils.findWorkSpace(workPlaces, "craft-headless-test"))