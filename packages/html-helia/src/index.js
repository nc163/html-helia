import { unixfs } from '@helia/unixfs';

import { permit } from './parameter/index.js';
import { decode } from './decode.js';
import { binding } from './binding/index.js';
import { onLoadingEvent, onErrorEvent, onCompleteEvent } from './events/index.js';

export default class {

  _unixFs = null;

  /**
   * 
   * @param {import('@helia').Helia} helia
   */
  constructor(helia) {
    this._unixFs = unixfs(helia)
  }

  /**
   * 
   * @param {import('multiformats/cid').CID} cid
   * @return {ArrayBuffer}
   * @throws {Error} 
   * @private
   */
  _get_use_unixfs = async (cid) => {
    const buffer = [];
    for await (const chunk of this._unixFs.cat(cid)) {
      buffer.push(chunk);
    }
    if (0 === buffer.length) throw new Error("No content found for the given CID");

    return buffer
  }

  /**
   * 
   * @param {HTMLElement} element
   * @return {boolean} 
   * @public
   */
  fetch = async (element) => {
    let params = permit(element);

    onLoadingEvent(element);

    try {
      if(false === params.isValid()) throw new Error('Invalid Params');

      let buffer = await this._get_use_unixfs(params.cid);
      let blob = decode(buffer, params.media)
      await binding(element, blob, params.media);

    } catch (err) {
      onErrorEvent(element, err);
      return false;

    }

    onCompleteEvent(element);
    return true
  }
}
