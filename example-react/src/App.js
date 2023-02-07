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
          <span className='ipfs-tag' data-cid='QmcZFY95TMnf57CuVaVPUaPyLiSsCWdacSxrLZYywqLDQS' data-mediatype='text/plain' data-encord='UTF-8'></span>
        </div>
        <div>
          <p>image</p>
          <img  className='ipfs-tag' data-cid='QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE' data-mediatype='image/png' width={100} height={100} alt={''}/>
          <canvas className='ipfs-tag' data-cid='QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE' data-mediatype='image/png' width={100} height={100}>
            alt
          </canvas>
        </div>
        <div>
          <p>beep wav</p>
          <audio controls className='ipfs-tag' data-cid="QmPcY4qe9vr3CA3HgXANaBVQEkWeJsBT4zGiffuJ2GKjCv" data-mediatype="audio/wav"></audio>
        </div>
        <div>
          <p>music(acc)</p>
          <audio controls className='ipfs-tag' data-cid="QmX8tKFVBvBVTZHEyoDBt3Ggv72BwxoGYfacxWk7oC8jcZ" data-mediatype="audio/acc"></audio>
        </div>
        <div>
          <p>music(ogg)</p>
          <audio controls className='ipfs-tag' data-cid="QmQMSETDxN3kawQkLDMfeAModdtCKLqPXrkuVydd8Q683R" data-mediatype="audio/ogg"></audio>
        </div>
        <div>
          <p>video(mp4)</p>
          <video controls className='ipfs-tag' data-cid="QmTca4A43f4kEvzTouvYTegtp6KobixRqweV12NrvwwtFP" data-mediatype="video/mp4"></video>
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
