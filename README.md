# ipfs-tag
ipfs-tag is a library for fetch data from IPFS and displaying it on a page.

### TODOLIST
- [x] text/plain
- [x] image/*
- [x] audio/*
- [x] video/*
- [ ] text/css
- [ ] text/html
- [ ] callback

## install
`npm i ipfs-tag`

## example
```html
  ...
  <script src="https://cdn.jsdelivr.net/npm/ipfs/dist/index.min.js"></script>
  <script type="text/javascript" src="ipfs-tag.js"></script>
  <script type="text/javascript">
    const { display } = IpfsTag({ipfs})
    display()
  </script>
</head>
<body>
  <span class='ipfs-tag' data-cid="QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o" data-mediatype="text/plain" ></span>
  <img class='ipfs-tag' data-cid="QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE" data-mediatype="image/png" />
  <audio controls class='ipfs-tag' data-cid="QmfVYAvkFLorquVyTvMSnuJBniwzDArChjHoFexYPTodk2" data-mediatype="audio/mp3"></audio>
  <video controls class='ipfs-tag' data-cid="xxx" data-mediatype="video/mpeg"></video>
  ...
```

## example-react
see example-react
