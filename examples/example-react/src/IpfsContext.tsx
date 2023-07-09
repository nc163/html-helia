import { useEffect, useContext } from 'react';
import IPFS from "ipfs-core"
import isIPFS from "is-ipfs"

export function IpfsProvider(ipfs: IPFS, props) {

    useEffect(() => {
      (async() => {
        let online = await ipfs.isOnline()
        
      })()
    }, []);

  return useContext(IpfsContext);
}