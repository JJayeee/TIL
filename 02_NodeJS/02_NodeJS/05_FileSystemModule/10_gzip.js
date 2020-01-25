// 파일을 읽은 후 gzip 방식으로 압축하기

const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./09_readme4.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./10_readme4.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);