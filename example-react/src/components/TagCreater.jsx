import { createElement, useState } from 'react';

function TagCreater(props) {
  const [tagName, setTagName] = useState('div');
  const [cid, setCid] = useState(null);
  const [metadata, setMetadata] = useState('text/plan');

  const createHtmlTag = (props) => {
    props.onCreate(createElement(tagName, { "data-cid": cid, "data-metadata": metadata }))
  }

  return (
    <div>
      <input type="text" placeholder='tagName' onChange={e => setTagName(e.target.value)} value={tagName} />
      <input type="text" placeholder='cid' onChange={e => setCid(e.target.value)} value={cid} />
      <input type="text" placeholder='metadata' onChange={e => setMetadata(e.target.value)} value={metadata} />
      <button onClick={createHtmlTag}>create html tag</button>
    </div>
  );
}

export default TagCreater;