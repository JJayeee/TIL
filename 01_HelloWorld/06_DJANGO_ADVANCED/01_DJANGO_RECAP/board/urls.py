from django.urls import path
from . import views

app_name = 'board'


# model이 2개 이상이 되자, 이름이 문제가 된다 -> change
urlpatterns = [
    path('articles/', views.article_list, name='article_list'),
    path('articles/<int:article_id>/', views.article_detail, name='article_detail'),
    path('articles/new/', views.new_article, name='new_article'),
    path('articles/<int:article_id>/edit/', views.edit_article, name='edit_article'),
    path('articles/<int:article_id>/delete/', views.delete_article, name='delete_article'),

    # Comment Create
    # /board/articles/N/comments/new/
    path('articles/<int:article_id>/comments/new/', views.new_comment, name='new_comment'),

    # Delete Comment
    path('articles/<int:article_id>/comments/<int:comment_id>/delete/', views.delete_comment, name='delete_comment'),
]
