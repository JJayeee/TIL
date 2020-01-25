// 함수란 어떤 작업을 수행하기 위해 필요한 문(statement)들의 집합을 정의한 코드 블록이다.
// 함수는 이름과 매개변수를 갖으며 필요한 때에 호출하여 
// 코드 블록에 담긴 문들을 일괄적으로 실행할 수 있다.


/* python
def func1(x, y):
    return x + y

func2 = lambda x, y: x + y

x = 1
y = [1, 2, 3]
r = func1(1, 2)

func1, func2, x, y, r 모두 각각 namespace에 objects로 들어가 있음
각각이 모두 변수이다.
*/

function adder1(x, y) {  // 선언식 ; 없음
    return x + y;
}

/* python 에서는 안 됨
    adder2 = (x, y): return x + y
*/

const adder2 = function(x, y) {  // 할당식 ; 붙음
    return x + y; 
};

/* python lambda 표현식
    adder3 = lambda x, y: x + y
*/

// ES6+ Arrow function
// 1. function 을 지운다.
// 2. () 와 {} 사이에 => 를 넣는다. 
const adder3 = function (x, y) { return x + y; };
const adder3 = (x, y) => {
    return x + y;
};