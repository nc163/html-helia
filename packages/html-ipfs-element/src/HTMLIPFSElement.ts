import { CID } from 'multiformats/cid'

import HTMLIPFSUnixFsElement from './HTMLIPFSUnixFsElement';

//
export default class HTMLIPFSElement extends HTMLIPFSUnixFsElement {

  // 監視する属性 - attributeChangedCallback が呼ばれる
  static get observedAttributes() {
    return ['cid', 'type'];
  }

  constructor() {
    super();

    window.addEventListener('HTMLIPFSUnixFsElement::unixfsInitialized', (event) => {
      console.debug('HTMLIPFSUnixFsElement::unixfsInitialized');
      this.ifNeedCat();
    });
  }

  connectedCallback() {
  }

  attributeChangedCallback(name: string | number, oldValue: string, newValue: string) {
    switch(name) {
      case 'cid':
      case 'type':
        this.ifNeedCat();
    }
  }

  //
  // private
  //

  // attributeの cid が設定されたら parse して変数を設定する
  private async ifNeedCat() {
    const attr_cid  = this.getAttribute('cid');
    const attr_type = this.getAttribute('type');

    console.debug(`cid: ${attr_cid}, type: ${attr_type}`);

    if ("string" != typeof attr_cid) {
      console.debug('Waiting for cid');
      return
    }
    if("string" != typeof attr_type) {
      console.debug("type is invalid");
      return;
    }

    try {
      const cid = CID.parse(attr_cid);

      await this.cat(cid, attr_type)
    } catch (err) {
      console.error(err)
    }
  }
}