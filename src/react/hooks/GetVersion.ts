import { useIPFSContext } from "../";

export const Stop = (cid: string) => {
    const [ipfs] = useIPFSContext();
    if (ipfs == null) { return }
    
    return ipfs.stop()
}

export const isOnline = (cid: string): Boolean  => {
    const [ipfs] = useIPFSContext();
    if (ipfs == null) { return false }
    return ipfs.isOnline()
}

export const GetVersion = async () => {
    const [ipfs] = useIPFSContext();
    if (ipfs == null) { return }
    return ipfs.version();
}
