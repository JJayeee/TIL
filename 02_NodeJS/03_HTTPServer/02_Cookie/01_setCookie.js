// 누가 요청을 보내는지 구분하기 위해 서버는 요청에 대한 응답을 할 때 쿠키를 함께 보낸다. 
// 서버로부터 쿠키가 오면 웹 브라우저는 쿠키를 저장해두었다가 요청할 때 마다 쿠키를 동봉해서 보낸다.
// 서버는 요청에 들어있는 쿠키를 읽어 사용자가 누구인지 파악한다.

const http = require('http');

const parseCookies = (cookie = '') => 
  cookie
    .split(';')
    .map(v => v.split('='))
    .map(([k, ...vs]) => [k, vs.join('=')])
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

    
http.createServer((req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  console.log(req.headers.cookie);
  console.log(req.url, cookies);
  res.writeHead(200, { 'Set-Cookie': 'mycookie=test' });
  res.end('Hello Cookie');
})
  .listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다!');
  });

/*
  undefined
  / { '': '' }
  mycookie=test
  /favicon.ico { mycookie: 'test' }
*/

/*
  req.headers
    {
      host: 'localhost:8082',
      connection: 'keep-alive',
      'cache-control': 'max-age=0',
      'upgrade-insecure-requests': '1',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
      'sec-fetch-user': '?1',
      accept: 'text/html,appcation/signed-exchange;v=b3;q=0.9',
      'sec-fetch-site': 'none',
      'sec-fetch-mode': 'navigate',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
      cookie: 'mycookie=test'
    }
*/