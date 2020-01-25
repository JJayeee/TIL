from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_GET, require_POST, require_http_methods

from .models import Article
from .forms import ArticleForm

from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
User = get_user_model()


@login_required
def toggle_like(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    user = request.user
    if article.like_users.filter(id=user.id).exists():
        article.like_users.remove(user)
    else:
        article.like_users.add(user)
    return redirect('articles:article_detail', article.id)



@require_GET
def article_list(request):
    articles = Article.objects.all()
    return render(request, 'articles/index.html', {
        'articles': articles,
    })


@require_GET
def article_detail(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    return render(request, 'articles/article_detail.html', {
        'article': article,
    })


@login_required
@require_http_methods(['GET', 'POST'])
def create_article(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            article = form.save(commit=False)
            article.user = request.user
            article.save()
            return redirect('articles:article_detail', article.id)
    else:
        form = ArticleForm()
    return render(request, 'articles/form.html', {
        'form': form,
    })


@login_required
@require_http_methods(['GET', 'POST'])
def update_article(request, article_id):
    article = get_object_or_404(Article, id=article_id)

    if article.user != request.user:
        return redirect('articles:article_list')

    if request.method == 'POST':
        form = ArticleForm(request.POST, instance=article)
        if form.is_valid():
            article = form.save()
            return redirect('articles:article_detail', article.id)
    else:
        form = ArticleForm(instance=article)
    return render(request, 'articles/form.html', {
        'form': form,
    })


def delete_article(request, article_id):
    pass


def create_comment(request, article_id):
    pass


def delete_comment(request, article_id, comment_id):
    pass

