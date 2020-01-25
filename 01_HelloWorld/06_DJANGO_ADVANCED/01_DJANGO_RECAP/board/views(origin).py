from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_GET, require_POST
from .models import Articles
# from . import models # 이 경우 model.Articles 로 호출
from .forms import ArticleModelForm
# new 부분


@require_GET
def index(request):
    return render(request, 'board/index.html')


@require_GET
def List(request):
    articles = Articles.objects.all()  # [<A1>, <A2>, <A3>, ...] 쿼리셋(리스트st)
    return render(request, 'board/List.html', {
        'articles': articles,
    })


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


@require_GET
def new(request):
    return render(request, 'board/new.html')


@require_POST
def create(request):
    article = Articles()
    article.title = request.POST.get('title')
    article.content = request.POST.get('content')
    article.save()
    return redirect('board:detail', article.id)
# create에 return 값이 없으면
# ValueError at /board/articles/create
# The view board.views.create didn't return an HttpResponse object.
# It returned None instead.

# f'/board/articles/{article.id}' = 'board:detail', article.id
# 파이썬은 ,로 구분 가능가능


def new_and_create(request):
    if request.method == 'POST':
        form = ArticleModelForm(request.POST)  # 아래에 대해 자동 분류
        # article = Articles()
        # article.title = request.POST.get('title')
        # article.content = request.POST.get('content')
        # article.save()
        if form.is_valid():
            form.save()
            return redirect(article)
            # 이 if문에 대한 else는 form이 위에서 남아있기 때문에 아래에 최종 return으로 넘어간다
    else:
        form = ArticleModelForm()

    return render(request, 'board/new3.html', {
        'form': form,
    })
# new + create


@require_GET
def edit(request, id):
    article = get_object_or_404(Articles, id=id)
    return render(request, 'board/edit.html', {
        'article': article,
    })


@require_POST
def update(request, id):
    article = get_object_or_404(Articles, id=id)
    article.title = request.POST.get('title')
    article.content = request.POST.get('content')
    article.save()
    return redirect('board:detail', article.id)
# 2: 성공 / 3: redirect / 4: 사용자의 잘못 / 5: 서버 측 잘못


# edit + update
def edit_update(request, id):
    article = get_object_or_404(Articles, id=id)
    if request.method == 'POST':
        article.title = request.POST.get('title')
        article.content = request.POST.get('content')
        article.save()
        return redirect('board:detail', article.id)
    else:
        return render(request, 'board/edit.html', {
            'article': article,
        })


@require_POST
def delete(request, id):
    article = get_object_or_404(Articles, id=id)
    article.delete()
    # return redirect('board:List')
    return redirect(article)
# 데코레이터를 달아놨기 때문에 더이상 url으로 작동되지 않음 -> 405 error

# Method Not Allowed (GET): /board/articles/3/delete/
# [07/Oct/2019 16:52:47] "GET /board/articles/3/delete/ HTTP/1.1" 405 0
