from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from movies.models import Movie, Rating, Genre


class User(AbstractUser):
    dislikeGenres = models.ManyToManyField(Genre, related_name='dislike_users')
    bechdelSetting = models.IntegerField(default=0)
