// http2 모듈은 SSL 암호화 + 최신 HTTP 프로토콜인 http/2 를 사용할 수 있게 해 준다
// http/2 는 요청 및 응답 방식이 기존 http/1.1 보다 개선되어 효율적으로 요청을 보낸다.


const http2 = require('http2');
const fs = require('fs');

https.createSecureServer({
  cert: fs.readFileSync('도메인 인증서 경로'),
  key: fs.readFileSync('도메인 비밀키 경로'),
  ca: [
    fs.readFileSync('상위 인증서 경로'),
    fs.readFileSync('상위 인증서 경로'),
  ], 
}, (req, res) => {
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
}).listen(443, () => {
  console.log('443번 포트에서 서버 대기 중입니다!');
});