from django.db import models
from django.urls import reverse
# User < AbstractUser < AbstractBaseUSer
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from faker import Faker
f = Faker()


class User(AbstractUser):
    # fans = models.ManyToManyField(User, related_name='stars')
    # 변수처리화, 수정하기도 용이
    fans = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='stars')

    def __str__(self):
        return self.username


    @classmethod
    def dummy(cls, n):
        for i in range(n):
            u = cls()
            u.username = f.first_name()
            u.set_password('jay123!@#')
            u.save()


    def get_absolute_url(self):
        return reverse("accounts:user_page", kwargs={"user_id": self.pk})
    


# In [3]: fan1 = User.objects.get(id=1)
# In [8]: star = User.objects.get(id=4)
# In [11]: star.stars.add(fan1)
# In [13]: star.stars.all()
# Out[13]: <QuerySet [<User: Eric>, <User: Abigail>]>