// createReadStream 으로 파일을 읽고, 그 스트림을 전달받아 createWriteStream 으로 파일 쓰기
// 파일 복사와 비슷하며, 스트림끼리 연결하는 것을 '파이핑한다'고 표현한다. 

// node 8.5 버전 이전 방식, 새로운 방식은 13_copyFile.js 참고

const fs = require('fs');

const readStream = fs.createReadStream('09_readme4.txt');
const writeStrem = fs.createWriteStream('09_writeme3.txt');
readStream.pipe(writeStrem);