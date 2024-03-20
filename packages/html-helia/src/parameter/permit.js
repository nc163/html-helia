import { CID } from 'multiformats/cid'
import MediaType from 'media-type'

import { PermitParameter } from './permit_parameter.js'

/**
 *
 *
 * @param {HTMLElement} element
 * @return {import('./permit_parameter.js').PermitParameter}
 * @public
 */
export const permit = (element) => {
  try {
    let _cid = element.dataset.ipfsCid
    let _media = element.dataset.ipfsMediaType

    if ('string' != typeof _cid)
      throw new Error(`data-ipfs-cid is not found ${_cid}`)
    let cid = CID.parse(_cid)

    if ('string' != typeof _media)
      throw new Error(`data-media-type is not found ${_media}`)
    let media = MediaType.fromString(_media)

    return new PermitParameter(cid, media)
  } catch (err) {
    console.error(err)
    return null
  }
}
