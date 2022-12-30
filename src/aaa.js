

  // /**
  //  * 
  //  * @param {CID} cid 
  //  * @param {*} type 
  //  * @param {*} format 
  //  */
  // _decord(cid, type = null, format = null) {
  //   let cid = CID.parse(cid);
  //   return this._ipfs.dag.get(cid).then(function(data){
  //     return data.value.Data;
  //   }, function(e){
  //     throw e;
  //   });
  // }

  //








  // /**
  //  * 
  //  * @param {*} ipfs 
  //  */
  // *attach(ipfs) {
  //     this.__find_ipfs_element().forEach((element) => {
  //         yield this.attach(ipfs, element);
  //     });
  // }

  // /**
  //  * 
  //  * @param {IPFS} ipfs 
  //  * @param {Element} element e.g) [<div className='ipfs-tag' data-provide="ipfs" data-type="text"  data-cid="QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o"></div>]
  //  * @returns {Promise}
  //  */
  // attach(ipfs, element) {
  //     try {
  //         if (!ipfs || !ipfs.isOnline()) throw new Error("ipfs is offline");
  //         if (!Boolean(element) && !element.classList.toString().includes("ipfs-tag")) throw new Error("element is not ipfs-tag");

  //         let cid    = CID.parse(element.dataset.cid);
  //         let type   = IPFSTagDataAttributeType[element.dataset.type]
  //         let target = Document.querySelectorAll(element.dataset.target);
  //         if (!target) target = element;
  //         return attach(ipfs, cid, type, target);
  //     } catch (e) {
  //         return e
  //     }
  // }

  // /**
  //  * 
  //  * @param {IPFS} ipfs 
  //  * @param {CID} cid 
  //  * @param {String | IPFSTagDataAttributeType} type 
  //  * @param {HTMLCollection | null} targets 
  //  * @returns  {Promise} 
  //  */
  // attach(ipfs, cid, type, targets = null) {
  //     try {
  //         if (!ipfs || !ipfs.isOnline()) throw new Error("ipfs is offline");

  //         if(typeof type === "string") type = IPFSTagDataAttributeType[type];

  //         return new Promise(ipfs.dag.get(cid).then(function(data){
  //             this.__attach_switch(type, data.value.Data, targets);
  //             return
  //         }, function(e){
  //             throw e;
  //         }));
  //     } catch (e) {
  //         throw e;
  //     }
  // }

  // /**
  //  * 
  //  */
  //  __find_ipfs_element() {
  //     Document.getElementsByClassName("ipfs-tag")
  // }

  // /**
  //  * 
  //  */
  // __find_all() {
  //     let ipfs_tags = this.__find_ipfs_element.querySelectorAll("[data-provide=ipfs], [data-cid], [data-type]");
  //     this.__cids = [];
      
  //     if(ipfs_tags.length > 0) ipfs_tags.forEach((tag) => {
  //         try {
  //             let cid = CID.parse(tag.dataset.ipfsCid);
  //             this.__cids.push(cid);
  //         } catch (e) {
  //             console.error(e);
  //         }
  //     });
  // }

  // /**
  //  * 
  //  * @param {IPFSTagDataAttributeType} type 
  //  * @param {any} data 
  //  * @param {HTMLCollection} targets 
  //  */
  //  __attach_switch(type, data, targets) {
  //     switch(type) {
  //         case IPFSTagDataAttributeType.Text:  this.__attach_text(targets, data);  break;
  //         case IPFSTagDataAttributeType.Image: this.__attach_image(targets, data); break;
  //         // case IPFSTagDataAttributeType.Video: attach_video(targets, data); break;
  //         default: throw new Error("Unknown type");
  //     }
  // }

  // /**
  //  * 
  //  * @param {String} data 
  //  * @param {HTMLCollection} target 
  //  */
  // __attach_text(data, target) {
  //     // e.g) Hello World
  //     let content = new TextDecoder().decode(data)
  //     target.textContent = content;
  // }

  // /**
  //  * 
  //  * @param {*} data
  //  * @param {HTMLCollection} target 
  //  */
  // __attach_image(data, target) {
  //     throw new Error("unimplemented function"); 
  // }

}







// /**
//  * 
//  * @param {IPFS} ipfs 
//  * @param {Element} element e.g) [<div className='ipfs-tag' data-provide="ipfs" data-type="text"  data-cid="QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o"></div>]
//  * @returns {Promise | Error}
//  */
// export function attach_element(ipfs, element) {
//     try {
//         if (!ipfs || !ipfs.isOnline()) throw new Error("ipfs is offline"); 

//         let cid    = CID.parse(element.dataset.cid);
//         let type   = IPFSTagDataAttributeType[element.dataset.type]
//         let target = Document.querySelectorAll(element.dataset.target);
//         if (!target) target = element;
//         return attach(ipfs, cid, type, target);
//     } catch (e) {
//         return e
//     }
// }