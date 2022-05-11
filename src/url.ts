import { exec } from "child_process";
import validUrl from "valid-url";

type urlListAndWs = {
  targetWs: workspace;
  argv: argv;
};

type mode = "add" | "remove";

import {
  getAllWorkSpaces,
  getWsData,
  updateList,
  writeToDataWs,
} from "./generateList.js";

export const validateUrl = (url: string): Boolean => {
  if (validUrl.isWebUri(url)) {
    return true;
  }
  return false;
};

export const validateUrlList = (links: string[]): string[] => {
  return links.reduce((list, link): string[] => {
    if (validateUrl(link)) {
      return [...list, link];
    } else {
      console.log(`${link} is not a valid url`);
    }
  }, []);
};

// this assumes all elements in the array are valid url strings
// got to validate the strings at some time before this
export const openUrls = (links: string[]) => {
  const linkString: string = links.join(" ");
  // need to iterate over the array and return
  // a string with all links seperated with blank space
  exec(`open ${linkString}`);
};

// used as filter for updateUrlsHelper
const addUrls = ({ validLinks, currentList }) => {
  return validLinks.reduce((list, link) => {
    if (list.includes(link)) {
      console.log(link, " is already in the list");
      return list;
    } else {
      console.log(`added ${link} to list`);
      return [...list, link];
    }
  }, currentList)
};

// used as filter for updateUrlsHelper
const removeUrls = ({
  validLinks,
  currentList,
}) => {
    return currentList.filter((url) => {
      // return false if list includes link
      if(validLinks.includes(url)){
        console.log(`${url} has been removed`)
        return false
      }
      return true
    });
}

export const updateUrlsHelper = ({ targetWs, argv }:urlListAndWs, mode: mode) => {
  // remove the first entry because thats the workspace
  const links = argv._.slice(1);
  const validLinks = validateUrlList(links);
  // we mutate this object and then write it to wsData.json
  const wsData = getWsData();
  const targetIndex: number = wsData.findIndex(
    (obj): boolean => obj.workSpace === targetWs.workSpace
  );

  if (!validLinks) {
    console.log("no valid urls");
    process.exit(0);
  }

  let updatedLinks
  if(mode === "add"){
    updatedLinks = addUrls({ validLinks, currentList: wsData[targetIndex].links});
  } else if(mode === "remove"){
    updatedLinks = removeUrls({validLinks, currentList: wsData[targetIndex].links});
  }

  wsData[targetIndex].links = updatedLinks;
  writeToDataWs(wsData);

  process.exit(0);
};
