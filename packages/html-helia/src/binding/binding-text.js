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
export const BindingText = async (element, blob, mediaType, option) => {
  let text = await blob.text()
  switch (mediaType.subtype) {
    case 'plain':
      element.insertAdjacentText(option.insertPosition, text)
      break
    case 'html':
      element.insertAdjacentHTML(option.insertPosition, text)
      break
    case 'javascript':
      element.insertAdjacentText(option.insertPosition, text)
      break
    default:
      throw new Error(`Unsupported media-type.subtype: ${mediaType.subtype}`)
  }

  return true
}
