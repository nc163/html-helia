

```html
<body>
  <ipfs-config>
    <ipfs-image cid='QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE' type='image/png'>
    <ipfs-canvas cid='QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE' type='image/png'>
  </ipfs-config>
</body>
```

## memo
https://stackoverflow.com/questions/66691690/how-to-properly-extend-htmlimageelement
https://github.com/WICG/webcomponents/issues/509


これを実行時に発生するエラーについて
```bash
> @ipfs-tag/html-ipfs-data-attributes-element@1.0.0 :bundle
> rimraf example/public/js && rollup -c


dist/index.js → example/public/js...
```


```bash
(!) Unresolved dependencies
https://rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency
node:fs/promises (imported by "../../node_modules/@helia/unixfs/dist/src/utils/glob-source.js")
fs/promises (imported by "../../node_modules/it-glob/dist/src/index.js")
node:path (imported by "../../node_modules/@helia/unixfs/dist/src/utils/glob-source.js", "../../node_modules/execa/index.js" and "../../node_modules/npm-run-path/index.js")
node:fs (imported by "../../node_modules/@helia/unixfs/dist/src/utils/glob-source.js", "../../node_modules/execa/lib/pipe.js" and "../../node_modules/execa/lib/stream.js")
crypto (imported by "../../node_modules/multiformats/src/hashes/sha2.js", "../../node_modules/@helia/unixfs/node_modules/multiformats/src/hashes/sha2.js", "../../node_modules/nanoid/index.js", "../../node_modules/ipfs-unixfs-importer/node_modules/multiformats/src/hashes/sha2.js", "../../node_modules/@libp2p/crypto/dist/src/hmac/index.js", "../../node_modules/@libp2p/crypto/dist/src/keys/ecdh.js", "../../node_modules/@libp2p/crypto/dist/src/keys/ed25519.js", "../../node_modules/@libp2p/crypto/dist/src/keys/rsa.js", "../../node_modules/@libp2p/crypto/dist/src/ciphers/aes-gcm.js", "../../node_modules/@libp2p/crypto/dist/src/aes/ciphers.js", "../../node_modules/ipns/node_modules/multiformats/src/hashes/sha2.js", "../../node_modules/ipns/node_modules/@libp2p/crypto/dist/src/keys/ecdh.js", "../../node_modules/ipns/node_modules/@libp2p/crypto/dist/src/keys/ed25519.js", "../../node_modules/ipns/node_modules/@libp2p/crypto/dist/src/keys/rsa.js", "../../node_modules/ipns/node_modules/@libp2p/crypto/dist/src/ciphers/aes-gcm.js", "../../node_modules/ipns/node_modules/@libp2p/crypto/dist/src/hmac/index.js", "../../node_modules/@achingbrain/ssdp/dist/src/default-ssdp-options.js" and "../../node_modules/@noble/secp256k1/lib/esm/index.js")
path (imported by "../../node_modules/it-glob/dist/src/index.js" and "../../node_modules/@libp2p/tcp/dist/src/utils.js")
net (imported by "../../node_modules/@libp2p/tcp/dist/src/index.js", "../../node_modules/@libp2p/tcp/dist/src/listener.js" and "../../node_modules/freeport-promise/dist/src/index.js")
cluster (imported by "../../node_modules/mortice/dist/src/node.js")
os (imported by "../../node_modules/@libp2p/websockets/dist/src/listener.js", "../../node_modules/@libp2p/tcp/dist/src/utils.js", "../../node_modules/@achingbrain/nat-port-mapper/dist/src/index.js" and "../../node_modules/@achingbrain/ssdp/dist/src/advertise/find-all-interfaces.js")
http (imported by "../../node_modules/it-ws/dist/src/server.js", "../../node_modules/@achingbrain/nat-port-mapper/dist/src/upnp/fetch.js", "../../node_modules/@achingbrain/ssdp/dist/src/advertise/create-location.js" and "../../node_modules/@achingbrain/ssdp/dist/src/fetch.js")
https (imported by "../../node_modules/it-ws/dist/src/server.js", "../../node_modules/@achingbrain/nat-port-mapper/dist/src/upnp/fetch.js" and "../../node_modules/@achingbrain/ssdp/dist/src/fetch.js")
node:net (imported by "../../node_modules/default-gateway/index.js")
node:os (imported by "../../node_modules/default-gateway/index.js", "../../node_modules/execa/lib/kill.js", "../../node_modules/human-signals/build/src/main.js" and "../../node_modules/human-signals/build/src/signals.js")
dns/promises (imported by "../../node_modules/@multiformats/multiaddr/dist/src/resolvers/dns.js")
dgram (imported by "../../node_modules/@achingbrain/nat-port-mapper/dist/src/pmp/index.js" and "../../node_modules/@achingbrain/ssdp/dist/src/create-sockets.js")
node:buffer (imported by "../../node_modules/execa/index.js" and "../../node_modules/execa/lib/command.js")
node:child_process (imported by "../../node_modules/execa/index.js", "../../node_modules/execa/lib/pipe.js" and "../../node_modules/execa/lib/command.js")
node:process (imported by "../../node_modules/execa/index.js", "../../node_modules/execa/lib/error.js", "../../node_modules/execa/lib/verbose.js" and "../../node_modules/npm-run-path/index.js")
node:util (imported by "../../node_modules/execa/lib/verbose.js")
node:url (imported by "../../node_modules/npm-run-path/index.js")
module (imported by "../../node_modules/@achingbrain/ssdp/dist/src/default-ssdp-options.js")
```

