import { CID } from 'multiformats/cid'

import HTMLIPFSConfigElement from './HTMLIPFSConfigElement';

//
export default class HTMLIPFSElement extends HTMLElement {

  // 監視する属性 - attributeChangedCallback が呼ばれる
  static get observedAttributes() {
    return ['cid', 'mediatype'];
  }

  constructor() {
    super();
    console.debug("HTMLIPFSElement constructor")
  }

  connectedCallback() {
    this.ifNeedCallCidAttributeChangedCallback();
  }

  attributeChangedCallback(name: string | number, oldValue: string, newValue: string) {
    if (name === 'cid' && newValue) {
      this.ifNeedCallCidAttributeChangedCallback();
    }
  }

  // attributeの cid が設定されたら parse して変数を設定する
  ifNeedCallCidAttributeChangedCallback() {
    const cid_attr = this.getAttribute('cid');
    if (!cid_attr) {
      console.debug('Waiting for cid');
      return
    }

    try {
      const cid = CID.parse(cid_attr);
      this.cidAttributeChangedCallback(cid)
    } catch (err) {
      console.error(err)
    }
  }

  // cid が設定されたら呼ばれる
  cidAttributeChangedCallback(cid: CID) {
    throw new Error('need override cidAttributeChangedCallback')
  }

  // 
  async fetchBlob(cid: CID, mediatype: string): Promise<Blob>  {
    const unixFs = HTMLIPFSConfigElement.unixFs;
    if(unixFs === null) throw new Error("unixFs is null");

    const content = [];
    for await (const chunk of unixFs.cat(cid)) {
      content.push(chunk);
    }
    if (content.length === 0) throw new Error("No content found for the given CID");

    return new Blob(content, { type: mediatype });
  }
}