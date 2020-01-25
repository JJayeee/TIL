from django import forms
from .models import Article, Comment

class ArticleModelForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ('title', 'content')


class CommentModelForm(forms.ModelForm):
    content = forms.CharField(max_length=200)
    class Meta:
        model = Comment
        fields = ('content', )
