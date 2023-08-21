import type { UnixFS } from '@helia/unixfs'

//
export default class HTMLIPFSConfigElement extends HTMLElement {

  static unixFs: UnixFS | null = null;

  constructor() {
    super(); 
  }

  getIPFSInstance(): UnixFS | null {
    return HTMLIPFSConfigElement.unixFs;
  }

  static dispatchUnixFsUpdated() {
    const event = new CustomEvent('HTMLIPFSConfigElement::unixfsUpdated', {
      detail: { unixFs: HTMLIPFSConfigElement.unixFs },
      bubbles: true,
      cancelable: true
    });

    // イベントを発火
    document.dispatchEvent(event);
  }
}
