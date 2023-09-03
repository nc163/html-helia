import type { Helia } from '@helia/interface';
import type { Libp2p, ServiceMap } from '@libp2p/interface'
import type { UnixFS } from '@helia/unixfs'

declare global {
  interface Window {
    helia: Helia<Libp2p<ServiceMap>>;
    // unixFs: UnixFS;
  }
}