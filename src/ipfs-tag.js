import { CID } from 'multiformats/cid';

// const IPFSTagDataAttributeType = {
// 	Text:  'text',
// 	Image: 'image',
// 	Video: 'video',
//   Element: 'element'
// }

const CLASS_NAME = 'ipfs-tag'


/**
 * 
 */
class IpfsTag {

  /**
   * 
   * @param {{
   *  debug: Boolean
   * }} options 
   */
  constructor(options = { debug: false}) {
    if(typeof options != 'object') throw new Error("ipfs-tag: Bad parameter."); 

    this.debug      = Boolean(options.debug) ? console.debug : () => { /* noop */ }
    this.debug_mode = Boolean(options.debug)

    this.ipfs_tag_elements = {}

    this.debug("ipfs-tag: debug mode is enabled")
  }

  /**
   * 
   * @param {Element} element
   * @returns {Boolean} 
   */
  valid(element) {
    if(typeof element != 'Element') return false;
    let classlist = element.classList.toString()
    let dataset  = element.dataset
    return classlist.includes("ipfs-tag") && typeof dataset.cid === 'string'
  }

  /**
   * @param {IPFS} ipfs
   * @param {Document | HTMLElement} element 
   * //@param {Boolean} childrens 子要素もまとめて処理するかどうか
   * @returns {Boolean}
   */
  async attach(ipfs, element) {
    this.debug('ipfs-tag: call attach')

    if (!ipfs || !ipfs.isOnline()) { this.debug('ipfs-tag: ipfs is offline'); return false; }
    
    let elements = this._find(element)
    for (let index = 0; index < elements.length; index++) {
      let e = elements.item(index)

      let obj = this._converter(e);
      if(obj && !Boolean(this.ipfs_tag_elements[e])) this.ipfs_tag_elements[e] = obj;

      //
      // dag-get
      //

      if(this.ipfs_tag_elements[e].fetched === false) {

        // data: https://ipld.io/docs/data-model/node/
        let data = await ipfs.dag.get(this.ipfs_tag_elements[e].cid);

        if(data?.value?.Data instanceof Uint8Array) {
          this.ipfs_tag_elements[e].data = data.value.Data;
          this.ipfs_tag_elements[e].fetched = true;
        }
      }

      //
      // attach
      //

      if(this.ipfs_tag_elements[e].fetched === false) continue;
      
      let decord_value = this._decord(this.ipfs_tag_elements[e])

      switch(this.ipfs_tag_elements[e].type) {
        case 'text':
          e.innerText = decord_value;
          break;
        case 'image':
          break;
      }
      this.ipfs_tag_elements[e].attached = true;
    }
  }

  /**
   * 
   * @param {Document | HTMLElement} element
   * @retruns {HTMLElement}
   */
  _find(element) {
    return element.getElementsByClassName(CLASS_NAME)
  }

  /**
   * 
   * @param {HTMLElement} element 
   * @returns 
   */
  _converter(element) {
    if(this.isElement(element)) {
      try {
        let cid    = CID.parse(element.dataset.cid);
        let type   = element.dataset.type
        let format = element.dataset.format
        // let target = Document.querySelectorAll(element.dataset.target);
        let target = element

        return {
          cid: cid,
          type: type,
          format: format,
          target: target,
          data: null,
          fetched: false,
          attached: false
        }
      }
      catch (e) {
        this.debug('ipfs-tag: error', e)
        return null;
      }
    } else {
      this.debug('ipfs-tag: not support element' + element)
      return null;
    }
  }

  /**
   * 
   * @param {object} dataset 
   */
  _decord(dataset) {
    try {
      switch(dataset.type) {
        case 'text':
          return new TextDecoder().decode(dataset.data)
        case 'image':
          return dataset.format + "," + window.btoa(String.fromCharCode.apply(null, dataset.data));
        default:
          throw new Error('ipfs-tag: not support type');
      }
    } catch (error) {
      this.debug('ipfs-tag: decord error' + dataset)
      this.debug(error)
      return null;
    }
  }

  /**
   * 
   * @param {any} obj 
   * @returns {Boolean}
   */
  isDocument(obj) {
    // https://developer.mozilla.org/ja/docs/Web/API/Node/nodeType
    return !!obj && obj.nodeType === 9;
  }
  
  /**
   * https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object/384380#384380
   * @param {any} obj 
   * @returns {Boolean}
   */
  isElement(obj) {
    try {
      //Using W3 DOM2 (works for FF, Opera and Chrom)
      return obj instanceof HTMLElement;
    }
    catch(e){
      //Browsers not supporting W3 DOM2 don't have HTMLElement and
      //an exception is thrown and we end up here. Testing some
      //properties that all elements have. (works on IE7)
      return (typeof obj==="object") &&
        (obj.nodeType===1) && (typeof obj.style === "object") &&
        (typeof obj.ownerDocument ==="object");
    }
  }
}

export default IpfsTag;