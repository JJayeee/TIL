const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('./03_readme2.txt');
// readFileSync, call back 함수 대신 직접 return 값을 받아온다
console.log('1번', data.toString());
data = fs.readFileSync('./03_readme2.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./03_readme2.txt');
console.log('3번', data.toString());
console.log('끝');