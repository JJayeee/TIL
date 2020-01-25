const fs = require('fs');

fs.readFile('./01_readme.md', (err, data) => { // 메서드 안에 콜백 함수가 같이 들어간다
    if (err) { throw err; }
    // '../../reference.md'
    // [Error: ENOENT: no such file or directory, open 'C:\Users\nodejs_practice\02_NodeJS\reference.md'
    console.log(data);
    // <Buffer 23 23 20 ec b0 b8 ea b3 a0 0d 0a 0d 0a ... 127 more bytes>
    console.log(data.toString());
    // ## 참고
    //   - NodeJS Buffer and Stream
});