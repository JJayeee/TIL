from django.urls import path
from . import views

urlpatterns = [
    path('', views.signup),
    path('<str:username>/', views.my_todos),
]
