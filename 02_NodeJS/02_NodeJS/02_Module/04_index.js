const { odd, even } = require('./02_var');
const checkNumber = require('./03_func'); 
// 모듈로부터의 변수명 checkOddOrEven을 불러올 때 다르게 지정할 수 있다.

function checkStringOddOrEven(str) {
    if (str.length % 2) {
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));