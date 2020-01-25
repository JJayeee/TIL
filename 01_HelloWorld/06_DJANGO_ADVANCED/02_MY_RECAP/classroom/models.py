from django.db import models
from django.urls import reverse


class Student(models.Model):
    name = models.CharField(max_length=10)
    age = models.IntegerField()
    major = models.TextField()

    def get_absolute_url(self):
        return reverse("classroom:detail", kwargs={"id": self.id})
