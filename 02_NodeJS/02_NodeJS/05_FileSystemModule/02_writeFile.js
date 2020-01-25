const fs = require('fs');

fs.writeFile('./02_writeme.txt', '글이 입력됩니다.', (err) => {
    if (err) { throw err; }
    fs.readFile('./02_writeme.txt', (err, data) => {
        if (err) { throw err; }
        console.log(data.toString());
    });
});