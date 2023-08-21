import type { UnixFS } from '@helia/unixfs'
import type { CID } from 'multiformats/cid'

//
export default class HTMLIPFSConfigElement extends HTMLElement {

  static unixFs: UnixFS | null = null;

  constructor() {
    super(); 
  }

  getIPFSInstance(): UnixFS | null {
    return HTMLIPFSConfigElement.unixFs;
  }
}
