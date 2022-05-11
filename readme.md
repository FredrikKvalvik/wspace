# wspace

Simple CLI that make working on different project a little easier.

## what

wspace is a simple CLI i made. Its purpose is to make it a little easier to keep track of different projects and to make contextswitching easier. It creates a list of all folders with a package.json or composer.json and saves them in a json object with a name, path, and empty array of urls. 

Urls are saved so you can add project-specific urls like the github-repo, clickup/jira/whatever, docs-page etc to the a workspace. No more need to look for them wherever they are saved.

## important things to know

* only works on mac
* Its installed as a global npm module, so it only works in the node version you installed it in
* all the commands can be found by running `wspace -h`

## how to set up
1.  clone the repo
1.  run `npm install` in the root of the repo
1.  open the config.js file and fill out with correct data
1.  run `npm run build`
1.  run `wspace ls` to see if everything works properly