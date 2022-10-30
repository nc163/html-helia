import { createContext } from "react"
import { IPFS } from 'ipfs-core'

export const IPFSContext = createContext<IPFS | null>(null);
