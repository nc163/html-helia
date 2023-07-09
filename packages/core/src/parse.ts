import { CID } from 'multiformats'
import type { IPFSTagFetchContextType } from '@types'

function parse(cid: string, type: string, subtype: string, encord?: string): IPFSTagFetchContextType {

  return {
    cid: CID.parse(cid),
    mediatype: {
      type: type.toLowerCase(),
      subtype: subtype.toLowerCase(),
    },
    encord: encord || undefined
  };
  // return {
  //   cid: cid,
  //   mediatype: {
  //     type: MediaType.fromString(element.dataset.mediatype).type.toLowerCase(),
  //     subtype: MediaType.fromString(element.dataset.mediatype).subtype.toLowerCase(),
  //   },
  //   encord: element.dataset.encord || undefined
  // };
}


export default parse;