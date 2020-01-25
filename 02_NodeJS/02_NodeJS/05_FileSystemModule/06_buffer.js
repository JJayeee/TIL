/*
    3.6.2 버퍼와 스트림 이해하기 (p.115~)
    노드는 파일을 읽을 때 메모리에 파일 크기만큼 공간을 마련해두며,
    파일 데이터를 메모리에 저장한 뒤 사용자가 조작할 수 있도록 한다.
    이때 메모리에 저장된 데이터가 바로 버퍼이며 이를 직접 조작할 수 있는 클래스가 Buffer 이다.

    NodeJS Buffer and Stream
        https://nodejs.org/api/buffer.html
        https://medium.com/su-s-daily-log/2019-08-14-nodejs-buffer-and-stream-be122bc7b1
*/

const buffer = Buffer.from('저를 버퍼로 바꿔보세요');
console.log('from():', buffer);
console.log('length:', buffer.length);
console.log('toString():', buffer.toString());

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
const buffer2 = Buffer.concat(array);
console.log('concat():', buffer2.toString());

const buffer3 = Buffer.alloc(5); // 빈 버퍼 생성
console.log('alloc():', buffer3);

/*
    from(): <Buffer ec a0 80 eb a5 bc ... b3 b4 ec 84 b8 ec 9a 94>
    length: 32
    toString(): 저를 버퍼로 바꿔보세요
    concat(): 띄엄 띄엄 띄어쓰기
    alloc(): <Buffer 00 00 00 00 00>
*/