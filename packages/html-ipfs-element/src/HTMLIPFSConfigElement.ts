import { createHelia } from 'helia';

import type { UnixFS } from '@helia/unixfs'

/*
  heliaへのアクセスの抽象化
*/
export default class HTMLIPFSConfigElement extends HTMLElement {

  constructor() {
    super();

    window.addEventListener('heliaInitialized', () => {
      window.helia.libp2p.addEventListener('start', this.dispatchLibp2pStart);
      window.helia.libp2p.addEventListener('stop', this.dispatchLibp2pStop);
    });
  }

  /**
   * event
   */

  dispatchLibp2pStart() {
    const event = new CustomEvent('HTMLIPFSConfigElement::libp2p::start', {
      detail: { 
        helia: window.helia,
        libp2p: window.helia.libp2p,
      },
      bubbles: true,
      cancelable: true
    });

    document.dispatchEvent(event);
  }

  dispatchLibp2pStop() {
    const event = new CustomEvent('HTMLIPFSConfigElement::libp2p::stop', {
      detail: { 
        helia: window.helia,
        libp2p: window.helia.libp2p,
      },
      bubbles: true,
      cancelable: true
    });

    document.dispatchEvent(event);
  }

  // deprecated
  static dispatchUnixFsUpdated() {
    // const event = new CustomEvent('HTMLIPFSConfigElement::unixfsUpdated', {
    //   detail: { unixFs: HTMLIPFSConfigElement.unixFs },
    //   bubbles: true,
    //   cancelable: true
    // });

    // document.dispatchEvent(event);
  }

  // deprecated
  static dispatchUnixFsStatus() {
    // const event = new CustomEvent('HTMLIPFSConfigElement::unixfsUpdated', {
    //   detail: { unixFs: HTMLIPFSConfigElement.unixFs },
    //   bubbles: true,
    //   cancelable: true
    // });

    // document.dispatchEvent(event);
  }
}
