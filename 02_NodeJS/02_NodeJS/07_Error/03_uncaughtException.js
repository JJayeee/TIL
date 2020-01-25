/* 
    3. process 에 eventListener 를 달아주어 예측 불가능한 에러 처리하기
        공식문서는 최후의 수단으로 사용할 것을 말한다.
        에러 내용을 기록하는 정도로 사용하고 process.exit() 로 프로세스를 종료하는 것이 좋다.
        운영 중인 서버에서 프로세스가 종료 되었을 때는 15.1.5 참고
*/

/*
    process.on 없을 때 

    Error: 서버를 고장내주마!
    at Timeout._onTimeout (C:\Users\07_error\03_error3.js:11:11)
    at listOnTimeout (internal/timers.js:531:17)
    at processTimers (internal/timers.js:475:7)
*/

process.on('uncaughtException', (err) => {
    console.error('예기치 못한 에러', err);
});

setInterval(() => {
    throw new Error('서버를 고장내주마!');
}, 1000);

setTimeout(() => {
    console.log('실행 됩니다.');
}, 2000);


/*
    예기치 못한 에러 Error: 서버를 고장내주마!
    at Timeout._onTimeout (C:\Users\03_error3.js:11:11)
    at listOnTimeout (internal/timers.js:531:17)
    at processTimers (internal/timers.js:475:7)
    실행 됩니다.
    예기치 못한 에러 Error: 서버를 고장내주마!
    at Timeout._onTimeout (C:\Users\03_error3.js:11:11)
    at listOnTimeout (internal/timers.js:531:17)
    at processTimers (internal/timers.js:475:7)
*/

