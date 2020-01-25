from django import forms
from .models import Posting, Comment


class PostingModelForm(forms.ModelForm):  # 데이터의 입력과 검증 & HTML(안 써도 무방)
    content = forms.CharField(min_length=2)

    class Meta:
        model = Posting
        fields = ('content', 'image', 'icon')


class CommentModelForm(forms.ModelForm):
    content = forms.CharField(min_length=2, max_length=200)  # 필드에 대한 이야기

    class Meta:  # 정보에 대한 이야기
        model = Comment
        fields = ('content',)
