from django import forms
from .models import Article, Comment


class ArticleModelForm(forms.ModelForm):
    title = forms.CharField(min_length=2, max_length=200)

    class Meta:
        model = Article
        fields = '__all__'


class CommentModelForm(forms.Form):
    content = forms.CharField(min_length=2, max_length=200)

    class Meta:
        model = Comment
        fields = ('content', )

