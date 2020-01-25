from django.db import models
from django.urls import reverse
from django.conf import settings  # MASTER_APP/settings.py import
from faker import Faker


class Posting(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # accounts model이 name space에 없음, 어떻게 foreignkey 하는가 -> settings.py를 확인 
    # 숨겨져서 AUTH_USER_MODEL이 있음 AUTH앱이 있고, settings를 import 해서 해당 모델을 가져올 수 있는 것
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="like_postings", blank=True)
    content = models.TextField()
    icon = models.CharField(max_length=30, default='')
    # view_count = models.IntegerField()
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


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    posting = models.ForeignKey(Posting, on_delete=models.CASCADE, related_name='comments')
    # related_name이 없으면, posting.comment_set / 있으면, posting.comments
    content = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.id}: {self.content[:10]}'

    @classmethod
    def dummy(cls, n, posting_id):
        f = Faker()
        for _ in range(n):
            cls.objects.create(
                user_id=1,
                posting_id=posting_id,
                content=f.sentence(),
            )

"""
In [3]: p = Posting.objects.last()

In [4]: p
Out[4]: <Posting: 1: rhfgfdg>

In [5]: p = Posting.objects.first()

In [6]: p
Out[6]: <Posting: 12: Unit concern can res>

In [7]: u1 = User.objects.first()

In [8]: u2 = User.objects.last()

In [9]: p.like_users.add(u1)

In [10]: u2.like_postings.add(p)

In [11]: u2.like_postings.add(p)
    -> record 중복 안 됨

In [12]: u2.like_postings.remove(p)
    -> 좋아요 취소
"""

"""
In [15]: for i in range(10):
    ...:     u = User()
    ...:     u.username = f'dummyUser-no.{i}'
    ...:     u.set_password('jay123!@#')
    ...:     u.save()
"""