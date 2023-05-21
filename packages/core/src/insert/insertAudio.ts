import type { ParsedIPFSTagType } from '@types'

/**
 * 
 * @param {Blob} blob 
 */
async function insertAudio(element: HTMLMediaElement, params: ParsedIPFSTagType, blob: Blob, reader: FileReader) {
  const tagname = element.tagName
  // const media = mediatype.fromString(element.dataset.mediatype)
  // const encord = element.dataset?.encord || null

  reader.addEventListener('load', (event) => {
    if(typeof event.target?.result !== 'string') return false;

    if(tagname === 'AUDIO') {
      element.src = event.target.result;
    }
  });
  reader.readAsDataURL(blob);
}

export default insertAudio