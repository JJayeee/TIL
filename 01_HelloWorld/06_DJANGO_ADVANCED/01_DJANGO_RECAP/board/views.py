from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_GET, require_POST, require_http_methods
from .models import Articles, Comment
from .forms import ArticleModelForm, CommentModelForm, ArticleForm
from IPython import embed


# Create Article with Form (test)
def new_article_with_form(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            article = Articles()
            article.title = form.cleaned_data.get('title')  # 모델 정보가 없기 때문에 각각 입력
            article.content = form.cleaned_data.get('content')  # cleaned data : 보장 된, 검증 된 데이터
            # article = Articles.objects.create(title=title, content=content)
            article.save()
            return redirect(article)
    else:
        form = ArticleForm()
    return render(request, 'board/new_article.html', {
        'form': form,
    })


# CRUD
@require_http_methods(['GET', 'POST'])  # get, post는 받아서 처리하겠다
def new_article(request):
    # 요청이 GET/POST 인지 확인한다.
    # POST 라면
    if request.method == 'POST':
        # ArticleModelForm 의 인스턴스 생성, Data 를 채운다(binding).
        form = ArticleModelForm(request.POST)  # 아래, 검증이 목적
        # embed() -> form.is_valid() / request.POST / request.method / form ..
        # binding 된 form 이 유효한지 체크한다.
        if form.is_valid():
            # 유효하다면 form 을 저장한다.(== article model을 저장한다)
            article = form.save()
            # 저장한 article 로 redirect 한다.
            return redirect(article)  # model get_absolute_url
        # form 이 유효하지 않다면,
        """
        else:
            # 유효하지 않은 입력데이터와 에러메시지를 사용자에게 보여준다.
            return render(request, 'board/new.html', {
                'form': form,
            })
            # -> 이 값이 최소 2 개의 글자인지 확인하세요(입력값 1 자). 메세지 창
            # 이미 form은 있기 때문에 -> 최종적으로 아래 else의 return과 병합
    # GET 이라면
    else:
        # 비어있는 form(HTML 생성기) 을 만든다.
        form = ArticleModelForm()
        # 비어있는 form 과 html 을 사용자에게 보여준다.
        return render(request, 'board/new.html', {
            'form': form
        })
        """
    else:
        form = ArticleModelForm()
    # embed()
    return render(request, 'board/new_article.html', {
        'form': form
    })


@require_GET
def article_list(request):
    articles = Articles.objects.all()
    return render(request, 'board/article_list.html', {
        'articles': articles,
    })


@require_GET
def article_detail(request, article_id):
    article = get_object_or_404(Articles, id=article_id)
    comments = article.comment_set.all().order_by('-id')
    comment_form = CommentModelForm()
    return render(request, 'board/article_detail.html', {
        'article': article,
        'comments': comments,
        'comment_form': comment_form,
    })


@require_http_methods(['POST', 'GET'])
def edit_article(request, article_id):
    article = get_object_or_404(Articles, id=article_id)

    if request.method == 'POST':
        form = ArticleModelForm(request.POST, instance=article)
        if form.is_valid():
            article = form.save()
            return redirect(article)
    else:
        form = ArticleModelForm(instance=article)
    return render(request, 'board/edit_article.html', {
        'form': form,
    })


@require_POST
def delete_article(request, article_id):
    article = get_object_or_404(Articles, id=article_id)
    article.delete()
    return redirect('board:article_list')


# 댓글 생성 용
@require_POST
def new_comment(request, article_id):
    article = get_object_or_404(Articles, id=article_id)  # 검증 먼저
    # comment = Comment()
    # comment.content = request.POST.get('comment_content')
    # comment.article_id = article.id  # save
    # comment.save()
    comment_form = CommentModelForm(request.POST)
    # 원래 comment_form.is_valid() 가 false로 나옴 -> id 필요로 해서, id가 안 넘어와서
    # comment_form.errors 의 결과를 check 하길 
    # embed()
    # meta 부분 수정 하고 나면  comment_form.is_valid() -> True

    # 근데 오류 남! -> save 하려고 할 때 오류임, if로 유효한지는 검증하지만
    # IntegrityError at /board/articles/11/comments/new/
    # NOT NULL constraint failed: board_comment.article_id

    if comment_form.is_valid():
        # comment = comment_form.save() : redirect detail 하기 위해 위에서 썼을 뿐 필요 X
        # comment_form.save()  # 충분했는데 -> meta 수정 후, 아래

        # comment = Comment()
        # comment.content = request.POST.get('comment_content')
        comment = comment_form.save(commit=False)  # save 안 한 상태
        comment.article_id = article.id  # null값만 따로 우리가 추가해주는 것
        comment.save()  # real save 
    return redirect(article)  # 저장한 것은 댓글, redirect는 article


@require_POST
def delete_comment(request, article_id, comment_id):
    # comment = get_object_or_404(Comment, id=comment_id)
    # comment.delete()
    # 경우에 따라 article과 맞지 않는 comment가 삭제 될 수 있음

    # article = get_object_or_404(Articles, id=article_id)
    # comment = get_object_or_404(Comment, id=comment_id)
    # if comment in article.comment_set.all():
    #     comment.delete()
    # 이는 파이썬이 일을 하는 것, 탄탄하지만 시간이 오래 걸림

    comment = get_object_or_404(Comment, id=comment_id, article=article_id)
    comment.delete()  # DB가 할 일은 DB에게 시키는 것이 젤 낫기 때문에
    return redirect(comment.article)
