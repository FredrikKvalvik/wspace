import { exec } from "child_process";

import config from "../config.js";
import { getWsData } from "./generateList.js";

export const findWorkSpace = (wpList, wpName) => {
  return wpList.find((ws) => ws.workPlace == wpName);
};

export const validateUrl = (url): Boolean => {
  let isValidUrl;
  try {
    isValidUrl = new Boolean(new URL(url));
  } catch (err) {
    isValidUrl = false;
  }
  return isValidUrl;
};

export const openEditor = (path) => {
  exec(`${config.defaultEditor} ${path}`);
};

export const ls = () => {
  const wsList:wsList = getWsData();
  wsList.forEach((ws, i) => {
    console.log(`${i} ${ws.workSpace}`);
  });
};
