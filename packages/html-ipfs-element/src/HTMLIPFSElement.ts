import { CID } from 'multiformats/cid'
import MediaTyper from 'media-typer';

import HTMLIPFSConfigElement from './HTMLIPFSConfigElement';

//
export default class HTMLIPFSElement extends HTMLElement {

  // 監視する属性 - attributeChangedCallback が呼ばれる
  static get observedAttributes() {
    return ['cid'];
  }

  constructor() {
    super();
    console.debug("HTMLIPFSElement constructor")

    document.addEventListener('HTMLIPFSConfigElement::unixfsUpdated', (event) => {
      console.log('unixFs has been updated:');
      this.ifNeedCallCidAttributeChangedCallback();
    });
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
    const cid_attr  = this.getAttribute('cid');
    const type_attr = this.getAttribute('type');
    if (!cid_attr) {
      console.debug('Waiting for cid');
      return
    }
    if("string" != typeof type_attr || false === MediaTyper.test(type_attr)) {
      console.debug("type is invalid");
      return;
    }

    try {
      const cid = CID.parse(cid_attr);
      
      this.fetchBlob(cid, type_attr).then((blob) => {
        this.blobFetchedCallback(blob, { cid: cid, mediatype: type_attr })
      }, (err) => {
        console.log(err)
      });  
    } catch (err) {
      console.error(err)
    }
  }

  async blobFetchedCallback(blob: Blob, options = {}) {
    throw new Error('need override blobFetchedCallback')
  }

  // 
  async fetchBlob(cid: CID, mediatype: string): Promise<Blob>  {
    const type_attr = this.getAttribute('type');
    const unixFs = HTMLIPFSConfigElement.unixFs;

    if(null === unixFs) throw new Error("unixFs is null");
    if("string" != typeof type_attr || false === MediaTyper.test(type_attr)) throw new Error("type is invalid");

    const content = [];
    for await (const chunk of unixFs.cat(cid)) {
      content.push(chunk);
    }
    if (content.length === 0) throw new Error("No content found for the given CID");

    return new Blob(content, { type: type_attr });
  }
}