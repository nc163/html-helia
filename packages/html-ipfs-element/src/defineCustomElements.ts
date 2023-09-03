import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs';

import type { Helia } from '@helia/interface';
import type { Libp2p, ServiceMap } from '@libp2p/interface'

import HTMLIPFSConfigElement from './HTMLIPFSConfigElement';
import {
  HTMLIPFSAudioElement,
  HTMLIPFSVideoElement,
  HTMLIPFSImageElement
} from './HTMLIPFSElements';

//
export default function defineCustomElements(createHeliaOptions = {}) {
  let customElementRegistry = window.customElements;
  customElementRegistry.define('ipfs-config', HTMLIPFSConfigElement);
  customElementRegistry.define('ipfs-img',    HTMLIPFSImageElement);
  customElementRegistry.define('ipfs-audio',  HTMLIPFSAudioElement);
  customElementRegistry.define('ipfs-video',  HTMLIPFSVideoElement);

  (async () => {
    const helia: Helia<Libp2p<ServiceMap>> = await createHelia(createHeliaOptions);
    window.helia = helia;

    let event = new Event('heliaInitialized');
    window.dispatchEvent(event);
  })();
}
