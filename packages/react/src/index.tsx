import type { IPFS } from 'ipfs-core'
import { MediaType } from 'media-type';
import { CID } from 'multiformats/cid'

import { parse } from "ipfs-tag"

type IpfsTagProps = {
  ipfs: IPFS;
  cid: string | CID;
  type: string;
  subtype: string;
  encord?: string;
}

/**
 * 
 * @param {*} props 
 * e.g) <ipfstag ipfs cid="QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o" type="text/plain" ></ipfstag>
 * @returns 
 */
function ipfstag({ ipfs, cid, type, subtype, encord }: IpfsTagProps) {

  let params = parse(ipfs, cid, type, subtype, encord)


  return <>
  </>
}
/**
 */