from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings

class Genre(models.Model):
    name = models.CharField(max_length=150)


class Movie(models.Model):
    id = models.IntegerField(primary_key=True)
    movieName = models.CharField(max_length=150)
    movieNameEn = models.CharField(max_length=150)
    watchGrade = models.CharField(max_length=150)
    openDate = models.DateField()
    runningTime = models.CharField(max_length=50)
    director = models.CharField(max_length=45)
    summary = models.TextField()
    genre = models.ManyToManyField(Genre, related_name='movie_genres')
    posterUrl = models.CharField(max_length=200)
    actors = models.CharField(max_length=100)
    bechdelRating = models.IntegerField()
    naverRating = models.FloatField()


class Rating(models.Model):
    comment = models.TextField(blank=True, null=True)
    score = models.IntegerField()
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='rating_movies')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='rating_users')
    created_at = models.DateTimeField(auto_now=True)


# class collection


