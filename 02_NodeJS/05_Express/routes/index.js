var express = require('express');
var router = express.Router(); // router 객체 생성

/* GET home page. */

router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' }); // 2 번 res 하면 오류가 난다
  next('route'); // 다음 미들웨어를 실행시키지 않도록 만든다
}, function(req, res, next) {
  console.log('실행되지 않습니다');
  next();
});

router.get('/', function(req, res, next) {
  console.log('실행됩니다');
  res.render('index', { title: 'Express' }); // render 메서드로 응답을 보낸다
});

module.exports = router; // router를 모듈화
