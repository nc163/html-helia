import React from 'react';
// import logo from './logo.svg';
import useIpfsFactory from './hooks/use-ipfs-factory'
import { BufferList } from "bl"

import { CID } from 'multiformats/cid'
import * as json from 'multiformats/codecs/json'
import { sha256 } from 'multiformats/hashes/sha2'
// const cid = 'QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF'
// import useIpfs from './hooks/use-ipfs'
// import {append_text, find_ipfs_cid} from "./ipfs-tag/index"

function App() {
    const { ipfs } = useIpfsFactory()

    // https://github.com/ipfs-inactive/interface-js-ipfs-core/blob/master/SPEC/FILES.md#get
    React.useEffect(() => {
        
        return () => {
            if (ipfs) ipfs.stop()
            console.log("ipfs is offline");
        }
    }, [ipfs])

    const onClick1 = async () => {
        if (!ipfs || !ipfs.isOnline()) { 
            console.log("ipfs is offline");
            return }
            console.log("ipfs is online");
        // let tags = document.getElementsByClassName("ipfs-text") 
        // const cid = new CID('QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o')
        
        const cid = CID.parse('QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o')
        const content = new BufferList()
        // https://github.com/ipfs/js-ipfs/tree/master/docs/core-api
        let data = await ipfs.dag.get(cid)
            console.log(data)
        for await (const file of data) {
            console.log(file.path)
            console.log("file.path")
            for await (const chunk of file.content) {
              content.append(chunk)
            }
        }
        console.log(content.toString())
    }

    const onClick2 = async () => {
        // if (!ipfs || !ipfs.isOnline()) { 
        //     console.log("ipfs is offline");
        //     return }
        //     const obj = {
        //         Data: "hello world",
        //         Links: []
        //       }

        // // https://github.com/ipfs/js-ipfs/tree/master/docs/core-api
        // let data = await ipfs.dag.get(obj)
        // console.log(data)
    }

    return (
    <div className="App">
      <header className="App-header">
        test
      </header>
      <div data-ipfs-cid="QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o"></div>
      <button onClick={onClick1}>get 1</button>
      <button onClick={onClick2}>get 2</button>
    </div>
  );
}

export default App;
