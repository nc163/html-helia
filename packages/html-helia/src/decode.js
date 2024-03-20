/**
 *
 *
 * @param {ArrayBuffer} content
 * @param {import('media-type')} media
 * @return {Blob}
 * @throws {Error}
 * @public
 */
export const decode = (content, media) => {
  return new Blob(content, { type: media.asString() })
}
