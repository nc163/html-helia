import type { UnixFS } from "@helia/unixfs";
import { CID } from 'multiformats'

/**
 *
 * @param {Helia<Libp2p>} node
 * @param {*} this.element
 * @returns {ArrayBuffer} content
 */
export async function fetchBlob(fs: UnixFS, cid: CID | string, type: string): Promise<Blob> {

  const option: { progress: Boolean, endings: EndingType} 
    = { progress: false, endings: "transparent" }
  
  /**
   * ipfs.cat
   * https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfscatipfspath-options
   * https://discuss.ipfs.tech/t/how-to-ipfs-dag-get-the-image-in-browser/15938/3
   */
  const content = [];

  if (typeof cid === "string") cid = CID.parse(cid);

  for await (const chunk of fs.cat(cid, {
    onProgress: (evt) => {
      if (option.progress) console.log('cat event', evt.type, evt.detail)
    }
  })) {
    content.push(chunk);
  }
  
  return new Blob(content, { type: type, endings: option.endings });
}
