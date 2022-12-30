import { useEffect } from 'react';
import IpfsTag from 'ipfs-tag'

import useIpfsFactory from './hooks/use-ipfs-factory'
import logo from './logo.svg';
import './App.css';

function App() {

  const { ipfs } = useIpfsFactory()
  const ipfs_tag = new IpfsTag({ debug: true })

  useEffect(() => {
    (async () => {
      try {
        await ipfs_tag.attach(ipfs, document)
      } catch (e) {
          console.error(e)
          return e
      }
    })()
  }, [ipfs]);

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
        <div className='ipfs-tag' data-type="text"  data-cid="QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o"></div>
        <div className='ipfs-tag' data-type="image" data-cid="QmUQzaHKA5qx1rnuj3mve9NzVGEjsmFqjXyhynoXcU1pvJ"></div>
      </header>
    </div>
  );
}

export default App;
