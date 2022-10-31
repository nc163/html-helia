import { createContext } from "react"
import { IPFS } from "ipfs-core-types"

export const IPFSContext = createContext<IPFS | null>(null);
