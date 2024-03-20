import { createHelia } from 'helia';
import HtmlIpfs from '@html-helia/html-helia';

window.onload = async function () {
  let helia = await createHelia();
  let htmlIpfs = new HtmlIpfs(helia);

  let children = document.querySelector('body').children;
  for (let i = 0; i < children.length; i++) {
    let element = children[i];
    element.addEventListener('html-ipfs-status-change', function(event, data, status) {
      if("complete" != event.detail.status) return;
      for (let j = 0; j < event.target.children.length; j++) {
        htmlIpfs.fetch(event.target.children[j]);
      }
    });
  }

  for (let i = 0; i < children.length; i++) {
    let element = children[i];
    htmlIpfs.fetch(element);
  }
}
