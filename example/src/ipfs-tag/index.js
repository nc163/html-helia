// export function find_ipfs_tag() {
//     let retval = []
//     retval.push(
//         // ...document.getElementsByTagName("ipfs"),
//         // ...document.getElementsByTagName("ipfs-img"),
//         ...document.getElementsByTagName("ipfs-text").getElementsByTagName("cid").value,
//         // ...document.getElementsByTagName("ipfs-video")
//     )

//     return retval
// }

export function find_ipfs_cid() {
    let retval = []
    retval.push(
        // ...document.getElementsByTagName("ipfs"),
        // ...document.getElementsByTagName("ipfs-img"),
        document.getElementsByTagName("ipfs-text").getElementsByTagName("data-cid").value
        // ...document.getElementsByTagName("ipfs-video")
    )

    return retval
}

export function append_text(cid, text) {
    let cids = document.querySelectorAll("[data-cid=" + cid + "]")
    for (let i = 0; i < cids.length; i++) {
        cids[i].textContent = text;
    }
}

