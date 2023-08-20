// import { HTMLMediaElement, HTMLVideoElement} from "@types"
/**
 * 
 */
export function insertVideo(element: HTMLMediaElement, video: HTMLVideoElement) {
  try {
    element.src = video.src
  } catch (error) {
    console.error(error)
  }
}