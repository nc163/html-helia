import mediatype from 'media-type'

import { createTextInsert } from './data-mediatype-text-insert'
import { createImageInsert } from './data-mediatype-image-insert'
import { createAudioInsert } from './data-mediatype-audio-insert'
import { createVideoInsert } from './data-mediatype-video-insert'

export class DataMediatypeElement {

  constructor(element) {

    const media = mediatype.fromString(element.dataset.mediatype)
    switch(media.type.toLowerCase()) {
      case 'text':
        this.insert = createTextInsert({ element })
        break;
      case 'image':
        this.insert = createImageInsert({ element })
        break;
      case 'audio':
        this.insert = createAudioInsert({ element })
        break;
      case 'video':
        this.insert = createVideoInsert({ element })
        break;
      default:
        return false;
    }
  }

  valid () {
    /* TODO */
  }
}
