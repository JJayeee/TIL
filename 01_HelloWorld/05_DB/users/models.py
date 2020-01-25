from django.db import models

# class User(models.Model):
#     first_name = models.CharField(max_length=10)
#     last_name = models.CharField(max_length=10)
#     age = models.IntegerField()
#     country = models.CharField(max_length=10)
#     phone = models.CharField(max_length=15)
#     balance = models.IntegerField()


class User(models.Model):
    username = models.CharField(max_length=20)

class Article(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=20)

class Comment(models.Model):
    content = models.CharField(max_length=20)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)