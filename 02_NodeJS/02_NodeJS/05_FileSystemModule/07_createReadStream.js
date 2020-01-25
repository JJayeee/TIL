const fs = require('fs');

const readStream = fs.createReadStream('./07_readme3.txt', { highWaterMark: 16 }); 
// highWaterMark: 버퍼 크기(바이트 단위), default 64KB
const data = [];

readStream.on('data', (chunk) => { // readStream 은 eventlistner 를 사용 (data, end, error)
    data.push(chunk);
    console.log('data :', chunk, chunk.length);
});

readStream.on('end', () => {
    console.log('end :', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.log('error :', err);
});
