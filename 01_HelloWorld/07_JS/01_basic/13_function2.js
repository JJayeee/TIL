// 1. 선언형 (; X)
function a (x, y) {
    return x + y
}

// 2. 할당형 (= ;)
const b = function (x, y) {
    return x + y
};

// 3. errow function (할당형)
const c = (x, y) => {
    return x + y
};

// 3-1. 짧게: 함수 block에 코드가 return 문 한 줄 일 경우에 {} + return 함께 생략 가능
const d = (x, y) => x + y; 

// 3-2. 짧게: 함수의 인자가 단 하나 일 때 () 생략 가능
const e = x => {
    return x ** 2;
};

// 3-2+. 인자가 하나도 없는 경우
const e = () => {  // ()
    return false
}
const e = _ => {  // _
    return false
}

// 3-3. 인자가 1개이고, return 포함 한 줄 일때.
function squere(x) {
    return x ** 2;
}

const square = x => x ** 2;
