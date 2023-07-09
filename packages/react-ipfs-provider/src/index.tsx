import type { Options } from "ipfs-core"

import IPFS from "ipfs-core"

import React, { ReactComponentElement, createContext, useEffect, useState } from "react"

const IpfsContext: React.Context<Options | {}> = createContext({});

const IpfsProvider = (options: Options ReactNode) => {
  
  const [node, setNode] = useState({});

  useEffect(() => {
    const create = async() => {
        if (node) return;
        
        let _node = await IPFS.create(options);
        setNode(_node);
      }
      create();
    }, [options]);


  return <IpfsContext.Provider value={node}>{children}</IpfsContext.Provider>
}

export {IpfsProvider, IpfsContext};





