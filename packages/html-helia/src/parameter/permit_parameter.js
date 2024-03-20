import { CID } from 'multiformats/cid'

/**
 * 
 * @param {import('multiformats/cid').CID} cid
 * @param {string} type
 * @param {string} subtype
 * @param {string|null} parameters
 * @public
 */
export function PermitParameter (cid, type, subtype, parameters = null) {
  this.cid    = cid;
  this.media  = Object.create({
      type: type,
      subtype: subtype,
      parameters: parameters
    });
  this.mediaType
    = 'string' === typeof parameters
    ? `${type}/${subtype} ;${parameters}` 
    : `${type}/${subtype}`;
  this.insert     = null;
  this.binding    = null;

  /**
   * 
   * @return {boolean} 
   * @public
   */
  this.isValid = () => {
    return (
      (null != this.cid && this.cid instanceof CID) &&
      ('string' === typeof this.media.type) &&
      ('string' === typeof this.media.subtype)
    )
  }

}