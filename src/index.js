import { CID } from 'multiformats/cid'
import MediaTyper from 'media-typer';
import { unixfs } from '@helia/unixfs';

export default class {

  _unixFs = null;

  constructor(helia) {
    this._unixFs = unixfs(helia)
  }

  async fetch(element) {
    if(!this._valid(element)) return false;

    let cid        = CID.parse(element.dataset.ipfsCid);
    let mediatyper = MediaTyper.parse(element.dataset.ipfsMediatype);
    let blob = await this._fetch_blob(cid, element.dataset.ipfsMediatype);
    if(!blob) return false;

    return await this._append_obj(element, mediatyper, blob);
  }

  //
  _valid(element) {
    if(!element.dataset.ipfsCid) return false
    
    let cid       = element.dataset.ipfsCid;
    let mediatype = element.dataset.ipfsMediatype;
    try {
      CID.parse(cid);
      if(!MediaTyper.test(mediatype)) throw new Error(`Invalid data-mediatype: ${element}`);

      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  //
  async _fetch_blob(cid, mediatype) {

    try {
      const content = [];
      for await (const chunk of this._unixFs.cat(cid)) {
        content.push(chunk);
      }
      if (content.length === 0) throw new Error("No content found for the given CID");

      let blob = new Blob(content, { type: mediatype });
      return blob
    } catch (err) {
      console.error(err)
      return false
    }
  }

  //
  async _append_obj(element, mediatyper, blob) {
    try {
      switch(mediatyper.type) {
        case 'audio':
        case 'video':
        case 'image':
          element.src = URL.createObjectURL(blob);
          break;
        case 'text':
          let text = await blob.text()
          element.innerHTML = text;
          break;
        default:
          console.error(`Unsupported media type: ${mediatyper.type}`)
      }
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

}
