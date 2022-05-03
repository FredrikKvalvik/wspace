import { exec } from "child_process"

import config from "../config.js"
import { getAllWorkSpaces } from "./generateList.js"

export const findWorkSpace = (wpList, wpName) => {
  return wpList.find(ws => ws.workPlace == wpName)
}

export const openEditor = (path) => {
  exec(`${config.defaultEditor} ${path}`)
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