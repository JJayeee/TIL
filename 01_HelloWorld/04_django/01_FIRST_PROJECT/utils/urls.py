from django.urls import path
from . import views


# utils/
urlpatterns = [
    # 끝에 '/'
    # cube/<정수>/ (<> 는 고정값이 아니라는 상징)
    path('cube/<int:num>/', views.cube),
    # check_int/<정수>
    path('check_int/<int:num>/', views.check_int),
    # pick_lotto/
    path('pick_lotto/', views.pick_lotto),
]
