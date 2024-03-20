import { EventName } from './event_name.js';

/**
 * 
 * @param {HTMLElement} target
 * @return {boolean} 
 * @public
 */
const onEvent = (target, status, message) => {
  const event = new CustomEvent(EventName, {
    // bubbles: false,
    detail: {
      status: status,
      message: message
    } 
  });

  target.dispatchEvent(event);
}

export const onLoadingEvent = (target) => {
  onEvent(target, 'loading');
}

export const onErrorEvent = (target, message) => {
  onEvent(target, 'error', message);
}

export const onCompleteEvent = (target) => {
  onEvent(target, 'complete');
}