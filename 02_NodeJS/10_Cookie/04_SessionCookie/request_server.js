const express = require('express');
const fs = require('fs');
const app = express();

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


app.listen(20001);  // 포트를 20001으로 변경한 상태
console.log('Running Server2 include credentials.....');