// 3.6.1 동기와 비동기 (p.111~)

// 노드는 대부분의 메서드를 비동기 방식으로 처리하지만 몇몇 메서드는 동기 방식으로도 사용할 수 있다. 
// 특히 fs 모듈이 그러한 메서드를 많이 가지고 있다.

const fs = require('fs');

console.log('시작');
fs.readFile('./03_readme2.txt', (err, data) => {  
    // 비동기 메서드는 백그라운드에 요청을 보내고 다음 작업으로 넘어감
    // 읽기가 완료 되면 메인스레드는 등록된 콜백 함수를 실행한다
    if (err) { throw err; }
    console.log('1번', data.toString());
});
fs.readFile('./03_readme2.txt', (err, data) => {
    if (err) { throw err; }
    console.log('2번', data.toString());
});
fs.readFile('./03_readme2.txt', (err, data) => {
    if (err) { throw err; }
    console.log('3번', data.toString());
});
console.log('끝');

/* 
    시작
    끝
    1번 Read me!
    2번 Read me!
    3번 Read me!
*/