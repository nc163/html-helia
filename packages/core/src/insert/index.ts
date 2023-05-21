import insertAudio from './insertAudio'
import insertVideo from './insertVideo'
import insertImage from './insertImage'
import insertText from './insertText'
import type { ParsedIPFSTagType, HTMLIpfsTagElement } from '@types'

async function insert(element: HTMLIpfsTagElement, params: ParsedIPFSTagType, blob: Blob) {
  const reader = new FileReader();
  switch(params.mediatype.type.toLowerCase()) {
    case 'text':
      insertText(element as HTMLElement, params, blob, reader)
      break;
    case 'image':
      insertImage(element as HTMLImageElement, params, blob, reader)
      break;
    case 'audio':
      insertAudio(element as HTMLAudioElement, params, blob, reader)
      break;
    case 'video':
      insertVideo(element as HTMLVideoElement, params, blob, reader)
      break;
    default:
      return false;
  }
}

export default insert