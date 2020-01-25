from django.shortcuts import render, HttpResponse, redirect
from .models import Articles


# Create
def new(request):  # 새로운 게시글(article)을 작성할 화면
    return render(request, 'board/new.html')


def create(request):  # 사용자 입력 데이터를 DB에 저장 - 글 화면
    # print(request.GET) -> {'input_title': 제목제목}
    title = request.GET.get('input_title')
    content = request.GET.get('input_content')
    article = Articles.objects.create(title=title, content=content)
    article_id = article.id
    return redirect(f'/board/articles/{article_id}')


# Read
def index(request):  # 모든 게시글 목록을 보여주는 view
    articles = Articles.objects.all()  # []
    return render(request, 'board/index.html', {
        'articles': articles,
    })


# Read
def show(request, article_id):  # 특정 게시글을 보여주는 view
    article = Articles.objects.get(id=article_id)
    return render(request, 'board/show.html', {
        'article': article,
    })


# Update
def edit(request):  # 특정 게시글을 수정할 화면
    return render(request, 'board/edit.html')


def delete(request, article_id):  # 특정 게시글을 삭제하는 view
    article = Articles.objects.get(id=article_id)
    article.delete()
    return redirect('/board/articles')
