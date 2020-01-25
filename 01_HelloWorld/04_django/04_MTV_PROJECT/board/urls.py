from django.urls import path
from . import views

urlpatterns = [
    # Create
    path('articles/new/', views.new),  # /board/articles/new/
    path('articles/create/', views.create),

    # Read
    path('articles/', views.index),  # /board/articles/
    # 들어오는 번호를 int 화 하여 변수로 쓰겠다 -> view로 넘기는 name
    path('articles/<int:article_id>/', views.show),  # /board/articles/1/

    # Update
    # Delete  # /board/articles/1/delete/
    path('articles/<int:article_id>/delete/', views.delete),
]
