// import type { IPFS } from 'ipfs-core';

export default class HTMLIPFSConfigElement extends HTMLElement {

  static ipfsInstance: IPFS | null = null;

  constructor() {
    super(); 
  }

  async fetchBlob(cid: string, mediatype: string): Promise<Blob | null>  {

    const ipfs = HTMLIPFSConfigElement.ipfsInstance;
    if(ipfs === null) return null;

    /**
     * ipfs.cat
     * https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfscatipfspath-options
     * https://discuss.ipfs.tech/t/how-to-ipfs-dag-get-the-image-in-browser/15938/3
     */
    const content = [];

    for await (const chunk of ipfs.cat(cid)) {
      content.push(chunk);
    }
  
    return new Blob(content, { type: mediatype });
  }

  getIPFSInstance(): IPFS | null {
    return HTMLIPFSConfigElement.ipfsInstance;
  }
}
