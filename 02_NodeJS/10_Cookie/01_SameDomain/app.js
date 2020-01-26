const express = require('express');
const fs = require('fs');
const app = express();

// 호스팅 된 웹페이지 도메인과 요청 api(timestamp)의 도메인이 동일한 경우
// 쿠키가 아주 잘 구워진다

app.get('/', (req, res) => {
    fs.readFile('./index.html', (error, data) => {
        if (error) {
            res.send('Page not found.');
        } else {
            // res.writeHead(200, {'Content-Type:': 'text/html'});
            res.end(data);
        }
    })
});


app.get('/timestamp', (req, res) => {
  console.log('route: /timestamp');
  res.cookie('timestamp', new Date()*1);
  res.send({
    result: 'true',
    message: 'success'
  });
});


app.listen(10001);
console.log('Running Server1.....');