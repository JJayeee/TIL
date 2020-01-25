```python
from django.urls import reverse

def get_absolute_url(self):
   return reverse("board:article_detail", kwargs={"article_id": self.id})
```

```
In [7]: Articles.objects.all()
Out[7]: <QuerySet [<Articles: Articles object (1)>]>

In [8]: Articles.objects
Out[8]: <django.db.models.manager.Manager at 0x289f0a273c8>

In [9]: Articles.objects.get(id=1)
Out[9]: <Articles: Articles object (1)>
```



```python
class Comment(models.Model):
    content = models.CharField(max_length=200)
    # CharField는 max_length가 필수, 만약 3이라면 5가 들어와도 에러가 아니라 잘라버림
    # 저장을 안 하도록 하는 max_length는 model class
```

```
a = c3.article
In [25]: a.comment_set
Out[25]: <django.db.models.fields.related_descriptors.create_reverse_many_to_one_manager.<locals>.RelatedManager at 0x1aeb922dac8>
TypeError: 'RelatedManager' object is not iterable

Comment.objects.filter(article_id=a.id)
In [27]: a.comment_set.all()
Out[27]: <QuerySet [<Comment: Comment object (1)>, <Comment: Comment object (2)>, <Comment: Comment object (3)>]>
"""

```



* User model 

```python
$ pip install pillow pilkit django-imagekit

from django.conf import settings  # MASTER_APP/settings.py import

class Posting(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
```



* image upload

```python
class Posting(models.Model):
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="like_postings", blank=True)
    icon = models.CharField(max_length=30, default='')
    # migrations 할 때 default 값을 적었지만, 다른 사람이 코드를 볼 때, 디폴트가 없구나 라고
    # 생각하게 되는 문제가 있기 때문에 2번, 본인이 직접 입력하기를 하도록 하자.
    created_at = models.DateTimeField(auto_now_add=True)  # 생성(추가) 될 때 만
    updated_at = models.DateTimeField(auto_now=True)  # 매번
    image = models.ImageField(blank=True)  # 비어있는 값일 수 도 있다
    # 이미지필드, 자동완성 이긴 하지만 반드시 설치해야 함 -> pillow (installs에 안 써도 됨)
    # 이미지를 저장한다기보단 이미지가 어디에 있는지 주소를 저장함

    # 여기서도 마찬가지로 meta는 정보에 대해 담고 있는 것
    class Meta:
        ordering = ['-created_at', ]
        # 'id' 오름차순 '-id' 내림차순

    # detail page를 쓸 거라면
    def get_absolute_url(self):
        return reverse("sns:posting_detail", kwargs={"posting_id": self.id})

    def __str__(self):
        return f'{self.id}: {self.content[:20]}'
    # 이것 만으로는 위의 created_at / updated_at 까지는 나오지 않음 -> admin.py에서 조정

    @classmethod
    def dummy(cls, n):
        f = Faker()
        for _ in range(n):
            cls.objects.create(
                user_id=1,
                content=f.sentence(),
                icon='fas fa-angry-creative'
            )
```





* AUTH_USER_MODEL  // models.py

우선 AbstractUser 함수를 불러와야 한다. 이를 사용하면 기존의 auth_user 테이블에 있던 열(column)들을 전부 유지한 채 새로운 열을 추가할 수 있다. 앞으로는 auth_user의 역할을 MyUser가 대신할 것이다.

```python
# User < AbstractUser < AbstractBaseUSer
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class User(AbstractUser):
    # fans = models.ManyToManyField(User, related_name='stars')
    # 변수처리화, 수정하기도 용이
    fans = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='stars')

```



* AUTH_USER_MODEL // forms.py

```python
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, AuthenticationForm
# from .models import User
from django.contrib.auth import get_user_model
User = get_user_model()  # 헬퍼함수, 헬퍼메서드


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'email', )


class CustomAuthenticationForm(AuthenticationForm):
    class Meta:
        model = User
```







```python
from django_extensions.db.models import TimeStampedModel


class Posting(TimeStampedModel):
    like_users = models.ManyToManyField(User, related_name='like_posts')  # 2개의 테이블을 각각 참조할 테이블 생성
```

