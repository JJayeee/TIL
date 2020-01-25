const odd = '홀수입니다';
const even = '짝수입니다';

module.exports = {
    odd,
    even,
};

// module.exports에 객체를 대입 -> 파일이 이제 변수들을 모아둔 모듈로 기능
// 다른 파일에서 불러오면 exports에 대입된 값을 사용할 수 있다.

exports.odd = '홀수입니다';
exports.even = '짝수입니다';

// exports 를 사용할 때는 객체만 사용 가능, func.js 처럼 함수를 대입할 수는 없다.