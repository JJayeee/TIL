```python
@require_GET
def detail(request, id):
    article = get_object_or_404(Articles, id=id)
    return render(request, 'board/detail.html', {
        'article': article,
    })
# http://127.0.0.1:8000/board/articles/50000/
# DoesNotExist at /board/articles/50000/
# Articles matching query does not exist.
# -> "GET /board/articles/50000/ HTTP/1.1" 500 81424
# 없는 것을 요청한 것인데 개발쪽 서버 문제인 에러로 값이 나가고 있음
# def detail(request, id):
#     article = Articles.objects.get(id=id)  # <A_id>
#     return render(blah)
# 수정 후:
# -> Page not found (404)
# No Articles matches the given query.
```



```python
@require_POST
def delete(request, id):
    article = get_object_or_404(Articles, id=id)
    article.delete()
    # return redirect('board:List')
    return redirect(article)
# 데코레이터를 달아놨기 때문에 더이상 url으로 작동되지 않음 -> 405 error

# Method Not Allowed (GET): /board/articles/3/delete/
# [07/Oct/2019 16:52:47] "GET /board/articles/3/delete/ HTTP/1.1" 405 0
```



```python
is_like = article.like_users.filter(id=request.user.id).exists()


@login_required  # login 했는 지 확인 -> url 이 무조건 '/accounts/login/'으로 감
# 필요한 경우 인자를 지정해주면 되긴 하다. @login_required(login_url='/users/login/')
@require_GET
def posting_detail(request, posting_id):
    posting = get_object_or_404(Posting, id=posting_id)
    # comments = posting.comment_set.all() -> related_name 설정 하면 아래로
    comments = posting.comments.all()
    is_like = True if posting.like_users.filter(id=request.user.id).exists() else False
    return render(request, 'sns/posting_detail.html', {
        'posting': posting,
        'comments': comments,
        'is_like': is_like,
    })


@login_required
@require_POST
def toggle_like(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    user = request.user
    if article.like_users.filter(id=user.id).exists():
        article.like_users.remove(user)
    else:
        article.like_users.add(user) # 어차피 중복 안 되긴 함
    return redirect('articles:article_detail', article_id)


@login_required
@require_POST
def comment_create(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    comment_form = CommentModelForm(request.POST)
    if comment_form.is_valid():
        comment = comment_form.save(commit=False)
        comment.article = article
        comment.user = request.user
        comment.save()
    return redirect('articles:article_detail', article_id)


@login_required
@require_POST
def comment_delete(request, article_id, comment_id):
    comment = get_object_or_404(Comment, id=comment_id, article=article_id)
    comment.delete()
    return redirect('articles:article_detail', article_id)
```



```python
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_GET, require_POST, require_http_methods

from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.contrib.auth.decorators import login_required
User = get_user_model()


@require_http_methods(['GET', 'POST'])
def signup(request):
    if request.user.is_authenticated:
        return redirect('articles:article_list')
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect('articles:article_list')
    else:
        form = UserCreationForm()
    return render(request, 'accounts/form.html', {
        'form': form
    })


@require_http_methods(['GET', 'POST'])
def login(request):
    if request.user.is_authenticated:
        return redirect('articles:article_list')
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            user = form.get_user()
            auth_login(request, user)
            return redirect(request.GET.get('next') or 'articles:article_list')
    else:
        form = AuthenticationForm(request)
    return render(request, 'accounts/form.html', {
        'form': form
    })


def logout(request):
    auth_logout(request)
    return redirect('articles:article_list')

```



* star-fan

  * models.

  ```python
  class User(AbstractUser):
      # fans = models.ManyToManyField(User, related_name='stars')
      # 변수처리화, 수정하기도 용이
      fans = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='stars')
  ```

  * views.

  ```python
  def follow(request, user_id):
      fan = request.user
      star = get_object_or_404(User, id=user_id)
      if fan != star:
          if star.fans.filter(id=fan.id).exists():
              star.fans.remove(fan)
          else:
              star.fans.add(fan)
      return redirect(star)
  ```





* image_upload / views

  ```python
  @login_required
  @require_POST
  def create_posting(request):
      # posting = Posting()
      # posting.content = request.POST.get('content')
      # posting.icon = ''
      # posting.image = request.FILES.get('image')
      # posting.save()
      # return redirect(posting)
      form = PostingModelForm(request.POST, request.FILES)  # 검증 & 저장 준비
      if form.is_valid():  # 검증
          # posting = form.save()  # 저장 => Posting 객체를 return, return 값을 변수에 할당
          # 위는 사용자 정보 담기 전
          
          posting = form.save(commit=False)
          # 모든 request는 user가 담겨 있다, 없으면 anonymous라도 있음
          # posting.user_id = request.user.id
          posting.user = request.user  # 위에 login_required로 인해, anony는 걱정할 필요 X
          posting.save()
          return redirect(posting)
      else:
          return redirect('sns:posting_list')
  ```

  



#### image - model의 경우

* models.py

```python

from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit

# models created 언제 생긴거지요 -> timestampfield 덕분, models.Model 하고 field 설정하는 것과 똑같음


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

```







* views.py

```python
@login_required
@require_http_methods(['GET', 'POST'])
def create_posting(request):
    images = request.FILES.getlist('file')
    if request.method == 'POST':
        posting_form = PostingForm(request.POST)
        if posting_form.is_valid() and len(images) <= 5:
            posting = posting_form.save(commit=False)
            posting.auther = request.user
            posting.save() 

            words = posting.content.split()
            for word in words:
                if word[0] == '#':
                    # get_or_create의 return => list
                    tag = HashTag.objects.get_or_create(content=word)
                    posting.hashtags.add(tag[0])
         

            for image in images:
                request.FILES['file'] = image
                image_form = ImageForm(files=request.FILES)
                if image_form.is_valid():
                    image = image_form.save(commit=False)
                    image.posting = posting
                    image.save()
            return redirect(posting)
    else:
        posting_form = PostingForm()
        image_form = ImageForm()
    return render(request, 'postings/posting_form.html', {
        'posting_form': posting_form,
        'image_form': image_form,
    })
```

