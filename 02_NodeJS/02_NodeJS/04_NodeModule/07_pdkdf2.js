const crypto = require('crypto');

crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64');
    console.log('salt:', salt);
    crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
        console.log('password:', key.toString('base64'));
    });
    /*
        salt를 key와 같이 저장해야 한다는 것을 꼭 기억하세요! 
        randomBytes 메소드는 매번 다른 salt값을 뱉어내기 때문에 암호화 매번 결과가 달라집니다. 
        같은 salt값으로 비밀번호를 찾아야 비교가 가능합니다. 
        또한 반복 횟수, 비밀번호 길이, 해시 알고리즘, 인코딩 방식까지 다 같아야 같은 결과가 나옵니다.
    */
    crypto.pbkdf2('입력 비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
        console.log(key.toString('base64') === '기존 비밀번호');
    });
});



