import { exec } from "child_process"

import config from "../config.js"
import { getWsData } from "./generateList.js"

export const findWorkSpace = (wpList, wpName) => {
  return wpList.find(ws => ws.workPlace == wpName)
}

export const openEditor = (path) => {
  exec(`${config.defaultEditor} ${path}`)
}

export const ls = () => {
  const wsList = getWsData()
  wsList.forEach(ws => {
    console.log("-", ws.workSpace)
  })
}