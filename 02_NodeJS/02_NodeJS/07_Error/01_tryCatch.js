/* 
    1. 에러가 발생할 것 같은 부분을 try catch로 감싸주기
        앞에서는 에러 발생 시 에러를 throw 했는데, 그러면 노드 프로세스가 멈춰버린다.
        throw 하는 경우에는 반드시 try catch문으로 throw 한 error를 잡아주어야 한다.
*/

/* 
    setInterval(() => {
        console.log('시작');
        throw new Error('new error');
    }, 1000);
    -> 한 번 시작하고 멈춰버린다.
*/

setInterval(() => {
    console.log('시작');
    try {
        throw new Error('서버를 고장내주마!');
    } catch (err) {
        console.error(err);
    }
}, 1000);

/*
    Error: 서버를 고장내주마!
    at Timeout._onTimeout (C:\Users\07_error\01_error1.js:4:15)
    at listOnTimeout (internal/timers.js:531:17)
    at processTimers (internal/timers.js:475:7)

    반복
*/