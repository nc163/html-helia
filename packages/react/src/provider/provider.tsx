import { IPFS } from "ipfs-core-types"
import * as React from "react"
import { create } from 'ipfs-core'
import { IPFSContext } from "../index"

export function IPFSTagProvider({ children }: React.PropsWithChildren<React.ReactNode>) {

    const [ipfs, setIpfs] = React.useState<IPFS | null>(null);
    const [isReady, setIsReady] = React.useState<Boolean>(false)
    const [initError, setinitError] = React.useState<Error | unknown>(null)

    React.useEffect(() => {
        (async() => {
            let _ipfs 
            try {
                console.time('IPFS Started')
                _ipfs = await create()
                console.timeEnd('IPFS Started')
              } catch (error) {
                console.error('IPFS init error:', error)
                _ipfs = null
                setinitError(error)
              }
              setIsReady(Boolean(_ipfs))
              setIpfs(_ipfs);
          })()
          return function cleanup () {
            if (ipfs && ipfs.stop) {
              console.log('Stopping IPFS')
              ipfs.stop().catch(err => console.error(err))
              setIpfs(null);
              setIsReady(false)
            }
          }  
    })

  return (<IPFSContext.Provider value={ipfs} >
        {children}
    </IPFSContext.Provider>
  )
}
