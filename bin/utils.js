const fs = require("fs")
const { exec } = require("child_process")

const config = require("../config")

const getAllWorkSpaces = function (dirPath, workSpaces = [], currentFolder = null) {
  files = fs.readdirSync(dirPath).filter(file => file !== "node_modules")

  let workSpacesList = workSpaces
  if (files.includes("package.json" || "composer.json" || ".wspace")) {
    workSpacesList.push({
      path: dirPath,
      workPlace: currentFolder
    })
  } else {
    files.forEach((file) => {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        getAllWorkSpaces(dirPath + "/" + file, workSpacesList, file)
      }
    })
  }

  return workSpacesList
}

const findWorkSpace = (wpList, wpName) => {
  const ws = wpList.find(workPlace => workPlace.workPlace == wpName)
  return ws
}

const openEditor = ({ path }) => {
  const options = {
    shell: "/bin/zsh",
    windowsHide: "true",
  }
  // exec(`${config.defaultEditor} ${workPlace}`)
  exec(`${config.defaultEditor} ${path}`, options)
}

module.exports = {
  getAllWorkSpaces,
  openEditor,
  findWorkSpace,
}