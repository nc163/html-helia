import { IpfsTag } from 'ipfs-tag'

import useIpfsFactory from './hooks/use-ipfs-factory'
import logo from './logo.png';
import './App.css';

function App() {

  const { ipfs } = useIpfsFactory()
  const { display } = IpfsTag({ipfs})

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {Boolean(ipfs) === false ? <p>IPFS is not ready.</p> : (
      <div>
        <h2>ipfs-tag example</h2>
        <div id='example'>
          <span className='ipfs-tag' data-cid='QmQzCQn4puG4qu8PVysxZmscmQ5vT1ZXpqo7f58Uh9QfyY' data-mediatype='text/html'></span>
          <span className='ipfs-tag' data-cid='QmcZFY95TMnf57CuVaVPUaPyLiSsCWdacSxrLZYywqLDQS' data-mediatype='text/plain' data-encord='UTF-8'></span>
          <img  className='ipfs-tag' data-cid='QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE' data-mediatype='image/png' width={100} height={100} alt={''}/>
          <canvas className='ipfs-tag' data-cid='QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE' data-mediatype='image/png' width={100} height={100}>
            alt
          </canvas>
          <style className='ipfs-tag' data-cid='QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE' data-mediatype='image/png'>

          </style>
        </div>
        <button onClick={async () => {
          try {
            await display()
          } catch (e) {
            console.error(e)
            return e
          }
        }}> get</button>
      </div>)}
    </div>
  );
}

export default App;
