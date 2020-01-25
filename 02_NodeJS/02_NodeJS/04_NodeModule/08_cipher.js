// 양방향 대칭형 암호화 : key 를 사용하여 암호화된 문자열을 복호화 할 수 있다

const crypto = require('crypto');

const cipher = crypto.createCipher('aes-256-cbc', '열쇠');
let result = cipher.update('암호화 할 문장', 'utf8', 'base64');
console.log(result);
result += cipher.final('base64');
console.log('암호화:', result);

const decipher = crypto.createDecipher('aes-256-cbc', '열쇠');
let result2 = decipher.update(result, 'base64', 'utf8');
console.log(result2);
result2 += decipher.final('utf8');
console.log('복호화:', result2);

// (node:17476) [DEP0106] DeprecationWarning: crypto.createCipher is deprecated.