const express = require('express');
const fs = require('fs');
const cors = require('cors');
const response_server_2 = express();

/*
  왜???!!!
  -> error message 내용이 조금 다르다
    02 different domain 의 error message:
      (GET)
      Access to XMLHttpRequest at 'http://localhost:10001/timestamp'
      from origin 'http://localhost:20001' has been blocked by CORS policy:
      Response to preflight request doesn't pass access control check:
      No 'Access-Control-Allow-Origin' header is present on the requested resource.

      (FETCH)
      Access ~ check:
      No 'Access-Control-Allow-Origin' header is present on the requested resource.
      If an opaque response serves your needs, set the request's mode to 'no-cors'
      to fetch the resource with CORS disabled.


    03 cors 의 error message:
      (GET)
      Access ~ check:
      The value of the 'Access-Control-Allow-Origin' header in the response
      must not be the wildcard '*' when the request's credentials mode is 'include'.
      The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.

      (FETCH)
      Access to ~ check:
      The value of the 'Access-Control-Allow-Origin' header in the response
      must not be the wildcard '*' when the request's credentials mode is 'include'.
*/

/*
  클라이언트 쪽에서 자격 증명 요청을 사용하는데 서버 측에서는 해당 옵션이 꺼져있기 때문이다.
  cors 라이브러리는 해당 옵션이 false 로 되어있기 때문...................

  아니 이게 왜 클라이언트 측 로그에만 뜨느냔 말임 ㅠㅠㅠㅠㅠㅠㅠㅠ

  교훈 1. error message 를 잘.. 읽자...... cors error 인거 만 보고 넘어갔는데 뒤가 다를 줄 몰랐어...
  교휸 2. 공식 문서......... 더 꼼꼼하게 읽자........ ㅠㅠ...ㅠㅠㅠㅠㅠㅠㅠ.........
    https://github.com/expressjs/cors
    - credentials: Configures the Access-Control-Allow-Credentials CORS header.
                   Set to true to pass the header, otherwise it is omitted.
*/


const corsOptions = {
  origin: 'http://localhost:20001',
  // methods: 'GET',
  credentials: true
};

response_server_2.use(cors(corsOptions));


response_server_2.get('/timestamp', (req, res) => {
  console.log('route: /timestamp');
  res.cookie('timestamp', new Date()*1, {
    httpOnly: true,
  });
  res.send({
    result: 'true',
    message: 'success'
  });
});


response_server_2.listen(10001);
console.log('Running Server2: enable cors + 20001.....');