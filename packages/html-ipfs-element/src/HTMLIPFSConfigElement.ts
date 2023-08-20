import type { UnixFS } from '@helia/unixfs'
import type { CID } from 'multiformats/cid'

//
export default class HTMLIPFSConfigElement extends HTMLElement {

  static unixFs: UnixFS | null = null;

  constructor() {
    super(); 
  }

  async fetchBlob(cid: CID, mediatype: string): Promise<Blob | null>  {

    const unixFs = HTMLIPFSConfigElement.unixFs;
    if(unixFs === null) return null;

    /**
     * ipfs.cat
     * https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfscatipfspath-options
     * https://discuss.ipfs.tech/t/how-to-ipfs-dag-get-the-image-in-browser/15938/3
     */
    const content = [];

    for await (const chunk of unixFs.cat(cid)) {
      content.push(chunk);
    }
  
    return new Blob(content, { type: mediatype });
  }

  getIPFSInstance(): UnixFS | null {
    return HTMLIPFSConfigElement.unixFs;
  }
}
