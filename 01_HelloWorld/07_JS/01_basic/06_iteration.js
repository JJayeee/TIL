// $ node 06_iteration.js

/* while */ 
let i = 0;
while (i < 10) {
    console.log(i);
    i++;
}


/* 
    for (초기화식; 조건식; 증감식) {
        조건식이 참인 경우 반복 실행될 문;
    }
    
    for 문은 조건식이 거짓으로 판별될 때까지 코드 블록을 반복 실행한다. 
*/

let sum = 0;
// for j in range(5):
for (let j=1; j < 6; j++) {
    sum += j;
    console.log(sum);
}
console.log(sum);

// for k in range(1, 6):
for (let k=1; k < 6; k++) {}


// for num in [1, 2, 3, 4, 5] + const로 선언!
for (const number of [1, 2, 3, 4, 5]) {}
