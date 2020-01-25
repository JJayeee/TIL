from django.urls import path
from . import views

app_name = 'board2'

urlpatterns = [
    path('article/', views.article_list, name='article_list'),
    path('article/new/', views.new_article, name='new_article'),
    path('article/<int:article_id>/detail/', views.article_detail, name='article_detail'),
    path('article/<int:article_id>/edit/', views.edit_article,  name='edit_article'),
    path('article/<int:article_id>/delete/', views.delete_article, name='delete_article'),
    path('article/<int:article_id>/comment/new', views.new_comment, name='new_comment'),
    path('article/<int:article_id>/comment/<int:comment_id>/delete', views.delete_comment, name='delete_comment'),
]
