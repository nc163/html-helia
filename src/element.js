import { CID } from 'multiformats/cid'
import MediaType from 'media-type'

import { PermitParams } from './permitParams.js'
import { dispatchStatusChangeEvent } from './event.js'
/**
 * 
 *
 * @param {HTMLElement} element
 * @public
 */
export const setLoading = (element) => {
  element.dataset.ipfsStatus = 'loading';

  dispatchStatusChangeEvent(element, 'loading');
}

/**
 * 
 *
 * @param {HTMLElement} element
 * @public
 */
export const setError = (element, message) => {
  console.error(message)

  element.dataset.ipfsStatus = 'error';

  dispatchStatusChangeEvent(element, 'error');
}

/**
 * 
 *
 * @param {HTMLElement} element
 * @public
 */
export const setComplete = (element) => {
  element.dataset.ipfsStatus = 'complete';

  dispatchStatusChangeEvent(element, 'complete');
}

/**
 * 
 *
 * @param {HTMLElement} element
 * @return {import('./permitParams.js').PermitParams} 
 * @public
 */
export const permit = (element) => {
  let permitParams = new PermitParams()

  let cid  = element.dataset.ipfsCid;
  let media = element.dataset.ipfsMediaType;
  let status = element.dataset.ipfsStatus;
  let binding = element.dataset.ipfsBinding;

  try {
    if('string' != typeof cid) throw new Error('data-ipfs-cid is not found')
    permitParams.cid = CID.parse(cid)
  } catch (err) {
    console.error(err)
  }

  try {
    if('string' != typeof media) throw new Error('data-media-type is not found')
    permitParams.media = MediaType.fromString(media)
  } catch (err) {
    console.error(err)
  }

  permitParams.status = status || 'pending'
  permitParams.status = binding || null

  return permitParams
}
