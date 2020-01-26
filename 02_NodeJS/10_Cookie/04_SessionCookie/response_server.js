const express = require('express');
const fs = require('fs');
const cors = require('cors');
const response_server = express();

const corsOptions = {
  origin: 'http://localhost:20001',
  // methods: 'GET',
  credentials: true
};

response_server.use(cors(corsOptions));

const authToken = 'testtoken1234';
const userId = 'jay';
const userPw = '1234';
const userInfo = {
  username: 'JJayeee',
  nickname: 'cookieMaster'
};

response_server.get('/auth', (req, res) => {
  console.log('route: /auth');
  const id = req.query['id'];
  const pw = req.query['pw'];

  if (id === userId && pw === userPw) {
    res.cookie('token', authToken, {
      httpOnly: true,
    });
    res.send({
      result: 'true',
      message: 'success',
    });
  } else {
    res.send({
      result: 'false',
      message: 'fail',
    });
  }
});


response_server.get('/info', (req, res) => {
  console.log('route: /info');

  const cookie = req.headers.cookie;
  console.log('cookie: ', cookie);

  if (cookie && cookie.indexOf('token=' + authToken) > -1) {
    console.log(cookie.indexOf('token=' + authToken));
    res.send({
      result: 'true',
      message: userInfo,
    });
  } else {
    res.send({
      result: 'false',
      message: '인증 오류',
    });
  }
});

response_server.get('/logout', (req, res) => {
  console.log('route: /logout');

  const cookie = req.headers.cookie;
  console.log('cookie: ', cookie);
  res.cookie('token', '', { maxAge:0 });
  res.send({
    result: 'true',
    message: 'expired',
  });
});


response_server.listen(10001);
console.log('Running Server2: enable cors + 20001.....');