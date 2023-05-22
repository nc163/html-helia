import type { IPFS } from 'ipfs-core'
// @ts-ignore
import MediaType from 'media-type';
import type { HTMLIpfsTagElement } from '@types'
import parse from './parse'
import fetch from './fetch'
import insert from './insert'

/**
 * 
 * @param ipfs IPFS
 * @param options Options
 * @returns 
 */
const IPFSTag = async (ipfs: IPFS, element: HTMLIpfsTagElement) => {
  if (element.dataset.cid !== "string") return false
  let cid = element.dataset.cid
  let type = MediaType.fromString(element.dataset.mediatype).type.toLowerCase()
  let subtype = MediaType.fromString(element.dataset.mediatype).subtype.toLowerCase()
  let encord = element.dataset.encord

  let params = parse(cid, type, subtype, encord)

  if (!params) return false

  let blob = await fetch(ipfs, params)
  insert(element, params, blob)
}

export default IPFSTag
export { parse, fetch, insert }