/**
 *
 *
 * @param {HTMLElement} element
 * @param {Blob} blob
 * @param {import('media-type')} mediaType
 * @param {Object} option
 * @return {boolean}
 * @throws {Error}
 * @public
 */
export const BindingVideo = async (element, blob, mediaType, option) => {
  element.src = URL.createObjectURL(blob)
  return true
}
