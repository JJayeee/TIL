"""first_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

"""
from pages import views
"""
# pages 앱의 views 연결
""" 이것도 forwarding 하면 필요 없어 지는 것!! """

urlpatterns = [
    path('admin/', admin.site.urls),

    # path('pages/', views.index),
    # path('pages/about/', views.about),

    # 일을 하는 곳은 views.py
    # urls는 ('', blah) 로 들어왔다면 blah 를 보내라
    # app이 여러개 되면 views 중복(namespace), 말 반복 등등 복잡해짐 so, 
    # 포워딩해버리자! = include
    path('pages/', include('pages.urls')),
    path('utils/', include('utils.urls')),
]
