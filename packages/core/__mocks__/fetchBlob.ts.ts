import fs from 'fs';

// fetchBlob(fs: UnixFS, cid: CID | string, type: string, endings: EndingType = "transparent")
async function fetchBlob(filePath: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const blob = new Blob([data], { type: 'image/jpeg' }); // ここではJPEG画像として扱いますが、適切なMIMEタイプを指定してください。
        resolve(blob);
      }
    });
  });
}

export default fetchBlob;