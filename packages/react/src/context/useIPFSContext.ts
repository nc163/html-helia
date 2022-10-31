import { useContext } from "react"
import { IPFSContext } from "./context";

export const useIPFSContext = () => {
    const ipfs = useContext(IPFSContext);
    return [ipfs]
}