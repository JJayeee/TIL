// eventListner 를 가진 node server 만들기

const http = require('http');
// http 모듈을 통해 웹 브라우저의 요청을 처리할 http 서버를 만든다.

http.createServer((req, res) => {
    // http 의 createServer method의 인자로 요청에 대한 callback function을 넣을 수 있다.
    // 요청이 들어올 때 마다 콜백 함수 res 가 실행되며, 
    // 이 곳에 response 할 내용을 적어 준다.
});