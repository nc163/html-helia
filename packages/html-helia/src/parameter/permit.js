import { CID } from 'multiformats/cid'
import MediaType from 'media-type'

/**
 * 
 *
 * @param {HTMLElement} element
 * @return {import('./permit_parameter.js').PermitParameter} 
 * @public
 */
export const permit = (element) => {
  
  try {
    let _cid  = element.dataset.ipfsCid;
    let _media = element.dataset.ipfsMediaType;
  
    if('string' != typeof _cid) throw new Error('data-ipfs-cid is not found')
    let cid = CID.parse(_cid)

    if('string' != typeof _media) throw new Error('data-media-type is not found')
    let media = MediaType.fromString(_media)

    return new PermitParams(cid, media.type, media.subject, media.parameters);

  } catch (err) {
    console.error(err)
    return null
    
  }
}