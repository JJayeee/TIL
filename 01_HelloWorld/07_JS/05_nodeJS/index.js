const http = require('http');
const port = 3001;

http.createServer((req, res) => {
    res.writeHead(404, {
        'Content-Type': 'text/plain',
    });
    res.statusCode = 200;
    // res.write('Lunch Time!');
    res.end('End of response\n');
}).listen(port);

console.log(`Server is running @ http://localhost:${port}`);

// 오직 node js를 통해, 기본 모듈로 서버를 직접 만든 것
// $ node index.js
// Server is running @ http://localhost:3001
// 얘는 끄는 것도 직접 꺼야 한다. 우린 프레임 워크를 쓸 것