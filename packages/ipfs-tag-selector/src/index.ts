
/**
 * 
 * @param className 
 * @returns 
 */
export const getIPFSTagByClassName = (className = "ipfs-tag"): HTMLCollection => {
  return document.getElementsByClassName(className);
}


export const isIPFSTag = (ipfsTag: HTMLElement): Boolean => {
  return ipfsTag.classList.contains("ipfs-tag")
}
