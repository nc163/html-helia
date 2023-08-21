import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs';
import HTMLIPFSConfigElement from './HTMLIPFSConfigElement';
import HTMLIPFSElement from './HTMLIPFSElement';
import {
  HTMLIPFSImageElement
} from './HTMLIPFSElements';

//
export default function defineCustomElements(createHeliaOptions = {}) {
  let customElementRegistry = window.customElements;
  customElementRegistry.define('ipfs-config', HTMLIPFSConfigElement);
  customElementRegistry.define('ipfs-image', HTMLIPFSImageElement);

  (async () => {
    let helia = await createHelia(createHeliaOptions);
    HTMLIPFSConfigElement.unixFs = unixfs(helia);
  })();
}
