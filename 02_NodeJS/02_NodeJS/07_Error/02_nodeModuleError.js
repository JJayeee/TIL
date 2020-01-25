/* 
    2. 노드 자체에서 잡아주는 에러
        내장 모듈의 에러는 실행 중인 프로세스를 멈추지 않는다. 
        에러 로그를 기록해두고 나중에 원인을 찾아 수정할 수 있다.
*/

const fs = require('fs');

setInterval(() => {
    fs.unlink('./abcdfg.js', (err) => {
        if (err) { console.error(err); }
    });
}, 1000);

/* 
    [Error: ENOENT: no such file or directory, unlink 'C:\Users\abcdfg.js'] {
    errno: -4058,
    code: 'ENOENT',
    syscall: 'unlink',
    path: 'C:\\Users\\02_NodeJS\\07_error\\abcdfg.js'    
    }

    반복
*/