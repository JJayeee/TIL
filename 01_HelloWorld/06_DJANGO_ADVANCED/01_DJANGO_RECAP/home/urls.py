from django.urls import path
from . import views


app_name = 'home'  # 변수화 시킬 수 있는 것은 변수화 시키자(변경 대비 등)


urlpatterns = [
    path('mymymymy',  views.index, name='index'),
    # '' => mymymymy로 바꿔도 하나하나 home에 대해 다 바꿀 필요가 없음
    # HOST/home// ('':empty:/None/ - convention:index)
    path('hi/<str:name>/', views.hi),  # HOST/home/hi
    # hi() got an unexpected keyword argument 'name'
    path('guess/', views.guess, name='guess'),
    path('answer/', views.answer, name='answer'),
]
