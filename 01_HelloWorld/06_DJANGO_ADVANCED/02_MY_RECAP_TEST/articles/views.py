from django.shortcuts import render, redirect, get_object_or_404
from .models import Article, Comment
from .forms import ArticleModelForm, CommentModelForm

from django.views.decorators.http import require_GET, require_POST, require_http_methods

from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
User = get_user_model()


@require_GET
def article_list(request):
    articles = Article.objects.all()
    return render(request, 'articles/article_list.html', {
        'articles': articles,
    })


@require_GET
def article_detail(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    is_like = article.like_users.filter(id=request.user.id).exists()
    comments = article.comment_set.all()
    comment_form = CommentModelForm()
    return render(request, 'articles/article_detail.html', {
        'article': article,
        'comments': comments,
        'comment_form': comment_form,
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
        article.like_users.add(user)
    return redirect('articles:article_detail', article_id)


@login_required
@require_http_methods(['GET', 'POST'])
def article_create(request):
    if request.method == 'POST':
        form = ArticleModelForm(request.POST)
        if form.is_valid():
            article = form.save(commit=False)
            article.user = request.user
            article.save()
            return redirect('articles:article_detail', article.id)
    else:
        form = ArticleModelForm()
    return render(request, 'articles/form.html', {
        'form': form,
    })


@login_required
@require_http_methods(['GET', 'POST'])
def article_update(request, article_id):
    article = get_object_or_404(Article, id=article_id)

    if request.user != article.user:
        return redirect('articles:article_detail', article.id)

    if request.method == 'POST':
        form = ArticleModelForm(request.POST, instance=article)
        if form.is_valid():
            article = form.save()
            return redirect('articles:article_detail', article.id)
    else:
        form = ArticleModelForm(instance=article)
    return render(request, 'articles/form.html', {
        'form': form,
    })


@login_required
@require_POST
def article_delete(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    if request.user != article.user:
        return redirect('articles:article_detail', article.id)
    
    article.delete()
    return redirect('articles:article_list')


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
