const express=require('express');
const path=require('path');

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, access_token'
  );

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

const server = express();
server.use(allowCrossDomain);
// server.use(express.static('public'));
server.use(express.static(path.join(__dirname,'public')));
server.use(express.static(path.join(__dirname,'view')));

server.get('/',(req,res)=>{
  res.render('index.html');
});

server.listen(8000, '127.0.0.1', function () {
  console.log('Server running http://127.0.0.1:8000/');
});