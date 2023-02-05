import IpfsTag from 'ipfs-tag'

import useIpfsFactory from './hooks/use-ipfs-factory'
import logo from './logo.svg';
import './App.css';

function App() {

  const { ipfs } = useIpfsFactory()
  const ipfs_tag = new IpfsTag({ ipfs: ipfs, debug: true })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <spam className='ipfs-tag' data-cid='QmQzCQn4puG4qu8PVysxZmscmQ5vT1ZXpqo7f58Uh9QfyY' data-mediatype='text/html'></spam>
          <spam className='ipfs-tag' data-cid='QmcZFY95TMnf57CuVaVPUaPyLiSsCWdacSxrLZYywqLDQS' data-mediatype='text/plan' data-encord='UTF-8'></spam>
          <img  className='ipfs-tag' data-cid='QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE' data-mediatype='image/png' width={100} height={100} alt={''}/>
          <canvas className='ipfs-tag' data-cid='QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE' data-mediatype='image/png' width={100} height={100}>
            alt
          </canvas>
        </div>
        <button onClick={async () => {
          if (!ipfs) { console.debug('ipfs: ipfs is null'); return false; }
          if (!ipfs.isOnline()) { console.debug('ipfs: ipfs is offline'); return false; }

          try {
            await ipfs_tag.fetch()
          } catch (e) {
            console.error(e)
            return e
          }
        }}> test </button>
      </header>
    </div>
  );
}

export default App;
