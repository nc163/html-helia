import type { IPFS } from 'ipfs-core';

export type HTMLIPFSConfigElementType = HTMLElement | IPFSConfigElementType

export interface IPFSConfigElementType {
  ipfsInstance: IPFS;
}

export type HTMLIPFSElement = HTMLElement | IPFSElementType

export interface IPFSElementType {
  cid: string;
  mediatype: string;
  encord: string | undefined;
}
