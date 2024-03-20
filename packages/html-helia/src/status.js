import { dispatchStatusChangeEvent } from './event/index.js'

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
