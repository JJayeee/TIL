setImmediate(() => { console.log('immediate'); });
process.nextTick(() => { console.log('nextTick'); });
setTimeout(() => { console.log('timeout'); }, 0);
Promise.resolve().then(() => console.log('promise'));

// process.nextTick 은 setImmediate 나 setTimeout 보다 먼저 실행
// resolve 된 Promise 도 다른 콜백 보다 우선시
// process.nextTick 과 Promise 를 마이크로태스크(microtask) 라고 부른다 