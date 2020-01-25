from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_GET, require_POST, require_http_methods
from .models import Article, Comment
from .forms import ArticleModelForm, CommentModelForm
from django.contrib.auth import get_user_model
User = get_user_model()
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm




@require_GET
def article_list(request):
    articles = Article.objects.all()
    return render(request, 'articles/article_list.html', {
        'articles': articles
    })


@require_GET
def article_detail(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    comments = article.comment_set.all()
    comment_form = CommentModelForm()
    is_like = article.like_users.filter(id=request.user.id).exists()
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
@require_http_methods(['POST', 'GET'])
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
        'form': form
    })


@login_required
@require_http_methods(['POST', 'GET'])
def article_update(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    if article.user != request.user:
        return redirect('articles:article_detail', article_id)
    if request.method == 'POST':
        form = ArticleModelForm(request.POST, instance=article)
        if form.is_valid():
            form.save()
            return redirect('articles:article_detail', article_id)
    else:
        form = ArticleModelForm(instance=article)
    return render(request, 'articles/form.html', {
        'form': form,
    })


@login_required
@require_POST
def article_delete(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    if article.user != request.user:
        return redirect('articles:article_detail', article_id)
    article.delete()
    return redirect('articles:article_list')


@login_required
@require_POST
def comment_create(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    comment_form = CommentModelForm(request.POST)
    if comment_form.is_valid():
        comment = comment_form.save(commit=False)
        comment.user = request.user
        comment.article = article
        comment.save()
    return redirect('articles:article_detail', article_id)



def comment_delete(request, article_id, comment_id):
    comment = get_object_or_404(Comment, id=comment_id, article=article_id)
    if request.user == comment.user:
        comment.delete()
    return redirect('articles:article_detail', article_id)
