import HTMLIPFSConfigElement from './HTMLIPFSConfigElement';
import HTMLIPFSElement from './HTMLIPFSElement';
import {
  HTMLIPFSImageElement
} from './HTMLIPFSElements';

//
export default function defineCustomElements() {
  let customElementRegistry = window.customElements;
  customElementRegistry.define('ipfs-config', HTMLIPFSConfigElement);
  customElementRegistry.define('ipfs-element', HTMLIPFSElement);
  
  customElementRegistry.define('ipfs-image', HTMLIPFSImageElement);

  (async () => {
    let options = {}
    // HTMLIPFSConfigElement.ipfsInstance = await create(options);
  })();
}
