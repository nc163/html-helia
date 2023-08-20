import helia from "helia"
import HTMLIpfs from "@html-ipfs/core"

import type { Helia } from '@helia/interface';
import type { CID } from 'multiformats'

import { getHTMLIPFSElements, isHTMLIPFSElement } from "./html-ipfs-tag-selector"

module HTMLIPFS {
  export class HTMLIPFSTag {

    helia
    constructor(helia: Helia, options: {}) {
      this.helia = helia
    }

    // Your methods
    public set(element: HTMLElement, helia: Helia, cid: CID) {
      if(false === isHTMLIPFSElement(element)) return false;

      let fs = helia.getFS()
      let retval = HTMLIpfs(fs, element)
      
    }
    
    public setAll(cid: string) {
      // Your code
    }
  }
}

export default HTMLIPFS