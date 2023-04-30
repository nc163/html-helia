import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '.', 'public')));
app.use('/esm', express.static(path.join(__dirname, '.', 'esm')));
app.use('/umd', express.static(path.join(__dirname, '.', 'umd')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public', 'index.html'));
});

app.listen(3000, function() {
  console.log("http://localhost:3000");
});
