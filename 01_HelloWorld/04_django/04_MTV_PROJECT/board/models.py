from django.db import models


class Articles(models.Model):
    title = models.Charfield(max_length=200)
    content = models.Textfield()
    created = models.DateField(auto_now_add=True)
    # 처음 생성시에만 자동으로
    modified = models.DateTimeField(auto_now=True)
    # 무언가 변경 될 때만 (처음엔 같은 값으로 들어감)

    # 관리자모드에서도 아래의 형태로 뜬다
    def __str__(self):
        return f'{self.id}: {self.title}'
