// import { CID } from 'multiformats'
import type { ParsedIPFSTagType } from '@types'

function parse(cid: string, type: string, subtype: string, encord?: string): ParsedIPFSTagType {

  // let _cid = cid
  // if (typeof cid === 'string') _cid = CID.parse(cid)
  // else _cid = cid
  
  return {
    cid: cid,
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