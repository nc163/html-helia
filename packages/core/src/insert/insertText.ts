import MediaType from 'media-type';
import type { ParsedIPFSTagType } from '@types'
/**
 * 
 * @param {IPFS} ipfs 
 */
async function insertText(element: HTMLElement, params: ParsedIPFSTagType, blob: Blob, reader: FileReader) {

  const media = MediaType.fromString(element.dataset.mediatype)
  const encord = element.dataset?.encord || null

  reader.onload = (event) => {
    if(typeof event.target?.result !== 'string') return false;

    switch(media.subtype) {
      case 'plain':
        element.innerText = escapeHtml(replaceControlCharacters(event.target.result));
        break;
      case 'html':
        return false;
        // element.innerHTML = replaceControlCharacters(event.target.result);
        break;
      case 'css':
        return false;
        // element.innerHTML = event.target.result;
        break;
      case 'javascript':
        return false;
        // element.innerHTML = event.target.result;
        break;
      default:
    }
  }
  reader.readAsText(blob, params.encord);
}

function replaceControlCharacters(str: string, replacementStr = '') {
  return str //.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g,replacementStr)
}

function escapeHtml(htmlStr: string) {
  return htmlStr.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
}

export default insertText;