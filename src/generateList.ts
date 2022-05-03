import * as fs from "fs"
import config from "../config.js"

interface workspace {
  path: String;
  workSpace: String;
}

type wsList = [
  workspace
]

const getWorkSpaces = function (dirPath, workSpaces:wsList|[] = [], currentFolder = null) {
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

const generateJsonList = (wsList:wsList) => {

}