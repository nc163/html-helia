import { CID } from 'multiformats/cid'

import { HTMLIPFSElement } from './';

//
export default class HTMLIPFSImageElement extends HTMLIPFSElement {

  private img: HTMLImageElement;

  constructor() {
    super();

    // <img>要素を作成してshadow DOMに追加するらしい
    this.img = new Image();
    this.attachShadow({ mode: 'open' }).appendChild(this.img);
  }

  // cid が設定されたら呼ばれる
  cidAttributeChangedCallback(cid: CID) {
    super.fetchBlob(cid, 'image/jpeg').then((blob) => {
      console.log("ok")
      const imageUrl = URL.createObjectURL(blob);
      this.img.src = imageUrl;
    }, (err) => {
      console.log("error")
      console.log(err)
    });
  }
}
