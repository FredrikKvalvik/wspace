const fs = require("fs")

const getAllWorkSpaces = function (dirPath, workSpaces = [], currentFolder = null) {
  files = fs.readdirSync(dirPath).filter(file => file !== "node_modules")

  let workSpacesList = workSpaces
  if (files.includes("package.json" || "composer.json")) {
    workSpacesList.push({
      dirPath,
      currentFolder
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

module.exports = {
  getAllWorkSpaces: getAllWorkSpaces
}