```bash
(!) "this" has been rewritten to "undefined"
https://rollupjs.org/troubleshooting/#error-this-is-undefined
../../node_modules/p-queue/dist/index.js
1: var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
                                 ^
2:     if (kind === "m") throw new TypeError("Private method is not writable");
3:     if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
...and 3 other occurrences
../../node_modules/merge-options/index.js
11: });
12: 
13: const globalThis = this;
                       ^
14: const defaultMergeOptions = {
15:   concatArrays: false,
../../node_modules/p-queue/dist/priority-queue.js
1: var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
                                 ^
2:     if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
3:     if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot re...
...and 1 other occurrence

...and 6 other files
```


### これは既知の警告で無視して問題ない
https://github.com/libp2p/js-libp2p/issues/1921
```bash
(!) Circular dependencies
../../node_modules/@chainsafe/netmask/dist/src/ip.js -> ../../node_modules/@chainsafe/netmask/dist/src/util.js -> ../../node_modules/@chainsafe/netmask/dist/src/ip.js
../../node_modules/@multiformats/multiaddr/dist/src/index.js -> ../../node_modules/@multiformats/multiaddr/dist/src/filter/multiaddr-filter.js -> ../../node_modules/@multiformats/multiaddr/dist/src/index.js
../../node_modules/@libp2p/multistream-select/dist/src/index.js -> ../../node_modules/@libp2p/multistream-select/dist/src/select.js -> ../../node_modules/@libp2p/multistream-select/dist/src/index.js
../../node_modules/libp2p/dist/src/dcutr/index.js -> ../../node_modules/libp2p/dist/src/dcutr/dcutr.js -> ../../node_modules/libp2p/dist/src/dcutr/index.js
dist/HTMLIPFSElements/index.js -> dist/HTMLIPFSElements/HTMLIPFSImageElement.js -> dist/HTMLIPFSElements/index.js
```


### エラー
```bash
[!] RollupError: "default" is not exported by "../../node_modules/debug/src/index.js", imported by "../../node_modules/helia/node_modules/@libp2p/logger/dist/src/index.js".
https://rollupjs.org/troubleshooting/#error-name-is-not-exported-by-module
../../node_modules/helia/node_modules/@libp2p/logger/dist/src/index.js (1:7)
1: import debug from 'debug';
          ^
2: import { base32 } from 'multiformats/bases/base32';
3: import { base58btc } from 'multiformats/bases/base58';
    at error (/Volumes/KIOXIA/Workspace/ipfs-tag/node_modules/rollup/dist/shared/rollup.js:349:30)
    at Module.error (/Volumes/KIOXIA/Workspace/ipfs-tag/node_modules/rollup/dist/shared/rollup.js:15164:16)
    at Module.traceVariable (/Volumes/KIOXIA/Workspace/ipfs-tag/node_modules/rollup/dist/shared/rollup.js:15594:29)
    at ModuleScope.findVariable (/Volumes/KIOXIA/Workspace/ipfs-tag/node_modules/rollup/dist/shared/rollup.js:14044:39)
    at MemberExpression.bind (/Volumes/KIOXIA/Workspace/ipfs-tag/node_modules/rollup/dist/shared/rollup.js:10979:49)
    at AssignmentExpression.bind (/Volumes/KIOXIA/Workspace/ipfs-tag/node_modules/rollup/dist/shared/rollup.js:7361:23)
    at ExpressionStatement.bind (/Volumes/KIOXIA/Workspace/ipfs-tag/node_modules/rollup/dist/shared/rollup.js:7361:23)
    at Program.bind (/Volumes/KIOXIA/Workspace/ipfs-tag/node_modules/rollup/dist/shared/rollup.js:7357:28)
    at Module.bindReferences (/Volumes/KIOXIA/Workspace/ipfs-tag/node_modules/rollup/dist/shared/rollup.js:15160:18)
    at Graph.sortModules (/Volumes/KIOXIA/Workspace/ipfs-tag/node_modules/rollup/dist/shared/rollup.js:26218:20)

```