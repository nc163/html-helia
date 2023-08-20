/**
 * 
 */
export function insertImage(element: HTMLMediaElement, image: HTMLImageElement) {
  try {
    element.src = image.src
  } catch (error) {
    console.error(error)
  }
}