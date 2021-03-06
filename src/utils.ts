import { exec } from "child_process";

import config from "../config.js";
import { getWsData } from "./generateList.js";

export const findWorkSpace = (wpList, wpName) : workspace => {
  return wpList.find((ws : workspace) => ws.workSpace == wpName);
};

export const findByIndex = (index : number):workspace => {
  const wsData = getWsData()
  return wsData[index]
}
export const findByName = (name : string):workspace => {
const wsData = getWsData()
return findWorkSpace(wsData, name)
}

export const openEditor = (path : string) => {
  exec(`${config.defaultEditor} ${path}`);
};

export const ls = () => {
  const wsList:wsList = getWsData();
  wsList.forEach((ws, i) => {
    console.log(`${i} ${ws.workSpace}`);
  });
};

export const isMultipleFlags = (obj:argv):boolean => {
  // do this fancy thing to create a new object instead of a reference 
  const controlObj = {...obj}
  delete controlObj._
  delete controlObj.$0
  let count:number = 0
  for(const arg in controlObj){
    if(arg){
      count++
    }
  }
  return Boolean(count > 1)
}

