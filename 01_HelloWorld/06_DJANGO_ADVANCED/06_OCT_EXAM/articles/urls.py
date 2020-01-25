from django.urls import path
from . import views

app_name = 'articles'

urlpatterns = [
    path('', views.article_list, name='article_list'),
    path('create/', views.create_article, name='create_article'),
    path('<int:article_id>/', views.article_detail, name='article_detail'),
    path('<int:article_id>/update/', views.update_article, name='update_article'),
    path('<int:article_id>/delete/', views.delete_article, name='delete_article'),

    path('<int:article_id>/comments/', views.create_comment, name='create_comment'),
    path('<int:article_id>/comments/<int:comment_id>/delete', views.delete_comment, name='delete_comment'),

    path('<int:article_id>/like/', views.toggle_like, name='like'),
]