import { CID } from 'multiformats/cid'
// import MediaType from 'media-type'

/**
 * 
 * @param {import('multiformats/cid').CID} cid
 * @param {import('media-type')} mediaType
 * @param {string} status
 * @public
 */
export function PermitParams (cid = null, mediaType = null, status = 'pending') {
  this.cid = cid
  this.media = mediaType
  this.status = status

  /**
   * 
   * @return {boolean} 
   * @public
   */
  this.isValid = () => {
    return null != this.cid && this.cid instanceof CID && null != this.media && this.media.isValid() 
  }

  /**
   * 
   * @return {string} 
   * @public
   */
  this.mediaType = () => {
    return this.media.asString()
  }
  /**
   * @param {string} type 
   * @return {string} 
   * @public
   */
  this.mediaTypeIs = (type) => {
    return this.media.type === type
  }
  this.isAudio = () => {
    return 'audio' === this.media.type
  }
  this.isVideo = () => {
    return 'video' === this.media.type
  }
  this.isImage = () => {
    return 'image' === this.media.type
  }
  this.isText = () => {
    return 'text' === this.media.type
  }
  this.isApplication = () => {
    return 'application' === this.media.type
  }


  // /**
  //  * 
  //  * @return {boolean} 
  //  * @public
  //  */
  // this.isPending = () => {
  //   return 'pending' === this.status
  // }

  // /**
  //  * 
  //  * @return {boolean} 
  //  * @public
  //  */
  // this.isLoading = () => {
  //   return 'loading' === this.status
  // }

  // /**
  //  * 
  //  * @return {boolean} 
  //  * @public
  //  */
  // this.isError = () => {
  //   return 'error' === this.status
  // }

  // /**
  //  * 
  //  * @return {boolean} 
  //  * @public
  //  */
  // this.isComplete = () => {
  //   return 'complete' === this.status
  // }

  // /**
  //  * 
  //  * @return {boolean} 
  //  * @public
  //  */
  // this.isProsessable = () => {
  //   return !this.isLoading() && !this.isComplete()
  // }
}