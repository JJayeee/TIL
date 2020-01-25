from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_GET, require_POST, require_http_methods
from .models import Article, Comment
from .forms import ArticleModelForm, CommentModelForm


@require_GET
def article_list(request):
    articles = Article.objects.all()
    return render(request, 'board2/article_list.html', {
        'articles': articles,
    })


@require_http_methods(['POST', 'GET'])
def new_article(request):
    if request.method == 'POST':
        form = ArticleModelForm(request.POST)
        if form.is_valid():
            article = form.save()
            return redirect(article)
    else:
        form = ArticleModelForm()
    return render(request, 'board2/new_article.html', {
        'form': form,
    })


@require_GET
def article_detail(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    comments = article.comments.all().order_by('-id')
    comment_form = CommentModelForm()
    return render(request, 'board2/article_detail.html', {
        'article': article,
        'comments': comments,
        'comment_form': comment_form,
    })


@require_http_methods(['POST', 'GET'])
def edit_article(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    if request.method == 'POST':
        form = ArticleModelForm(request.POST, instance=article)
        if form.is_valid():
            article = form.save()
            return redirect(article)
    else:
        form = ArticleModelForm(instance=article)
    return render(request, 'board2/edit_article.html', {
        'form': form,
    })


@require_POST
def delete_article(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    article.delete()
    return redirect('board:article_list')


@require_POST
def new_comment(request, article_id):
    article = get_object_or_404(Article, article_id)
    form = CommentModelForm(request.POST)
    if form.is_valid():
        comment = form.save(commit=False)
        comment.article = article
        comment.save()
    return redirect(article)


@require_POST
def delete_comment(request, article_id, comment_id):
    comment = get_object_or_404(Comment, id=comment_id, article=article_id)
    comment.delete()
    return redirect(comment.article)