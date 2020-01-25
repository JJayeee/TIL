/*
    Javascript 는 event-driven-이벤트 기반이다.
    특정 이벤트(click, networak request ...)가 발생하면
    무엇을 할지 미리 등록해서 사용한다.
    button.addEventListner('click', function(){...})
*/

// 함수 실행 순서
function a () {
    console.log('a');
}

function b () {
    a();
    console.log('b');
}

function c () {
    a();
    b();
    console.log('c');
}

c(); // a a b c

// https://meetup.toast.com/posts/89