import type { CID } from 'multiformats/cid'

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

  // 
  async blobFetchedCallback(blob: Blob, options = {}) {
    const imageUrl = URL.createObjectURL(blob);
    this.img.src = imageUrl;
  }
}
