// JS : Non-Blocking

function nothing () {
    console.log('hi')
}

console.log('start')
setTimeout(nothing, 3000) // 3초, ms 단위라서
console.log('end')



function nothing2 () {
    console.log('end');
}

console.log('start')
setTimeout(nothing2, 3000) // 3초, ms 단위라서


function sleep_3s() {
    setTimeout(() => (console.log('Wake up!')), 3000);
}

console.log('Start sleeping');
sleep_3s();
console.log('End of Program');


/* 

    어떤 함수/작업들이 Non blocking 한가?
    - 지금 당장 해결 할 수 없고
    - 결과도 확신할 수 없는 모든 일

*/

function complexTask(){
    console.log('시작');
    for (let i=0; i<1000000000; i++){};
    console.log('오래걸림');
}

setTimeout(() => {console.log('짱빨리끝남!')}, 1)
// 누가 봐도 setTimeout이 빠를 것 같지만 
// 또한 먼저 놓여 있지만, 
// JS 입장엔 무슨 값이 올지, 언제 일이 끝날지 불확실하기 때문에 흘러가고,
// complexTesk가 더 우선하게 됨. 이후 event queue
// 본인이 일 하는거 말고, 데이터 주고 받는 쪽으로 활용하는 것이 좋다.
complexTask()
