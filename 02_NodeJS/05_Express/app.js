var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function(req, res, next) {
  console.log(req.url, '저도 미들웨어 입니다');
  next();
});

app.use(logger('dev')); // short, dev, common, combined
app.use(express.static(path.join(__dirname, 'public'))); // morgan 보다 위에 둬서 요청이 기록되지 않도록
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // body-parser 
app.use(cookieParser('secret code')); // 쿠키에 인자(secret 값)를 통해 서명 넣기
app.use(session({
  resave: false, // 요청이 왔을 때 세션에 수정 사항이 생기지 않더라도 다시 저장할지
  saveUninitialized: false, // 세션에 저장 내역 없을 때 다시 저장할지
  secret: 'secret code', // cookie parser 비밀 키, cookie-parser의 secret과 같게 설정해야 한다
  cookie: {
    httpOnly: true, // js로 확인 못 하게
    secure: false, // https 아닌 환경에서도 사용할 수 있게 (배포 시 true로 설정하는 것이 좋다)
  },
}));
app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/', function(req, res, next) {
  console.log('/ 주소의 요청일 때 실행됩니다. HTTP 메서드는 상관 없습니다');
  next();
});
app.get('/', function(req, res, next) {
  console.log('GET 메서드 / 주소의 요청일 때만 실행됩니다');
  next();
});
app.post('/data', function(req, res, next) {
  console.log('POST 메서드 /data 주소의 요청일 때만 실행됩니다');
  next();
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // 개발 환경때만 보인다

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
