// 함수 아니고 연산자
typeof true;  // boolean
typeof false;

// 확실히 없다 vs. 모르겠는데. 없는데. 의도하지 않음
typeof null;  // object
typeof undefined; // undefined 
// [1, 2, 3][100]
// b = {a:2}, b.c
// function a (x) {console.log(x)}, a() | a(2) -> 2

typeof 'asdf'; // string

typeof 1; // number
typeof 1.1; // number
typeof Infinity; // number
typeof NaN; // number

typeof [1, 2]; // object
typeof {a:1, b:2}; // object

typeof function(){}; // function
