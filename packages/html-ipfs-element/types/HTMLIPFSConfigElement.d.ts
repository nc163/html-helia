import type { IPFS } from 'ipfs-core';

type HTMLIPFSConfigElementType = HTMLElement | IPFSConfigElementType

interface IPFSConfigElementType {
  ipfsInstance: IPFS;
}
