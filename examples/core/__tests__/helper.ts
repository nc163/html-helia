import fs from "fs/promises"

export async function createBlobFromFilePath(filePath) {
  try {
    // ファイルを読み込む
    const data = await fs.readFile(filePath);

    // ファイルデータをBlobに変換
    const blob = new Blob([data]);

    return blob;
  } catch (err) {
    console.error('Error reading file:', err);
  }
}