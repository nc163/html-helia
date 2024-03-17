import { BindingAudio } from './binding-audio.js'
import { BindingVideo } from './binding-video.js'
import { BindingImage } from './binding-image.js'
import { BindingText } from './binding-text.js'
import { BindingApplication } from './binding-application.js'

/**
 * 
 * 
 * @param {HTMLElement} element
 * @param {Blob} blob
 * @param {import('media-type')} mediaType
 * @return {boolean} 
 * @throws {Error}
 * @public
 */
export const binding = async (element, blob, mediaType) => {
  switch(mediaType.type) {
    case 'text':        await BindingText(element, blob, mediaType);        break;
    case 'image':       await BindingImage(element, blob, mediaType);       break;
    case 'audio':       await BindingAudio(element, blob, mediaType);       break;
    case 'video':       await BindingVideo(element, blob, mediaType);       break;
    case 'application': await BindingApplication(element, blob, mediaType); break;
    default:
      throw new Error(`Unsupported media-type: ${mediaType.asString()}`)
  }
  return true
}