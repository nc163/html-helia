import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const express = require('express');
// const path = require('path');
// const {fileURLToPath} = require('url');


const app = express();

app.use(express.static(path.join(__dirname, '.', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public', 'index.html'));
});

app.listen(3000, function() {
  console.log("http://localhost:3000");
});
