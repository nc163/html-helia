import mediatype from 'media-type'

/**
 * 
 * @param {IPFS} ipfs 
 */
export function createAudioInsert({ element }) {

  /**
   * 
   * @param {Blob} blob 
   */
  const audioInsert = async (blob) => {
    const reader = new FileReader();
    const tagname = element.tagName
    // const media = mediatype.fromString(element.dataset.mediatype)
    // const encord = element.dataset?.encord || null

    reader.addEventListener('load', (event) => {
      if(tagname === 'AUDIO') {
        element.src = event.target.result;
      }
    });
    reader.readAsDataURL(blob);
  }

  return audioInsert;
} 
