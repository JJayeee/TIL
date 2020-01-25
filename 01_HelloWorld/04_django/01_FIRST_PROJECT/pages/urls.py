from django.urls import path
from . import views
# from . import views
# . <- 내 위치 / import로 연결한 것!

urlpatterns = [
    path('', views.index),  # DOMAIN/pages/
    path('about/', views.about),  # DOMAIN/pages/about
    path('portfolio/', views.portfolio),  # D/pages/portfolio
    path('help/', views.help),
]
