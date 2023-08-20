import type { MediaType } from 'media-typer'

import type { IPFSTagDecodeContentType } from 'html-ipfs'

export function decodeBlob(blob: Blob, mediaType: MediaType): Promise<IPFSTagDecodeContentType> {
  return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onloadend = function (e) {
          if (e.target && e.target.readyState == FileReader.DONE) {
              let data = e.target.result;

              if (data == null) {
                  reject('Failed to load blob');
                  return;
              }

              switch (mediaType.type) {
                  case 'text':
                      resolve(data);
                      break;
                  case 'image':
                      let img = new Image();
                      img.onload = function () {
                          resolve(img);
                      };
                      img.src = URL.createObjectURL(blob);
                      break;
                  case 'audio':
                  case 'video':
                      let media = new Audio();
                      media.src = URL.createObjectURL(blob);
                      media.oncanplaythrough = function () {
                          resolve(media);
                      };
                      media.load();
                      break;
                  default:
                      reject('Unsupported media type: ' + mediaType);
              }
          }
      };

      if (mediaType.type.startsWith('text') || mediaType.type === 'application/json') {
          reader.readAsText(blob);
      } else {
          reader.readAsDataURL(blob);
      }
  });
}
