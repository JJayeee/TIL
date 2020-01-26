const express = require('express');
const fs = require('fs');
const app = express();

// 호스팅 된 웹페이지 도메인(20001)과 요청 api(10001)의 도메인이 다른 경우
// 크로스 도메인 이슈
// Access to fetch at 'http://localhost:10001/timestamp' from origin 'http://localhost:20001'
// has been blocked by CORS policy: Response to preflight request doesn't pass access control
// check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
// If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch
// the resource with CORS disabled.

// -> Ajax 통신 시 현재 도메인과 요청 도메인이 다르면 발생하는 문제
// 이 경우 api를 제공하는 서버(10001)에서 다른 도메인을 허용해 주어야 한다.

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
console.log('Running Server2.....');