import type { IPFS } from 'ipfs-core'

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
  
  let params = parse(element)

  if (!params) return false

  let blob = await fetch(ipfs, params)
  insert(element, params, blob)
}

export default IPFSTag