# html-helia

## Example
Get data based on `data-ipfs-cid` and `data-ipfs-media-type`, and display based on `data-ipfs-insert` or `data-ipfs-binding`.
```html
<p data-ipfs-cid="QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o" data-ipfs-media-type="text/plain" data-ipfs-insert></p>
```

```html
<p data-ipfs-cid="QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o" data-ipfs-media-type="text/plain" data-ipfs-insert>hello world</p>
```


## demo
**[GitHub Pages](https://nc163.github.io/html-helia/)**  
<small><small>If you don't see anything after a moment, maybe my kubo-node is crashing...</small></small>


### Data-Attribute
| data attribute | Required | description | example |
| --- | --- | --- | --- |
| data-ipfs-cid | true | CID | e.g. `"QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o"` |
| data-ipfs-media-type | true | Media Type | see [Media Type](#-Media-Type) |
| data-ipfs-insert | see [binding or insert](#-binding-or-insert) |  | 'beforebegin', 'afterbegin', 'beforeend', 'afterend' | 
| data-ipfs-binding | see [binding or insert](#-binding-or-insert) |  | 'src', 'href' |


### Media Type
- text/plain
- text/html
- image/*
- audio/*
- video/*
- ....


### binding or insert
`data-ipfs-insert` is set using `element.setAttribute`.  
`data-ipfs-binding` is set using `element.insertAdjacentText` or `element.insertAdjacentHTML`.  
If neither is set, it will not be reflected in the HTML. Fires an Event with a decoded `blob` or `text` as a parameter.

### Event
EventName: html-ipfs

