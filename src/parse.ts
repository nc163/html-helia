import type { IPFS } from 'ipfs-core'
import { CID } from 'multiformats'

type IpfsTagParseProps = {
  ipfs: IPFS;
  cid: string | CID;
  type: string;
  subtype: string;
  encord?: string;
}

function parse(cid: string | CID, type: string, subtype: string, encord?: string): ParsedIPFSTagType | null {

  let _cid = cid
  if (typeof cid === 'string') _cid = CID.parse(cid)
  
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