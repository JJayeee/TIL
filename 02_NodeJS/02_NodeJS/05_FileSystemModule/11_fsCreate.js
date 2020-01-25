const fs = require('fs');

fs.access('./forder', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
  // (경로, 옵션, 콜백), 파일/폴더나 권한이 없다면 에러 발생(ENOENT)
  if (err) {
    if (err.code === 'ENOENT') {
      console.log('폴더 없음');
      
      fs.mkdir('./folder', (err) => {
        if (err) {
          throw err;
        }
        console.log('폴더 만들기 성공');

        fs.open('./folder/file.js', 'w', (err, fd) => {
          // w, r, a(추가). 없는 상태에서 새로 만듦, 'r' 이었다면 err
          if (err) {
            throw err;
          }
          console.log('빈 파일 만들기 성공', fd);

          fs.rename('./folder/file.js', './folder/newfile.js', (err) => {
            // 경로를 달리 하여 잘라내기 같은 기능을 할 수도 있다.
            if (err) {
              throw err;
            }
            console.log('이름 바꾸기 성공');
          });
        });
      });
    } else {
      throw err;
    }
  } else {
    console.log('이미 폴더 있음');
  }
});