const http = require('http');

http.createServer((req, res) => {
    res.write('<h1>Hello Node!</h1>'); // 클라이언트에게 보낼 데이터 (브라우저가 응답 내용을 렌더링)
    res.end('<p>Hello Server!</p>'); // 응답을 종료하는 메서드, 인자가 있다면 클라이언트에게 보내고 종료
}).listen(8080, () => {
    console.log('8080번 포트에서 서버 대기 중입니다!');
});

// createServer 메서드 뒤에 listen 메서드를 붙여 
// 클라이언트에게 공개할 포트 번호(8080)와 포트 연결 완료 후 실행할 콜백 함수(console)를 넣어준다. 
// 파일을 실행하면 서버는 8080 포트에서 요청이 오기를 대기한다. 


// listner 메서드에 콜백 함수 대신 
// 서버에 listning eventListener 붙이기

const http = require('http');

const server = http.createServer((req, res) => {
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
});
server.listen(8080);
server.on('listening', () => {
    console.log('8080번 포트에서 서버 대기 중입니다!');
});
server.on('error', (error) => {
    console.error(error);
});