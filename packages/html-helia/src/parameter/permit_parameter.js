import { CID } from 'multiformats/cid'

/**
 *
 *
 * @param {import('multiformats/cid').CID} cid
 * @param {import('media-type')} mediaType
 * @public
 */
export function PermitParameter(cid, mediaType) {
  this.cid = cid
  this.media = mediaType
  this.mediaType = mediaType.asString()
  this.insert = null
  this.binding = null

  /**
   *
   * @return {boolean}
   * @public
   */
  this.isValid = () => {
    return null != this.cid && this.cid instanceof CID && this.media.isValid()
  }
}
