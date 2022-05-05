import { exec } from "child_process";
import validUrl from "valid-url";

export const validateUrl = (url: string): Boolean => {
  if (validUrl.isWebUri(url)) {
    return true;
  }
  return false;
};

export const validateUrlList = (links: string[]):string[] => {
  return links.reduce((list, link): string[] => {
    if (validateUrl(link)) {
      return [...list, link]
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