## settings.py

* BASE_DIR
* DEBUG = True  | ALLOWED_HOSTS
* INSTALLED_APPS

```python
TEMPLATES = [
    {
     	'DIRS': [
            os.path.join(BASE_DIR, 'django_recap', 'templates'), 
        ]   
    }   
]

DATABASES =  {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```



* LANGUAGE_CODE
* TIME_ZONE



* User_model

```python
AUTH_USER_MODEL = "accounts.User"
# User model을 확장할지 안 할지 모르겠지만 model, settings에 각각을 쓰고 시작하라.
# 쓰고 확장 안 하는건 문제가 되지 않음
```



<hr>





### static/ && media/



* Static File (정적 파일) : JS, CSS IMAGE 서버에서 제공하려고 준비해놓는 파일(고정)

* Make sure that `django.contrib.staticfiles` is included in your [`INSTALLED_APPS`](https://docs.djangoproject.com/ko/2.2/ref/settings/#std:setting-INSTALLED_APPS).

* In your settings file, define [`STATIC_URL`](https://docs.djangoproject.com/ko/2.2/ref/settings/#std:setting-STATIC_URL), for example:

  ```python
  STATIC_URL = '/static/'   # html 에서 부르는 이름 정도, {% static 'blah' %}
  STATICFILES_DIRS = [
      os.path.join(BASE_DIR, "static"),  # BASEDIR/APP/static/ 자동으로 검색하고
      os.path.join(BASE_DIR, 'assets'),  # 여기도 검색(basedir/assets/)
  ]
  ```

  In your templates, use the [`static`](https://docs.djangoproject.com/ko/2.2/ref/templates/builtins/#std:templatetag-static) template tag to build the URL for the given relative path using the configured [`STATICFILES_STORAGE`](https://docs.djangoproject.com/ko/2.2/ref/settings/#std:setting-STATICFILES_STORAGE).

  ```django
  {% load static %}
  <img src="{% static "my_app/example.jpg" %}" alt="My image">
  ```

* during development

  ```python
  from django.conf import settings
  from django.conf.urls.static import static
  
  urlpatterns = [
      # ... the rest of your URLconf goes here ...
  ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
  ```

* Serving files uploaded by a user during developement

  ```python
  urlpatterns = [
      # ... the rest of your URLconf goes here ...
  ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
  ```

  

**master_app**

```python
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = '/static/'

MEDIA_URL = '/media/'  # 찾을 위치 -> 이름을 DB에 저장, 내용은 media폴더에 저장하도록 함
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')  # 저장할 위치
# BASE_DIR: 그 컴퓨터의 프로젝트 dir(절대경로)
# os.path.join : url을 잡아서 os에 상관없도록 더해줌
# BASE_DIR: C:\Users\student\TIL\06_DJANGO_ADVANCED\03_IMAGE_UPLOAD
# MEDIA_ROOT: C:\Users\student\TIL\06_DJANGO_ADVANCED\03_IMAGE_UPLOAD\media
```

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('newsfeed/', include('sns.urls')),
    path('accounts/', include('accounts.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# urlpatterns(list) 는 path 만 있을 수 있음
# static()은 []를 반환한다. (일부러) 그래서 + 하라고 설명 뜨기도 함
```







### fixtures/

```python

python manage.py dumpdata celebs
python manage.py dumpdata > celebs/fixtures/celeb_data.json

# fixtures 폴더가 있어야~
python manage.py loaddata celeb_data


python manage.py dumpdata celebs --format=yaml > celebs/fixtures/celeb_data.yaml
```





### admin.py

```python
from django.contrib import admin
from .models import Posting


class PostingModelAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at', 'updated_at',)
    list_display = ('id', 'content', 'created_at', 'updated_at')
    list_display_links = ('id', 'content')


admin.site.register(Posting, PostingModelAdmin)
```





+

* ERD (개체-관계 다이어그램) : **개체-관계 모델링**(Entity-Relationship Modelling)이다. 줄여서 **ERM**이라고 한다. ERM 프로세스의 산출물을 가리켜 **개체-관계 다이어그램**(Entity-Relationship Diagram)이라 한다. 줄여서 **ERD**라 일컫는다.

* crow's feet notation

```
"고리"(ring)은 "0"를 나타낸다.
"실선"(dash)은 "1"을 나타낸다.
"까마귀 발"(crow's foot)은 "다수" 혹은 "그 이상"을 나타낸다.
위와 같은 기호들은 서로 조합하여 사용될 수 있다. 다음과 같은 네 가지 조합이 가능하다.

고리와 실선 → 0 혹은 1
실선과 실선 → 정확히 1
고리와 까마귀 발 → 0개 이상
실선과 까마귀 발 → 1개 이상
```

* hw 22 / 23 / 27