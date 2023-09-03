import { CID } from 'multiformats/cid'
import MediaTyper from 'media-typer';
import { unixfs } from '@helia/unixfs';

import type { UnixFS } from '@helia/unixfs'

//
export default class HTMLIPFSUnixFsElement extends HTMLElement {

  private _unixFs: UnixFS | null = null;

  constructor() {
    super();

    if(!!window.helia) {
      this._unixFs = unixfs(window.helia)
    } else {
      window.addEventListener('heliaInitialized', (event) => {
        console.debug('heliaInitialized');
        this.unixfsInitialized();
        window.removeEventListener('heliaInitialized', () => {});
      });
    }
  }



  // cid から blob を取得したら呼ばれる
  async ipfsCatCallback(blob: Blob, options = {}) {
    throw new Error('need override blobFetchedCallback')
  }

  // 
  async cat(cid: CID, mediatype: string) {
    if(null === this._unixFs)                 throw new Error("unixfs is not initialized")
    if(false === this.ipfsReady())            throw new Error("ipfs is not ready");
    if(false === MediaTyper.test(mediatype))  throw new Error("type is invalid");

    console.debug(`cat ${cid.toString()} as ${mediatype}`);

    const content = [];
    for await (const chunk of this._unixFs.cat(cid)) {
      content.push(chunk);
    }
    if (content.length === 0) throw new Error("No content found for the given CID");

    const blob = new Blob(content, { type: mediatype });
    this.ipfsCatCallback(blob, { type: mediatype })
  }

  //
  // private
  //

  private unixfsInitialized() {
    this._unixFs = unixfs(window.helia)
    let event = new Event('HTMLIPFSUnixFsElement::unixfsInitialized');
    window.dispatchEvent(event);
  }

  private ipfsReady(): boolean {
    return window.helia?.libp2p?.isStarted() || false;
  }
}