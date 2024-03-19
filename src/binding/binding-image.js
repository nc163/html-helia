/**
 * 
 * 
 * @param {HTMLElement} element
 * @param {Blob} blob
 * @param {import('media-type')} mediaType
 * @return {boolean} 
 * @throws {Error}
 * @public
 */
export const BindingImage = async (element, blob, mediaType) => {
  element.src = URL.createObjectURL(blob);
  return true
}