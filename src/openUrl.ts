import { exec } from "child_process"

// this assumes all elements in the array are valid url strings
// not to validate the strings at some time before this
const openUrls = (links:Array<String>) => {
  const linkString = links.join(" ")
  // need to iterate over the array and return
  // a string with all links seperated with blank space
  exec(`open ${linkString}`)
}