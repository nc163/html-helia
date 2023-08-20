
/**
 * 
 * @param className 
 * @returns 
 */
export const getHTMLIPFSElements = (className = "ipfs-tag"): HTMLCollection => {
  return document.getElementsByClassName(className);
}


export const isHTMLIPFSElement = (element: HTMLElement): Boolean => {
  return element.classList.contains("ipfs-tag")
}
