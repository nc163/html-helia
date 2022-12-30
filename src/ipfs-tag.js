import { CID } from 'multiformats/cid';

const IPFSTagDataAttributeType = {
	Text:  'text',
	Image: 'image',
	Video: 'video',
  Element: 'element'
}


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
  constructor(options = { debug: false }) {
    this.debug = (typeof options === 'object' && options.debug) ? console.debug : () => { /* noop */ }
  }

  /**
   * 
   * @param {Element} element
   * @returns {Boolean} 
   */
  valid(element) {
    this.debug()
    if(typeof element != 'Element') return false;
    let classlist = element.classList.toString()
    let dataset  = element.dataset
    return classlist.includes("ipfs-tag") && typeof dataset.cid === 'string'
  }

  /**
   * @param {IPFS} ipfs
   * @param {Element} element 
   * @param {Boolean} childrens
   * @returns {Boolean}
   */
  async attach(ipfs, element, childrens = true) {
    this.debug('ipfs-tag: call attach')

    if (!ipfs || !ipfs.isOnline()) { this.debug('ipfs-tag: ipfs is offline'); return false; }
    
    let ipfs_tag_elements = []
    switch (typeof element) {
      case 'Element':
        if(this._valid(element)) return false
        ipfs_tag_elements.push( this._parse(element) );
      default:
        // noop
    }

    // if (this._valid(element))
    // return element.getElementsByClassName('ipfs-tag').querySelectorAll("[data-provide=ipfs], [data-cid], [data-type]");
  }



  _fetch() {

  }

  /**
   * 
   * @param {Element} element 
   * @returns {}
   */
  _parse(element) {
    let cid    = CID.parse(element.dataset.cid);
    let type   = IPFSTagDataAttributeType[element.dataset.type]
    let target = Document.querySelectorAll(element.dataset.target);
    if (!target) target = element;

    return {
      cid: cid,
      type: type,
      format: null,
      target: target
    }
  }
}

export default IpfsTag;