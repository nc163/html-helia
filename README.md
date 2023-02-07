# ipfs-tag
ipfs-tag is a library for fetch data from IPFS and displaying it on a page.

### TODOLIST
- [x] text/plan
- [ ] image/png
- [ ] text/css
- [ ] audio/*
- [ ] video/*
- [ ] text/html
- [ ] callback

## example
```html
  ...
  <script src="https://cdn.jsdelivr.net/npm/ipfs/dist/index.min.js"></script>
  <script type="text/javascript" src="ipfs-tag.js"></script>
  <script type="text/javascript">
    // let ipfs = create(****)
    let { display } = ipfsTag();
    display()
    // or 
    display(element)
  </script>
</head>
<body>
  <span class='ipfs-tag' data-cid="QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o" data-mediatype="text/plan" ></span>
  <img class='ipfs-tag' data-cid="QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE" data-mediatype="image/png" />
  <audio class='ipfs-tag' data-cid="xxx" data-mediatype="audio/mp3"></audio>
  <video class='ipfs-tag' data-cid="xxx" data-mediatype="video/mpeg"></video>
  ...
```

## example-react
```javascript
import { IPFSElement } from '@ipfs-tag/react';

export const Example = () => {
  return (
    <div>
      <IPFSElement cid={cid} mediatype="text/plan" />
      {/* or */}
      <IPFSElement cid={"QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o"} mediatype="text/plan" />
    </div>
  )
}

```
