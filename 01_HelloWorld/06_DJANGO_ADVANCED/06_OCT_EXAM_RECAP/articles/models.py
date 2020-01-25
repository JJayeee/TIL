from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    like_users = models.ManyToManyField(User, related_name='like_articles')
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.CharField(max_length=200)

