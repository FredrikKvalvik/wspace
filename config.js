const config = {
  // the root directory for all workplaces. Has to be an absolute path.
  workspaceDirectories: [
    process.env.HOME + "/netlife",
    process.env.HOME + "/repos"
  ],
  // uses the shell command for the editor, so put that here.
  defaultEditor: "code"
}

export default config