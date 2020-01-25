from django.urls import path
from . import views

app_name = 'board'

urlpatterns = [
    path('articles/', views.article_list, name='article_list'),
    path('articles/new/', views.new_article, name='new_article'),
    path('article/<int:article_id>/', views.article_detail, name='article_detail'),
    path('articles/<int:article_id>/edit/', views.edit_article, name='edit_article'),
    path('articles/<int:article_id>/delete/', views.delete_article, name='delete_article'),

    path('articles/<int:article_id>/comments/new/', views.new_comment, name='new_comment'),
    path('articles/<int:article_id>/comments/<int:comment_id>/delete/', views.delete_comment, name='delete_comment'),
]
