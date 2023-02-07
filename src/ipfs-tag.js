import { IpfsTagElement } from './ipfs-tag-element.js'

export function IpfsTag({ipfs, options = null}) {

  const defaultOptions = {
    targetClassName: 'ipfs-tag',
    // targetCidAttributeName: 'cid',
    // targetMediaTypeAttributeName: 'mediatype',
    auto: false,
    timeout: 5000,
    debug: false
  }
  const { targetClassName, timeout, debug } = Object.assign(defaultOptions, options); 

  const display = async () => {

    const elements = document.getElementsByClassName(targetClassName)
    for(let i = 0 ; i < elements.length ; i++) {
      const ipfsTagElement = new IpfsTagElement(ipfs, elements[i]);

      await ipfsTagElement.display()
    }
  }

  return { display }
}
