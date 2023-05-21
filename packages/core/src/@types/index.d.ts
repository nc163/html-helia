import type { IPFS } from 'ipfs-core'
import type { CID } from 'multiformats'

type HTMLIpfsTagElement = HTMLMediaElement | HTMLElement | HTMLImageElement

interface ParsedIPFSTagType {
  cid: string;
  mediatype: {
    type: string
    subtype: string
  }
  encord: string | undefined
}

interface IpfsTagParseProps {
  ipfs: IPFS;
  cid: string | CID;
  type: string;
  subtype: string;
  encord?: string;
}
