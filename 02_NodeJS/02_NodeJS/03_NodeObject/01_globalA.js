// 따로 설치하지 않아도 사용할 수 있는 기본 내장 객체

/* 
    global: 브라우저의 window와 같은 전역 객체
    window.open 을 open 이라 입력하듯 global도 생략 가능하다
    require 함수도 global.require 
    console 도 global.console

    > global
        Object [global] {
        global: [Circular],
        clearInterval: [Function: clearInterval],
        clearTimeout: [Function: clearTimeout],
        setInterval: [Function: setInterval],
        setTimeout: [Function: setTimeout] { [Symbol(util.promisify.custom)]: [Function] },
        queueMicrotask: [Function: queueMicrotask],
        clearImmediate: [Function: clearImmediate],
        setImmediate: [Function: setImmediate] {
            [Symbol(util.promisify.custom)]: [Function]
        }
        }
*/ 

module.exports = () => global.message;