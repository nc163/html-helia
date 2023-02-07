import mediatype from 'media-type'

/**
 * 
 * @param {IPFS} ipfs 
 */
export function createTextInsert({ element }) {

  /**
   * 
   * @param {Blob} blob 
   */
  const textInsert = async (blob) => {
    const reader = new FileReader();
    const media = mediatype.fromString(element.dataset.mediatype)
    const encord = element.dataset?.encord || null

    reader.onload = (event) => {
      switch(media.subtype) {
        case 'plain':
          element.innerText = escapeHtml(replaceControlCharacters(event.target.result));
          break;
        case 'html':
          return false;
          element.innerHTML = replaceControlCharacters(event.target.result);
          break;
        case 'css':
          return false;
          element.innerHTML = event.target.result;
          break;
        case 'javascript':
          return false;
          element.innerHTML = event.target.result;
          break;
        default:
      }
    }
    reader.readAsText(blob, encord);
  }

  return textInsert;
} 

function replaceControlCharacters(str, replacementStr = '') {
  return str //.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g,replacementStr)
}

function escapeHtml(htmlStr) {
  return htmlStr.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
}
