import React from 'react';
// import logo from './logo.svg';
import useIpfsFactory from './hooks/use-ipfs-factory'
import { BufferList } from "bl"
// const cid = 'QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF'
const cid = 'QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o'
// import useIpfs from './hooks/use-ipfs'
// import {append_text, find_ipfs_cid} from "./ipfs-tag/index"

function App() {
    const { ipfs } = useIpfsFactory()

    // https://github.com/ipfs-inactive/interface-js-ipfs-core/blob/master/SPEC/FILES.md#get
    React.useEffect(() => {
        if (!ipfs || !ipfs.isOnline()) { return }
        // let tags = document.getElementsByClassName("ipfs-text") 

        (async () => {
            console.log("ipfs is online");

            const content = new BufferList()
             let data = await ipfs.get(cid)

             console.log(data);
            for await (const file of data) {
                console.log(file.path)
                for await (const chunk of file.content) {
                  content.append(chunk)
                }
            }
            console.log(content.toString())
        })();
        return () => {
            if (ipfs) ipfs.stop()
            console.log("ipfs is offline");
        }
    }, [ipfs])

    return (
    <div className="App">
      <header className="App-header">
      <div className="ipfs-text" data-cid="QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o"></div>
      </header>
    </div>
  );
}

export default App;
