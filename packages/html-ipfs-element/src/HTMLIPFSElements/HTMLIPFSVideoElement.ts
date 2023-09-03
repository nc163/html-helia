import { HTMLIPFSElement } from './';

//
export default class HTMLIPFSVideoElement extends HTMLIPFSElement {

  private wrapped: HTMLVideoElement;

  constructor() {
    super();

    // <img>要素を作成してshadow DOMに追加するらしい
    this.wrapped = document.createElement('video');
    this.attachShadow({ mode: 'open' }).appendChild(this.wrapped);
  }

  // 
  async ipfsCatCallback(blob: Blob, options = {}) {
    const objUrl = URL.createObjectURL(blob);
    this.wrapped.src = objUrl;
  }
}
