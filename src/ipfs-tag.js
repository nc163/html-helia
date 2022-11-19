import { CID } from 'multiformats/cid'

/**
 * 
 * @returns {[HTMLCollection]}
 */
 const get_ipfs_tags = () => {
    return Document.getElementsByClassName("ipfs-tag") 
}

/**
 * 
 * @returns {[CID]}
 */
 const find_ipfs_text_cid = () => {
    let retval = [];
    let ipfs_tags = get_ipfs_tags().querySelectorAll("[data-provide=ipfs], [data-type], [data-cid]");
    
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

const IPFSTagDataAttributeType = {
	Text:  "text",
	Image: "image",
	Video: "video",
	Other: "other"
}


/**
 * 
 * @param {String} data 
 * @param {HTMLCollection} target 
 */
function attach_text(data, target) {
    // e.g) Hello World
    let content = new TextDecoder().decode(data)
    target.textContent = content;
}

/**
 * 
 * @param {*} data
 * @param {HTMLCollection} target 
 */
function attach_image(data, target) {
    throw new Error("unimplemented function"); 
}

/**
 * 
 * @param {*} data
 * @param {HTMLCollection} target 
 */
function attach_video(data, target) {
    throw new Error("unimplemented function"); 
}

/**
 * 
 * @param {IPFSTagDataAttributeType} type 
 * @param {any} data 
 * @param {HTMLCollection} targets 
 */
function attach_switch(type, data, targets) {
    switch(type) {
        case IPFSTagDataAttributeType.Text:  attach_text(targets, data);  break;
        case IPFSTagDataAttributeType.Image: attach_image(targets, data); break;
        case IPFSTagDataAttributeType.Video: attach_video(targets, data); break;
        default: throw new Error("Unknown type");
    }
}

/**
 * 
 * @param {IPFS} ipfs 
 * @param {Element} element e.g) [<div className='ipfs-tag' data-provide="ipfs" data-type="text"  data-cid="QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o"></div>]
 * @returns {Promise | Error}
 */
export function attach_element(ipfs, element) {
    try {
        if (!ipfs || !ipfs.isOnline()) throw new Error("ipfs is offline"); 

        let cid    = CID.parse(element.dataset.cid);
        let type   = IPFSTagDataAttributeType[element.dataset.type]
        let target = Document.querySelectorAll(element.dataset.target);
        if (!target) target = element;
        return attach(ipfs, cid, type, target);
    } catch (e) {
        return e
    }
}

/**
 * 
 * @param {IPFS} ipfs 
 * @param {CID} cid 
 * @param {String | IPFSTagDataAttributeType} type 
 * @param {HTMLCollection} targets 
 * @returns  {Promise | Error}
 */
export function attach(ipfs, cid, type, targets = null) {
    try {
        if (!ipfs || !ipfs.isOnline()) throw new Error("ipfs is offline");

        if(typeof type === "string") type = IPFSTagDataAttributeType[type];

        return new Promise(ipfs.dag.get(cid).then(function(data){
            attach_switch(type, data.value.Data, targets);
            return
        }, function(e){
            throw e;
        }));
    } catch (e) {
        throw e;
    }
}