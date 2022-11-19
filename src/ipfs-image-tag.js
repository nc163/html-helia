import { CID } from 'multiformats/cid'

/**
 * 
 * @returns {[CID]}
 */
export const find_ipfs_text_cid = () => {
    let retval = [];
    let ipfs_tags = document.querySelectorAll("[data-ipfs-image-cid]");
    
    if(ipfs_tags.length > 0) ipfs_tags.forEach((tag) => {
        try {
            let cid = CID.parse(tag.dataset.ipfsCid);
            retval.push(cid);
        } catch (e) {
            console.error(e);
        }
    });

    return retval;
}

/**
 * 
 * @param {IPFS} ipfs
 * @param {CID} cid 
 * @returns {String | null}
 */
export const dag_text =  async (ipfs, cid) => {
    if (!ipfs || !ipfs.isOnline()) {  console.log("ipfs is offline"); return; }
    let retval = null;
    try {
        let data = await ipfs.dag.get(cid)

        // e.g) Hello World
        retval =  new TextDecoder().decode(data.value.Data)

    } catch (e) {
        console.error(e);
        retval = null
    }

    return retval
}

/**
 * 
 * @param {CID} cid
 * @param {String} text 
 */
export const  append_text = (cid, text) => {
    let ipfs_tags = document.querySelectorAll(`[data-ipfs-image-cid=${cid}]`)
    if(ipfs_tags.length > 0) for (let i = 0; i < ipfs_tags.length; i++) {
        ipfs_tags[i].textContent = text;
    }
}

