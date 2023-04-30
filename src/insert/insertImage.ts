
/**
 * 
 * @param {IPFS} ipfs 
 */
async function insertImage(element: HTMLImageElement, params: ParsedIPFSTagType, blob: Blob, reader: FileReader) {
  const tagname = element.tagName
  if(element == null) return false;

  reader.addEventListener('load', (event) => {
    if(typeof event.target?.result !== 'string') return false;

    switch(element) {
      case element as HTMLImageElement:
        element.src = event.target.result;
        break;
      // case element as HTMLCanvasElement:
      //   const img = new Image();
      //   img.src = event.target.result;
      //   element.clearRect(0, 0, element.width, element.height);
      //   element.getContext("2d").drawImage(img, 0, 0);
      //   break;
      default:
        break;
    }
  });
  reader.readAsDataURL(blob);
} 



export default insertImage