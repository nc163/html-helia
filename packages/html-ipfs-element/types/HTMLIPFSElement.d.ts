type HTMLIPFSElement = HTMLElement | IPFSElementType

interface IPFSElementType {
  cid: string;
  mediatype: string;
  encord: string | undefined;
}
