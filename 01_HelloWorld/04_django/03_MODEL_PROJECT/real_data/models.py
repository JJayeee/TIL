from django.db import models


class HotIssue(models.Model):
    date = models.CharField(max_length=50)
    time = models.CharField(max_length=50)
    rank = models.IntegerField()
    keyword = models.CharField(max_length=50)


