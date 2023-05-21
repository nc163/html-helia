import { ParsedIPFSTagType } from '@types'

/**
 * 
 * @param {Blob} blob 
 */
async function insertVideo(element: HTMLMediaElement, params: ParsedIPFSTagType, blob: Blob, reader: FileReader) {
  const tagname = element.tagName

  reader.addEventListener('load', (event) => {
    if(typeof event.target?.result !== 'string') return false;

    if(tagname === 'VIDEO') {
      element.src = event.target.result;
    }
  });
  reader.readAsDataURL(blob);
}

export default insertVideo