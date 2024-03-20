
/**
 * 
 * @param {HTMLElement} target
 * @return {boolean} 
 * @public
 */
export const dispatchStatusChangeEvent = (target, status) => {
  const event = new CustomEvent(EventName, {
    bubbles: false,
    detail: {
      status: status
    } 
  });

  target.dispatchEvent(event);
}