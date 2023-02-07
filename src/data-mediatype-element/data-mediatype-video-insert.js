import mediatype from 'media-type'

/**
 * 
 * @param {IPFS} ipfs 
 */
export function createVideoInsert({ element }) {

  /**
   * 
   * @param {Blob} blob 
   */
  const videoInsert = async (blob) => {
    const reader = new FileReader();
    const tagname = element.tagName

    reader.addEventListener('load', (event) => {
      if(tagname === 'VIDEO') {
        element.src = event.target.result;
      }
    });
    reader.readAsDataURL(blob);
  }

  return videoInsert;
} 
