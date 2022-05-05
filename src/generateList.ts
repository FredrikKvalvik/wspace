import * as fs from "fs";
import config from "../config.js";

export const getWorkSpaces = (
  dirPath,
  workSpaces: wsList = [],
  currentFolder: string | null = null
) : wsList => {
  const files = fs
    .readdirSync(dirPath)
    .filter((file) => file !== "node_modules");

  const workSpacesList: wsList = workSpaces;
  if (files.includes("package.json" || "composer.json" || ".wspace")) {
    workSpacesList.push({
      path: dirPath,
      workSpace: currentFolder,
      links: []
    });
  } else {
    files.forEach((file) => {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        getWorkSpaces(dirPath + "/" + file, workSpacesList, file);
      }
    });
  }

  return workSpacesList;
};
export const getAllWorkSpaces = () : wsList => {
  // this allows us to easily have multiple folders the traverse
  const fullList: wsList = [];
  config.workspaceDirectories.forEach((ws) =>
    fullList.push(...getWorkSpaces(ws))
  );
  return fullList;
};

export const getWsData = () : wsList => {
  // find file and read. parse the json into js object
  // wsData is where the config for all workspaces lives
  return JSON.parse(fs.readFileSync(config.wsDataPath, "utf8"));
};

export const writeToDataWs = (data) => {
  const jsonData = JSON.stringify(data);
  fs.writeFileSync(config.wsDataPath, jsonData);
};

export const updateList = () => {
  const generatedWsList: wsList = getAllWorkSpaces();
  const data: wsList = getWsData();

  let hasChanged = false;
  // look for current ws from the generated list
  // in saved document. If found, do nothing,
  // if not, add the ws from generated list to data
  // to be added to document
  generatedWsList.forEach((foundWs: workspace) => {
    const isFound = data.find((targetWs: workspace) => {
      return targetWs?.workSpace === foundWs.workSpace;
    });
    // return early if ws already exits in wsData.json
    if (isFound === undefined) {
      data.push(foundWs);
      console.log(`added ${foundWs.workSpace} to list`);
      hasChanged = true;
    }
    // dont change anything because there might be
    // additional data on the object
  });
  writeToDataWs(data);
  hasChanged
    ? console.log("list has been updated")
    : console.log("already up to date");
};
