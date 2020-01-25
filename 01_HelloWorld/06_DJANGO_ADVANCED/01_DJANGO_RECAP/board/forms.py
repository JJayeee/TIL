from django import forms
from .models import Articles, Comment


# forms.Form => Data 입력 및 검증 + HTML 생성
# ModelForm => Data 입력/검증 + HTML 생성 <= 모델 정보를 알고 있음


class ArticleForm(forms.Form):
    title = forms.CharField(min_length=2, max_length=100)
    content = forms.CharField()
    # 검증할 coloum에 대해 다 써주어야 함
    # class Meta 없음


class ArticleModelForm(forms.ModelForm):
    # 1. Data 입력 및 검증
    # 2. HTML 생성
    title = forms.CharField(min_length=2, max_length=100)  # <- 말 없어도 되는데, 확인 차
    # 최소 2글자는 써야 -> 아래 meta에 도달 (사전 검증)

    class Meta:
        model = Articles
        fields = '__all__'


class CommentModelForm(forms.ModelForm):
    content = forms.CharField(min_length=2, max_length=200)
    # 여기 max_length가 검증/저장
    # save 할 때 검증을 거치기 때문에, 없는 article_id를 입력하게 되면
    # -> IntegrityError: FOREIGN KEY constraint failed

    class Meta:
        model = Comment
        # fields = '__all__'  # 모든 col에 대한 검증
        fields = ('content',)  # 모델 form이 검증할 때는, id 말고 content만 검증하겠다. 
