import * as Ipfs from 'ipfs-core'
import { CID } from 'multiformats/cid';
import mediatype from 'media-type'

import { DataMediatypeElement } from './data-mediatype-element'

/**
 * 
 */
export class IpfsTagElement extends DataMediatypeElement {

  static defaultOptions = {
    targetClassName: 'ipfs-tag',
    // targetCidAttributeName: 'cid',
    // targetMediaTypeAttributeName: 'mediatype',
    auto: false,
    timeout: 5000,
    debug: false
  }

  /**
   * 
   * @param {{
   *  ipfs: Ipfs?
   *  debug: Boolean?
   *  targetClassName: String?
   *  timeout: Number?
   * }} options 
   */
  constructor(ipfs, element, options = {}) {

    super(element)

    if(typeof options != 'object') throw new Error(`ipfs-tag: Bad parameter.`);

    let { targetClassName, timeout, debug } = Object.assign(IpfsTagElement.defaultOptions, options); 

    if(typeof targetClassName != 'string') throw new Error(`ipfs-tag: Bad parameter.`);
    if(typeof timeout != 'number') throw new Error(`ipfs-tag: Bad parameter.`);
    if(typeof debug != 'boolean') throw new Error(`ipfs-tag: Bad parameter.`);

    this.ipfs = ipfs
    this.element = element
    this.targetClassName = targetClassName;
    this.media = mediatype.fromString(element.dataset.mediatype)
    this.timeout = timeout;
    this.debug = debug ? console.debug : () => { /* noop */ };
  }

  /**
   * @returns {Boolean}
   */
  async display() {
    
    if (!this.ipfs) { this.debug('ipfs: ipfs is null'); return false; }
    if (!this.ipfs.isOnline()) { this.debug('ipfs: ipfs is offline'); return false; }

    switch(Boolean(this.element)) {
      case true:
        const mediaElement = new DataMediatypeElement(this.element);

        const content = await this.fetch_from_ipfs(this.ipfs, this.element)
        const blob = new Blob(content, { type: this.media.asString() });
        mediaElement.insert(blob)
        break;
      case false:
        const elements = document.getElementsByClassName(this.targetClassName)
        for(let i = 0 ; i < elements.length ; i++) {
          const mediaElement = new DataMediatypeElement(this.element);
          const content = await this.fetch_from_ipfs(this.ipfs, elements[i])
          const blob = new Blob(content, { type: this.media.asString() });
          mediaElement.insert(blob)
        }
        break;
    }
  }

  /**
   * 
   * @param {*} ipfs 
   * @param {*} this.element 
   * @returns {ArrayBuffer} content
   */
  async fetch_from_ipfs() {

    // see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs
    const cid = CID.parse(this.element.dataset.cid);
    const encord = this.element.dataset?.encord || null

    this.debug(`##= ${this.element.tagName}
# id        : ${this.element.id}
# class     : ${this.element.className}
# cid       : ${cid}
# mediatype : ${this.media.asString()}
# encord    : ${encord}`)

    /**
     * ipfs.cat
     * https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfscatipfspath-options
     * https://discuss.ipfs.tech/t/how-to-ipfs-dag-get-the-image-in-browser/15938/3
     */
    const content = [];
    for await (const chunk of this.ipfs.cat(cid)) {
      content.push(chunk);
    }

    return content
  }

  async runIpfs() {
    window.ipfs = await Ipfs.create({ repo: 'ipfs-' + Math.random() })

    this.ipfs = ipfs || window.ipfs;

    this.debug('ipfs-tag: ipfs is ready')
  }

  // events

  DispatchAttachedEvent(success) {
    try{
      this.debug('DispatchAttachedEvent')
    } catch(err) {
    
    } finally {
      const event = new CustomEvent('ipfs-tag:attached', { element: this.element, success: success });
      this.element.dispatchEvent(event);
    }
  }
}