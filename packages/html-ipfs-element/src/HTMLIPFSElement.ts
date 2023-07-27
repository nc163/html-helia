import type { CID } from 'multiformats'

import HTMLIPFSConfigElement from './HTMLIPFSConfigElement';

export default class HTMLIPFSElement extends HTMLIPFSConfigElement {

  cids: CID[] = [];

  constructor() {
    super(); 
  }

  connectedCallback() {
    const cid = this.getAttribute('cid');
    if (!cid) {
      console.debug('Waiting for cid');
      return
    }
    super.fetchBlob(cid, "");
  }

  attributeChangedCallback(name: string | number, oldValue: string | number, newValue: string | number) {
    console.debug('HTMLIPFSElement attributeChangedCallback')
    if (name === 'cid' && typeof newValue === 'string') {
      super.fetchBlob(newValue, "");
    }
  }
}