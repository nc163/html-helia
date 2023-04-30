import { CID } from 'multiformats/cid'
import { MediaType } from 'media-type';

function parse(element: HTMLIpfsTagElement): ParsedIPFSTagType | null {

  if( typeof element.dataset.cid !== 'string'
   || typeof element.dataset.mediatype !== 'string') return null;

  return {
    cid: CID.parse(element.dataset.cid),
    mediatype: {
      type: MediaType.fromString(element.dataset.mediatype).type.toLowerCase(),
      subtype: MediaType.fromString(element.dataset.mediatype).subtype.toLowerCase(),
    },
    encord: element.dataset.encord || undefined
  };
}


export default parse;