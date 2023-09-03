import { HTMLIPFSElement } from './';

//
export default class HTMLIPFSImageElement extends HTMLIPFSElement {

  private wrapped: HTMLImageElement;

  static get observedAttributes() {
    const parentAttributes = HTMLIPFSElement.observedAttributes;

    const descriptors = Object.getOwnPropertyDescriptors(HTMLImageElement.prototype);
    const newAttributes: Array<string> = [];
    for (let [key, descriptor] of Object.entries(descriptors)) {
        if (descriptor.set) newAttributes.push(key);
    }

    return [...parentAttributes, ...newAttributes];
  }

  constructor() {
    super();

    // <img>要素を作成してshadow DOMに追加するらしい
    this.wrapped = document.createElement('img');
    this.attachShadow({ mode: 'open' }).appendChild(this.wrapped);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // if (this.isSetterOfHTMLImageElement(name)) {
      (this.wrapped as any)[name] = newValue;
    // }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  // 
  async ipfsCatCallback(blob: Blob, options = {}) {
    const objUrl = URL.createObjectURL(blob);
    this.wrapped.src = objUrl;
  }

  /*
   * 
   */

  isSetterOfHTMLImageElement(key: string): key is keyof HTMLImageElement {
    const descriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, key);

    if (!descriptor) return false;

    return !!descriptor.set && !!descriptor.writable;
  }
}
