import { CID } from 'multiformats/cid'

/**
 * 
 * @param {import('multiformats/cid').CID} cid
 * @param {import('media-type')} mediaType
 * @public
 */
export function PermitParameter (cid, type, subtype, parameters= null) {
  this.cid      = cid
  this.media    = Object.create({ type: type, subtype: subtype, parameters: parameters })
  this.insert   = null
  this.binding  = null

  /**
   * 
   * @return {boolean} 
   * @public
   */
  this.isValid = () => {
    return (
      (null != this.cid   && this.cid instanceof CID) &&
      (null != this.media && this.media.isValid())
    )
  }

}