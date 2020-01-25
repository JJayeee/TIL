from django.urls import path
from . import views


app_name = 'classroom'

urlpatterns = [
    path('students/', views.List, name='List'),
    path('students/new/', views.new, name='new'),
    path('students/<int:id>/', views.detail, name='detail'),
    path('students/<int:id>/edit/', views.edit, name='edit'),
    path('students/<int:id>/delete/', views.delete, name='delete'),
]
