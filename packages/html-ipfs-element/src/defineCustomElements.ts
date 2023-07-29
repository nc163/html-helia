// import { create } from 'ipfs-core'

import HTMLIPFSConfigElement from './HTMLIPFSConfigElement';
import HTMLIPFSElement from './HTMLIPFSElement';

export default function defineCustomElements() {
  let customElementRegistry = window.customElements;
  customElementRegistry.define('ipfs-tag', HTMLIPFSElement);
  customElementRegistry.define('ipfs-tag-config', HTMLIPFSConfigElement);

  (async () => {
    let options = {}
    // HTMLIPFSConfigElement.ipfsInstance = await create(options);
  })();
}
