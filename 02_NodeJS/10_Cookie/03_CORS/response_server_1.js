const express = require('express');
const fs = require('fs');
const cors = require('cors');
const response_server_1 = express();

response_server_1.use(cors());

/*
  web 에서 console log 도 찍히고,
  Set-Cookie: timestamp=1580010711513; Path=/ 도 Header 에 담겨 있으나
  application 에 쿠키가 저장되지 않는다.

  왜!!!!!!

  1. 1차적 원인: ajax 요청
    쿠키를 생성하기 위해서는 일종의 자격증명(credentials)을 받아야 한다.
    해당 옵션을 ajax 통신 시 설정해 주어야 한다. (request 측에서)
    서버에서는 credentials 옵션이 없으면 쿠키에 대한 생성을 거절하기 때문이다.
    -> XMLHttpRequest 의 경우
      xhr.withCredentials = true;
    -> fetch 의 경우
      credentials: 'include'
*/

//  근데 그래도 안 된다. 다시 cors issue 가 발생한다.

response_server_1.get('/timestamp', (req, res) => {
  console.log('route: /timestamp');
  res.cookie('timestamp', new Date()*1);
  res.send({
    result: 'true',
    message: 'success'
  });
});


response_server_1.listen(10001);
console.log('Running Server1: enable cors.....');