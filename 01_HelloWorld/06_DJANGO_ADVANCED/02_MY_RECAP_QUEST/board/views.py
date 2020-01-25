from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_http_methods, require_POST, require_GET

from .models import Article, Comment
from .forms import ArticleModelForm, CommentModelForm


@require_GET
def article_list(request):
    articles = Article.objects.all()
    return render(request, 'board/article_list.html', {
        'articles': articles,
    })


@require_http_methods(['GET', 'POST'])
def new_article(request):
    if request.method == 'POST':
        form = ArticleModelForm(request.POST)
        if form.is_valid():
            article = form.save()
            return redirect(article)
    else:
        form = ArticleModelForm()
    return render(request, 'board/new_article.html', {
        'form': form,
    })


@require_GET
def article_detail(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    comments = article.comment_set.all().order_by('-id')
    comment_form = CommentModelForm()
    return render(request, 'board/article_detail.html', {
        'article': article,
        'comments': comments,
        'comment_form': comment_form,
    })


@require_http_methods(['GET', 'POST'])
def edit_article(request, article_id):
    article = get_object_or_404(Article, id=article_id)
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
    article = get_object_or_404(Article, id=article_id)
    article.delete()
    return redirect('board:article_list')


@require_POST
def new_comment(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    comment_form = CommentModelForm(request.POST)

    if comment_form.is_valid():
        comment = comment_form.save(commit=False)
        comment.article_id = article_id
        comment.save()
    return redirect(article)


@require_POST
def delete_comment(request, article_id, comment_id):
    comment = get_object_or_404(Comment, id=comment_id, article=article_id)
    comment.delete()
    return redirect(comment.article)
