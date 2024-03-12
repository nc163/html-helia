

```jsx
<ipfs-config>
  <ipfs cid="" media-type=""></ipfs>
  <ipfs cid="" media-type=""></ipfs>
  <ipfs cid="" media-type=""></ipfs>
</ipfs-config>
```





# core

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

## demo
[**react demo**](https://nc163.github.io/ipfs-tag/react/)

## example
```html
  ...
  <script src="https://cdn.jsdelivr.net/npm/ipfs/dist/index.min.js"></script>
  <script type="text/javascript" src="ipfs-tag.js"></script>
</head>
<body>
  <span data-cid="QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o" data-mediatype="text/plain" ></span>
  <img  data-cid="QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE" data-mediatype="image/png" />
  <audio controls data-cid="QmfVYAvkFLorquVyTvMSnuJBniwzDArChjHoFexYPTodk2" data-mediatype="audio/mp3"></audio>
  <video controls data-cid="xxx" data-mediatype="video/mpeg"></video>
  ...
```

## example-react
see example-react
