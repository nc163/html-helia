
import mediatype from 'media-type'

/**
 * 
 * @param {IPFS} ipfs 
 */
export function createImageInsert({ element }) {

  /**
   * 
   * @param {Blob} blob 
   */
  const imageInsert = async (blob) => {
    const reader = new FileReader();
    const tagname = element.tagName

    reader.addEventListener('load', (event) => {
      switch(tagname) {
        case 'IMG':
          element.src = event.target.result;
          break;
        case 'CANVAS':
          const img = new Image();
          img.src = event.target.result;
          element.getContext("2d").drawImage(img, 0, 0);
          break;
        default:
          break;
      }
    });
    reader.readAsDataURL(blob);
  }

  return imageInsert
} 
