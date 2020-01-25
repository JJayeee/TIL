from django.urls import path
from . import views

app_name = 'board'

urlpatterns = [
    path('', views.index, name='index'),

    # 1) Read _ list(render): 글 목록
    path('articles/', views.List, name='List'),
    # 2) Read _ detail(render): 글 상세
    path('articles/<int:id>/', views.detail, name='detail'),

    # 3) Create _ new(render): 글 쓰기
    path('articles/new/', views.new, name='new'),
    # 4) Create _ create: 글 저장(DB), html이 존재하는 것은 아님
    path('articles/create/', views.create, name='create'),
    # new_create에서는 create 필요 없음
    path('articles/new_and_create/', views.new_and_create, name='new_create')
    # 5) Update _ edit(render): 글 수정 쓰기
    path('articles/<int:id>/edit/', views.edit, name='edit'),
    # 6) Update _ update: 글 수정 저장(DB)
    path('articles/<int:id>/update/', views.update, name='update'),
    # 7) Delete _ delete: 글 삭제, html이 존재하는 것은 아님, index 화면으로 돌아감
    path('articles/<int:id>/delete/', views.delete, name='delete'),
]
