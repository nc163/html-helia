/**
 * 
 */
export function insertAudio(element: HTMLMediaElement, audio: HTMLAudioElement) {
  try {
    element.src = audio.src
  } catch (error) {
    console.error(error)
  }
}
