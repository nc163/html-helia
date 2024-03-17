/**
 * 
 *
 * @param {ArrayBuffer} content
 * @param {import('media-type')} media
 * @return {Blob|null}
 * @throws {Error}
 * @public
 */
export const decode = (content, media) => {
  return new Blob(content, { type: media.asString() });
}
