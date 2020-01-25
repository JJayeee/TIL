RS256 & HS256

https://stackoverflow.com/questions/39239051/rs256-vs-hs256-whats-the-difference





JSON (application/json)

x-www-form-urlencoded





https://tansfil.tistory.com/58?category=255594

기존의 Access Token의 유효기간을 짧게 하고 Refresh Token이라는 새로운 토큰을 발급합니다. 그렇게 되면 Access Token을 탈취당해도 상대적으로 피해를 줄일 수 있습니다. 이는 다음 포스팅에 나올 Oauth2에 더 자세히 다루도록 하겠습니다.



---> 

#### [chrome-extension://chphlpgkkbolifaimnlloiipkdnihall/onetab.html](chrome-extension://chphlpgkkbolifaimnlloiipkdnihall/onetab.html)



클라이언트는 서버에 인증 요청한다.

인증이 성공된다면 서버에서 사용할 클레임을 포함한 JWT를 생성해 클라이언트에게 넘겨준다.
일반적으로 로컬 저장소에 저장되지만 쿠키를 사용할 수도 있다.

그리고 클라이언트에서 인증이 필요한 어떠한 요청을 할 경우 요청 헤더에 추가해준다.

서버는 요청 헤더에서 토큰 값을 디코딩해 필요한 정보를 가져올 수 있으며 그에 따른 요청 응답을 클라이언트에게 보내준다.



서버에서 토큰이 유효하다고 판단하면 클레임들을 디코딩해 정보를 가져올 수 있다.
서버의 메모리와 같이 다른 곳에 따로 관리를 하지 않아도 된다는 뜻이다.

따라서 `Stateless`한 서버를 만들 수 있게 된다.
그러므로 서버의 확장이 용이하고 요청 도메인에 관해 문제가 되지 않아 `CORS`문제를 생각하지 않아도 된다.



하지만 클레임셋이 증가하면 자연스레 토큰의 길이가 증가하게 되는데 요청 헤더에 토큰을 삽입하는 방식이므로 과한 오버헤드가 발생할 수 있다.



- JWT 고찰
  - https://swalloow.github.io/implement-jwt



- 구현 참고
  - jwt https://jwt.io/
  - npm https://www.npmjs.com/package/jsonwebtoken
  - [https://stackhoarder.com/2019/07/17/node-js-passport-js-jwt-token-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84/](https://stackhoarder.com/2019/07/17/node-js-passport-js-jwt-token-이용해-로그인-구현/)
  - https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314



+ p.404





```django


# REST_framework 설정
REST_FRAMEWORK = {
		# 로그인 여부를 확인하는 클래스
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
		# 인증 여부를 확인하는 클래스
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

# JWT 설정
JWT_AUTH = {
		# JWT를 encrypt함.절대 외부 노출 금지, default는 settings.SECRET_KEY
    'JWT_SECRET_KEY': SECRET_KEY,
		# 토큰 해싱 알고리즘(HMAC using SHA-256 hash algorithm (default)
    'JWT_ALGORITHM': 'HS256',
		# 토큰 갱신 허용 여부
    'JWT_ALLOW_REFRESH': True,
		# 1주일간 유효한 토큰 - default는 5분 (import datetime)
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=7),
		# 28일 마다 토큰이 갱신(유효 기간 연장시)
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=28),
}

```

```
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('admin/', admin.site.urls),

    path('api-token-auth/', obtain_jwt_token),

    path('api/v1/movies/', include('movies.urls')),
    path('api/v1/users/', include('accounts.urls')),
]

```





제대로 모르는거 따라하지 말자 -> 비밀번호 공개 

다음에 못 씀

