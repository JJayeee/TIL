const fs = require('fs');

fs.readdir('./folder', (err, dir) => {
    if (err) { throw err; }
    console.log('폴더 내용 확인', dir);

    fs.unlink('./folder/newFile.js', (err) => { // 없으면 에러
        if (err) { throw err; }
        console.log('파일 삭제 성공');

        fs.rmdir('./folder', (err) => { // 폴더 안에 파일 있으면 에러
            if (err) { throw err; }
            console.log('폴더 삭제 성공');
        });
    });
});