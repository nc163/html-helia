declare module 'media-type';

type ParsedIPFSTagType = {
  cid: CID;
  mediatype: {
    type: string
    subtype: string
  }
  encord: string | undefined
}

type HTMLIpfsTagElement = HTMLMediaElement | HTMLElement | HTMLImageElement