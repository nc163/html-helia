import type { MediaType } from 'media-typer'
import { insertAudio } from './insertAudio'
import { insertVideo } from './insertVideo'
import { insertImage } from './insertImage'
import { insertText } from './insertText'

import type { HTMLIpfsTagElement, IPFSTagDecodeContentType } from 'ipfs-tag'

export function insertContent(element: HTMLIpfsTagElement, mediaType: MediaType, content: IPFSTagDecodeContentType) {
  switch(mediaType.type) {
    case 'text':
      insertText(element as HTMLElement, content as string)
      break;
    case 'image':
      insertImage(element as HTMLMediaElement, content as HTMLImageElement)
      break;
    case 'audio':
      insertAudio(element as HTMLMediaElement, content as HTMLAudioElement)
      break;
    case 'video':
      insertVideo(element as HTMLMediaElement, content as HTMLVideoElement)
      break;
    default:
      return false;
  }
}
