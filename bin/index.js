#! /usr/bin/env node

const yargs = require("yargs");
const utils = require("./utils")

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


  if(yargs.argv._[0] == null){
    utils.log("hallais")
  }

