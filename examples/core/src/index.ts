import * as isIPFS from 'is-ipfs'
import MediaType from 'media-typer'
import { fetchBlob } from './fetchBlob'
import { decodeBlob } from './decodeBlob'
import { insertContent } from './insertContent'

import type { UnixFS } from "@helia/unixfs";

import type { HTMLIpfsTagElement } from 'html-ipfs'

/**
 * 
 * @param ipfs IPFS
 * @param options Options
 * @returns 
 */
const HTMLIpfs = async (fs: UnixFS, element: HTMLIpfsTagElement) => {
  if (element.dataset.cid !== "string") return false
  if (isIPFS.cid(element.dataset.cid) === false) return false
  let cid: string = element.dataset.cid
  
  if(typeof element.dataset.mediatype !== "string") return false
  let mediatype = MediaType.parse(element.dataset.mediatype)
  
  let type = mediatype.type

  let blob = await fetchBlob(fs, cid, type)
  
  let content = await decodeBlob(blob, mediatype)

  if(content == null) throw new Error("decode error");

  insertContent(element, mediatype, content)
}

export default HTMLIpfs
export { fetchBlob, decodeBlob, insertContent }