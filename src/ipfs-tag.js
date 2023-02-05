import { CID } from 'multiformats/cid';
import mediatype from 'media-type'

/**
 * 
 */
class IpfsTag {

  static targetClassName = 'ipfstag'

  static defaultOptions = {
    targetClassName: 'ipfstag',
    timeout: 5000,
    debug: false
  }

  /**
   * 
   * @param {{
   *  debug: Boolean
   * }} options 
   */
  constructor(options = {}) {
    if(typeof options != 'object') throw new Error("ipfs-tag: Bad parameter.");

    let { debug, targetClassName, timeout } = Object.assign(IpfsTag.defaultOptions, options); 

    if(typeof targetClassName != 'string') throw new Error("ipfs-tag: Bad parameter.");
    if(typeof timeout != 'number') throw new Error("ipfs-tag: Bad parameter.");
    if(typeof debug != 'boolean') throw new Error("ipfs-tag: Bad parameter.");

    this.targetClassName = targetClassName
    this.timeout = timeout
    this.debug = debug ? console.debug : () => { /* noop */ }

    this.debug("ipfs-tag: debug mode is enabled")
  }

  /**
   * @param {IPFS} ipfs
   * @param {Document | HTMLElement} element 
   * @returns {Boolean}
   */
  async fetch(ipfs, element = null) {
    switch(Boolean(element)) {
      case true:
        await this._fetch(ipfs, element)
        break;
      case false:
        const elements = document.getElementsByClassName(IpfsTag.targetClassName)
        for( let i = 0 ; i < elements.length ; i ++ ) {
          await this._fetch(ipfs, elements[i])
        }
        break;
    }
  }

  async _fetch(ipfs, element) {

    const cid = CID.parse(element.dataset.cid);
    const media = mediatype.fromString(element.dataset.mediatype)
    const encord = element.dataset?.encord || null

    this.debug(`##= ${element.tagName}
# id        : ${element.id}
# class     : ${element.className}
# cid       : ${cid}
# mediatype : ${media.asString()}
# encord    : ${encord}`)

    /**
     * @params https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/DAG.md#ipfsdaggetcid-options
     * @returns https://ipld.io/docs/data-model/node/
     */
    const data = await ipfs.dag.get(cid, { timeout: this.timeout });
    const arrayBuffer = (data?.value?.Data instanceof Uint8Array) ? data.value.Data : null;

    const blob = new Blob([arrayBuffer], { type: media.asString() });
    const reader = new FileReader();

    // see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs

    switch(media.type) {
      case 'text':
        reader.onload = (event) => {
          switch(media.subtype) {
            case 'html':
              element.innerHTML = this.replaceControlCharacters(event.target.result)
              break;
            case 'plain':
            default:
              element.innerText = this.escapeHtml(this.replaceControlCharacters(event.target.result))
              break;
          }
        }
        reader.readAsText(blob, encord);
        break;
      case 'image':
        reader.addEventListener('load', (event) => {
          switch(element.tagName) {
            case 'IMG':
              element.src = event.target.result;
              break;
            case 'CANVAS':
              const img = new Image()
              img.src = event.target.result
              element.getContext("2d").drawImage(img, 0, 0);
              break;
            default:
              break;
          }
        });
        reader.readAsDataURL(blob);
        break;
      default:
        break;
    }
  }

  replaceControlCharacters(str, replacementStr = '') {
    return str.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g,replacementStr)
  }

  escapeHtml(htmlStr) {
    return htmlStr.replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#39;");
  }
}

export default IpfsTag;