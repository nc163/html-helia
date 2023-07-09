import type { IPFS } from 'ipfs-core'
import { fetch } from '@ipfs-tag/core'
import type { CID } from 'multiformats/cid'

import { useEffect, useState } from 'react'

import { parse } from "@ipfs-tag/core"

type IpfsTagProps = {
  ipfs: IPFS;
  cid: string | CID;
  type: string;
  subtype: string;
  encord?: string;
}

/**
 * 
 * @param {*} props 
 * e.g) <ipfstag ipfs cid="QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o" type="text/plain" ></ipfstag>
 * @returns 
 */
function IpfsTag(ipfs: IPFS, context: {cid: string, type: string, subtype: string, encord: string}) {

  fetch(ipfs, {  }).then((res) => {

  return <>
  </>
}
/**
 */