# Cookie Master 



1. 쿠키의 사용

   1. 데이터 저장

   2. 웹 페이지의 세션 유지 

      - REST API에 request를 보낼 때 토큰을 인증 키로 사용한다.

      - html5 에서 SessionStorage, LocalStorage가 지원되면세 세션 유지를 위해 반드시 쿠키를 사용할 필요는 없게 되었으나..🐙











[번역] HTTP Cookie (Wikipedia) [#](http://wiki-camp.appspot.com/[번역]_HTTP_Cookie_(Wikipedia)?rev=2#top)



2. 쿠키 설정하기

   ## 쿠키 설정하기 [#](http://wiki-camp.appspot.com/[번역]_HTTP_Cookie_(Wikipedia)?rev=2#h_c52fc3bc5e869ceea67193cbfe4a55fa)

   쿠키는 HTTP 응답으로 보내지는 [HTTP](http://en.wikipedia.org/wiki/HTTP) Set-Cookie [헤더](http://en.wikipedia.org/wiki/HTTP_header)를 사용해 설정한다. 이 헤더는 브라우저가 쿠키를 저장하고 차후 서버로 요청을 보낼 때 쿠키를 다시 보내줄 것을 지시한다. (물론, 브라우저가 쿠키를 지원하지 않거나 쿠키를 비활성화하면 이 헤더를 무시할 수 있다.)

   예를 들어, 브라우저가 www.example.org 웹사이트의 홈페이지에 다음과 같은 첫 번째 요청을 보냈다고 해보자.

   GET /index.html HTTP/1.1 Host: www.example.org ...

   서버는 다음 두 개의 Set-Cookie 헤더를 응답으로 보낸다.

   HTTP/1.0 200 OK Content-type: text/html Set-Cookie: theme=light Set-Cookie: sessionToken=abc123; Expires=Wed, 09 Jun 2021 10:18:14 GMT ...

   서버의 HTTP 응답은 웹 사이트의 홈페이지 컨텐츠를 포함하며, 또한 브라우저에게 두 개의 쿠키를 설정해 알려준다. 첫 번째 "theme" 쿠키는 Expires나 Max-Age 속성을 가지고 있지 않기 때문에 "세션" 쿠키로 취급된다. 세션 쿠키는 일반적으로 브라우저를 닫을 때 브라우저가 삭제한다. 두 번째 "sessionToken"은 "Expires" 속성을 포함하며 브라우저에게 지정된 날짜와 시간에 쿠키를 지워야 한다고 알려준다.

# 용어 [#](http://wiki-camp.appspot.com/[번역]_HTTP_Cookie_(Wikipedia)?rev=2#h_d30078bc15dc4b26d6285eab4dec613d)

## 세션 쿠키 (Session cookie) [#](http://wiki-camp.appspot.com/[번역]_HTTP_Cookie_(Wikipedia)?rev=2#h_ac2c7f786d017a65c2cd96572d91966c)

세션 쿠키, 또는 인-메모리 쿠키나 Transient 쿠키(역주:적당한 이름이 생각나지 않아서 원어를 그대로 사용함)로 알려진 이 쿠키는 사용자가 웹 사이트를 이동하는 동안에만 임시로 메모리에 존재한다. [14](http://en.wikipedia.org/wiki/HTTP_cookie#cite_note-mscookie-14) 보통 웹 브라우저는 사용자가 브라우저를 닫으면 세션 쿠키를 삭제한다. [15](http://en.wikipedia.org/wiki/HTTP_cookie#cite_note-15)[16](http://en.wikipedia.org/wiki/HTTP_cookie#cite_note-16) 브라우저가 세션 쿠키를 처리하는 방법을 알고 있기 때문에 다른 쿠키와 다르게 세션 쿠키는 유효 기간을 할당하지 않는다.

## 영속성 쿠키 (Persistent Cookie) [#](http://wiki-camp.appspot.com/[번역]_HTTP_Cookie_(Wikipedia)?rev=2#h_82a3d099e2240fe6af2aa1d725b61294)

영속성 쿠키는 세션 쿠키처럼 웹 브라우저를 닫을 때 만료시키지 않고 지정된 날짜나 지정된 시간이 지난 후에 만료시킨다. 이는 쿠키의 전체 수명(만드는 사람이 원하는 만큼 길게하거나 짧게할 수 있음) 동안에 사용자가 해당 쿠키를 소유하는 웹 사이트를 방문하든 사용자가 웹 사이트에서 다른 웹사이트가 소유하는 자원(광고처럼)을 보던 관계 없이 매번 서버로 쿠키 정보를 전송한다는 걸 의미한다.

이러한 이유로 영속성 쿠키는 때로는 **트래킹 쿠키**와 관련이 있다. 오랜 기간 동안의 사용자의 웹 브라우저 사용 습관에 대한 정보를 기록해 광고회사에서 사용할 수 있기 때문이다. 그렇지만 사용자가 브라우저를 열 때마다 로그인 인증정보를 입력하지 않기 위해 사용자의 이메일 계정을 기록해 관리하는 "정당한" 방법으로도 사용할 수 있다.

## 보안 쿠키 Secure cookie [#](http://wiki-camp.appspot.com/[번역]_HTTP_Cookie_(Wikipedia)?rev=2#h_861c1a5d5106d8ef51db1b5e87deeb9c)

보안 쿠키는 암호화된 연결(즉, HTTPS)을 통해서만 전송할 수 있다. 이는 도청을 통한 쿠키 절도에 덜 노출하게 해준다.

## HttpOnly 쿠키 [#](http://wiki-camp.appspot.com/[번역]_HTTP_Cookie_(Wikipedia)?rev=2#h_f6775747f35a9a6ae3968373ecdd28ca)

HttpOnly 쿠키는 [HTTP](http://en.wikipedia.org/wiki/HTTP)(또는 [HTTPS](http://en.wikipedia.org/wiki/HTTP_Secure))를 통해 전송할 때만 사용할 수 있다. [자바스크립트](http://en.wikipedia.org/wiki/JavaScript)와 같은 HTTP가 아닌 API를통해서는 접근이 불가능하다. 이 제약은 크로스 사이트 스크립트(XSS, cross-site scripting)를 통한 세션 쿠키 절도의 위협을 완전히 제거하지는 못하지만 줄여준다. [17](http://en.wikipedia.org/wiki/HTTP_cookie#cite_note-httponlyprotection-17) HttpOnly 쿠키는 대부분의 현대 브라우저에서 제공한다. [18](http://en.wikipedia.org/wiki/HTTP_cookie#cite_note-httponlybrowsers-18)[19](http://en.wikipedia.org/wiki/HTTP_cookie#cite_note-httponlyrfc-19)









## 쿠키 속성 [#](http://wiki-camp.appspot.com/[번역]_HTTP_Cookie_(Wikipedia)?rev=2#h_b1522d9c4b9145189a8b1184225cbd0d)

이름과 값에 더해서 쿠키는 여러 개의 속성이 있다. 브라우저는 쿠키 속성을 다시 서버로 보내지 않는다. 오로지 쿠키의 이름과 값만을 보낸다. 쿠키 속성은 쿠키를 삭제고 쿠키를 막을 때나 쿠키를 다시 서버로 보낼 것인지를 결정하기 위해 브라우저에서 사용한다.

### Domain과 Path [#](http://wiki-camp.appspot.com/[번역]_HTTP_Cookie_(Wikipedia)?rev=2#h_54242d0faf9be85a652610f91530f968)

Domain과 Path 속성은 쿠키의 범위를 정의한다. 이 속성은 어떤 웹 사이트가 근본적으로 쿠키를 소유하는지를 브라우저에게 알려준다. 명백한 보안 이유로 이 쿠키는 현재 자원의 최상위 도메인과 그 하위 도메인으로만 설정할 수 있으며, 다른 도메인이나 그 하위 도메인으로는 설정할 수 없다. 예를 들어, 웹 사이트 example.org는 foo.com 도메인으로 쿠키를 설정할 수 없다. example.org 웹 사이트에게 foo.com의 쿠키를 제어하도록 허용하면 안되기 때문이다.

만약 쿠키의 도메인과 경로를 서버에서 설정하지 않았다면 요청온 자원의 도메인과 경로를 기본값으로 한다. [30](http://en.wikipedia.org/wiki/HTTP_cookie#cite_note-30) 그렇지만 도메인을 주지 않아 foo.com으로 설정된 쿠키와 foo.com 도메인으로 설정한 쿠키는 다르다. 전자의 경우 쿠키는 foo.com 요청인 경우에만 보낼 수 있지만 후자의 경우에는 모든 하위 도메인에서도 포함 된다. (예를 들어, docs.foo.com) [31](http://en.wikipedia.org/wiki/HTTP_cookie#cite_note-31)[32](http://en.wikipedia.org/wiki/HTTP_cookie#cite_note-32)

아래는 사용자가 로그인 한 후에 웹 사이트에서 보내는 몇 개의 Set-Cookie HTTP 응답 헤더 예제다. HTTP 요청은 docs.foo.com 하위 도메인으로 웹 페이지 요청을 보냈다.

Set-Cookie: LSID=DQAAAK…Eaem_vYg; Path=/accounts; Expires=Wed, 13 Jan 2021 22:23:01 GMT; Secure; HttpOnly Set-Cookie: HSID=AYQEVn….DKrdst; Domain=.foo.com; Path=/; Expires=Wed, 13 Jan 2021 22:23:01 GMT; HttpOnly Set-Cookie: SSID=Ap4P….GTEq; Domain=foo.com; Path=/; Expires=Wed, 13 Jan 2021 22:23:01 GMT; Secure; HttpOnly ...

첫 번째 쿠키인 LSID는 Domain 속성은 없고, Path 속성은 /accounts으로 되어 있어 docs.foo.com/accounts (요청 도메인에서 얻어낸 도메인)으로 포함 된 페이지 요청에서만 브라우저가 쿠키를 사용할 수 있음을 말해준다. 다른 두 쿠키인 HSID와 SSID는 브라우저가 요청하는 .foo.com의 모든 하위 도메인의 모든 경로(예를 들어, www.foo.com/bar)에서 사용할 수 있다. 접두어로 나오는 점(dot)은 최근 표준에서는 선택이지만 구현 기반이 되는 [RFC 2109](http://tools.ietf.org/html/rfc2109)의 호환성을 위해 추가하는 것이 좋다. [33](http://en.wikipedia.org/wiki/HTTP_cookie#cite_note-33)

### Expires와 Max-Age [#](http://wiki-camp.appspot.com/[번역]_HTTP_Cookie_(Wikipedia)?rev=2#h_61c763021b3e0b78952e8d81d13f3005)

Expires 속성은 브라우저가 쿠키를 지워야 하는 날짜와 시간을 지정한다. 날짜/시간은 Wdy, DD Mon YYYY HH:MM:SS GMT 형태로 지정한다. [34](http://en.wikipedia.org/wiki/HTTP_cookie#cite_note-34)

그렇지 않으면 Max-Age 속성으로 브라우저가 쿠키를 받은 시간 대비 앞으로 얼마의 시간 뒤에 쿠키를 만료 시킬지 설정하는데 사용할 수도 있다. 아래는 사용자가 로그인 한 후에 웹 사이트가 받은 세 개의 Set-Cookie 헤더 예제이다.

Set-Cookie: lu=Rg3vHJZnehYLjVg7qi3bZjzg; Expires=Tue, 15-Jan-2013 21:47:38 GMT; Path=/; Domain=.example.com; HttpOnly Set-Cookie: made_write_conn=1295214458; Path=/; Domain=.example.com Set-Cookie: reg_fb_gate=deleted; Expires=Thu, 01-Jan-1970 00:00:01 GMT; Path=/; Domain=.example.com; HttpOnly

첫 번째 쿠키인 lu는 2013년 1월 15일로 만료일이 지정되어 있다. 이 시간이 될 때까지 클라이언트 브라우저는 이 쿠키를 사용한다. 두 번째 쿠키인 made_write_conn은 만료 일자를 지정하지 않았기 때문에 세션 쿠키다. 사용자가 브라우저를 닫으면 삭제된다. 세 번째 쿠키인 reg_fb_gate 쿠키는 값이 "deleted"로 변경됐고 만료 시간이 과거로 설정됐다. 브라우저는 이 쿠키를 받는 즉시 삭제한다. 쿠키는 Set-Cookie 필드의 도메인과 경로 속성이 쿠키를 만들었을 때에 사용한 값과 일치할 때만 삭제한다.

### Secure와 HttpOnly [#](http://wiki-camp.appspot.com/[번역]_HTTP_Cookie_(Wikipedia)?rev=2#h_6c99c9842035927ec8ca910069c585dd)

Secure와 HttpOnly 속성은 값과는 아무런 관련이 없다. 그것보다는 이 속성 이름이 있을 때에는 두 쿠키의 행동을 활성화 한다는 걸 가리킬 뿐이다.

Secure 속성은 암호화된 전송으로 쿠키 통신을 제약한다는 의미며, 브라우저는 [보안/암호화](http://en.wikipedia.org/wiki/Https)된 연결을 통해서만 쿠키를 사용할 수 있다는 뜻이다. 그렇지만 웹 서버가 보안 연결이 아닐 때 secure 속성으로 쿠키를 설정하면 [중간자 공격](http://en.wikipedia.org/wiki/Man-in-the-middle_attack)(man-in-the-middle attacks, MITM) 방법으로 사용자에게 전달되는 시점에 쿠키를 여전히 가로챌 수 있다. 그러므로 가장 안전한 방법은 Secure 속성을 사용하는 쿠키를 보안 연결을 통해서만 설정하도록 해야 한다.

HttpOnly 속성은 브라우저가 HTTP(그리고 HTTPS) 요청이 아닌 채널을 통해서는 쿠키를 노출할 수 없도록 해준다. 이 속성을 사용하는 쿠키는 [자바스크립트](http://en.wikipedia.org/wiki/JavaScript)를 통해 호출하는 것(document.cookie를 사용해서)과 같은 HTTP 메서드가 아닌 방법으로는 접근할 수가 없다. 그러므로 [cross-site scripting](http://en.wikipedia.org/wiki/Cross-site_scripting) (무분별한 공격 기술? pervasive attack?)으로 쉽게 쿠키를 훔쳐가지 못한다. [35](http://en.wikipedia.org/wiki/HTTP_cookie#cite_note-Symantec-2007-2nd-exec-35) 페이스북과 구글은 무엇보다도 HttpOnly 속성을 광범위하게 사용한다.









# CORS 

- http://guswnsxodlf.github.io/enable-CORS-on-expressd

CORS란 Cross Origin Resource Sharing의 약자로, **현재 도메인과 다른 도메인으로 리소스가 요청될 경우를 말한다.** 예를 들어, 도메인 **http://A.com** 에서 읽어온 HTML페이지에서 다른 도메인 **http://B.com/image.jpg**를 요청하는 경우를 말한다. 이런 경우에 해당 리소스는 cross-origin HTTP 요청에 의해 요청된다. **보안 상의 이유로, 브라우저는 CORS를 제한하고 있다.**

 SPA(Single Page Application)의 경우에는, RESTful API를 기반으로 비동기 네트워크 통신을 하기 때문에 API 서버와 웹 페이지 서버가 다를 수 있다. 이런 경우에 API 서버로 요청을 할 시에 CORS 제한이 걸리게 된다.

