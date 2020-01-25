// html 파일을 읽어서 보내기

const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
	fs.readFile('./03_html.html', (err, data) => {
		if (err) {
			throw err;
		}
		res.end(data);
	});
}).listen(8081, () => {
	console.log('8081번 포트에서 서버 대기 중입니다!');
});
