$ pip install django-rest-framework drf_yasg

-> settings에 등록

​    'rest_framework',

​    'drf_yasg',



-> fixtures 폴더, json 파일
-> settings에 fixture_dirs 도 마찬가지로 있음
$ python manage.py loaddata data.json
$ pip install drf-yasg

+ pip freeze > requirements.txt
+ pip install -r requirements.txt



## RESTful

* representational state transfer



```
GET         https://localhost:8000/articles/1
HTTP VERB        HOSTNAME         /Resource/id
```




1. URI(통합자원식별자)는 자원(명사)만을 표현한다.
     - URI : 인터넷에 있는 자원을 나타내는 유일한 주소
2. HTTP method 로 자원을 조작한다.



| HTTP method | URI         | Description       |
| ----------- | ----------- | ----------------- |
| GET         | /articles   | article 목록      |
| GET         | /articles/1 | id=1 article 상세 |
| POST        | /articles   | article 생성      |
| PATCH       | /articles/1 | id=1 article 수정 |
| DELETE      | /articles/1 | id=1 article 삭제 |



```
Request
GET / artists/1

Response
{
     "id": 1, 
     "name": "Coldplay"
}

----------------------------

Request
POST / artists
{
     "name": "Queen"
}

.save()

Response
{
     "id": 3, 
     "name": "Queen"
}
```
