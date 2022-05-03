import fs from "fs"
import { exec } from "child_process"

import config from "../config.js"

const getWorkSpaces = function (dirPath, workSpaces = [], currentFolder = null) {
  const files = fs.readdirSync(dirPath).filter(file => file !== "node_modules")

  let workSpacesList = workSpaces
  if (files.includes("package.json" || "composer.json" || ".wspace")) {
    workSpacesList.push({
      path: dirPath,
      workSpace: currentFolder
    })
  } else {
    files.forEach((file) => {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        getWorkSpaces(dirPath + "/" + file, workSpacesList, file)
      }
    })
  }

  return workSpacesList
}
export const getAllWorkSpaces = wsList => {
  const fullList = []
  wsList.forEach(ws => fullList.push(...getWorkSpaces(ws)))
  return fullList
}

export const findWorkSpace = (wpList, wpName) => {
  return wpList.find(ws => ws.workPlace == wpName)
}

export const openEditor = (path) => {
  const options = {
    shell: "/bin/zsh",
    windowsHide: "true",
  }
  // exec(`${config.defaultEditor} ${workPlace}`)
  exec(`${config.defaultEditor} ${path}`, options)
}

export const ls = () => {
  const wsList = getAllWorkSpaces(config.workspaceDirectories)
  console.log("==========")
  wsList.forEach(ws => {
    console.log("Name:", ws.workSpace)
    console.log("Path:", ws.path)
    console.log("==========")
  })
}