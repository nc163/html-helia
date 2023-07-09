import { IPFS } from 'ipfs-core';
import type { IPFSTagFetchContextType } from '@types'

/**
 * 
 * @param {*} ipfs 
 * @param {*} this.element 
 * @returns {ArrayBuffer} content
 */
async function fetch(ipfs: IPFS, context: IPFSTagFetchContextType): Promise<Blob> {

  /**
   * ipfs.cat
   * https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfscatipfspath-options
   * https://discuss.ipfs.tech/t/how-to-ipfs-dag-get-the-image-in-browser/15938/3
   */
  const content = [];

  for await (const chunk of ipfs.cat(context.cid)) {
    content.push(chunk);
  }

  const blob = new Blob(content, { type: context.mediatype.type });
  return blob
}

export default fetch