// var.js 를 참조하는 func.js

// 자바스크립트(ES2015)의 자체 모듈 시스템 문법
// import { odd, even } from './var';

const { odd, even } = require('./02_var');
// 경로에서 .js 나 .json은 생략 가능

function checkOddOrEven(num) {
    if (num % 2) {
        return odd;
    }
    return even;
}

module.exports = checkOddOrEven;

// export default checkOddOrEven;
// 노드에서도 9버전 이후로 ES2015 모듈 시스템을 사용할 수 있으나 
// 확장자 및 실행 방법이 바뀌어야 한다.
// .mjs 
// node --experimental-modules [파일명]