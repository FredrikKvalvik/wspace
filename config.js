const config = {
  // the root directory for all workplaces. Has to be an absolute path.
  workspaceDirectories: [
    process.env.HOME + "/work",
    process.env.HOME + "/notwork"
  ],
  // uses the shell command for the editor, so put that here.
  defaultEditor: "code",
  // where the wsData.json is located
  wsDataPath: process.env.HOME + "/wspace/" + "config.js"
}

export default config