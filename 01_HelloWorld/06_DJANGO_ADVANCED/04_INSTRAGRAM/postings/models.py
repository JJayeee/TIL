from django.db import models
from django.urls import reverse

from django_extensions.db.models import TimeStampedModel

from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit

from django.contrib.auth import get_user_model
User = get_user_model()

# models created 언제 생긴거지요 -> timestampfield 덕분, models.Model 하고 field 설정하는 것과 똑같음

class HashTag(TimeStampedModel):
    content = models.CharField(max_length=20, unique=True)


class Posting(TimeStampedModel):
    like_users = models.ManyToManyField(User, related_name='like_posts')  # 2개의 테이블을 각각 참조할 테이블 생성

    auther = models.ForeignKey(User, on_delete=models.CASCADE, related_name='postings')
    content = models.CharField(max_length=140)
    hashtags = models.ManyToManyField(HashTag, blank=True, related_name='postings')

    class Meta:
        ordering = ('-created',)

    def get_absolute_url(self):
        return reverse("postings:posting_detail", kwargs={"posting_id": self.pk})
    

# 한 게시글에 이미지를 여러개 올릴 수 도 있으니까
class Image(models.Model):
    posting = models.ForeignKey(Posting, on_delete=models.CASCADE, related_name='images')
    # models.ImageField 말고 받을 때 이미지 처리 하려고
    file = ProcessedImageField(
        processors=[ResizeToFit(600, 600, mat_color=(45, 45, 45))],
        upload_to='postings/images',
        format='JPEG',
        options={'quality': 90},  # 넘 큰 사진 같은거
    )


class Comment(TimeStampedModel):
    auther = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')  # auther.comments
    posting = models.ForeignKey(Posting, on_delete=models.CASCADE, related_name='comments')  # posting.comments
    content = models.CharField(max_length=140)      # related_name은 남이 나를 부르는 것
