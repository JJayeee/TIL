from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_GET, require_POST, require_http_methods

from django.contrib.auth import login as auth_login, logout as auth_logout
# 회원가입용 Form, 인증(로그인)용 Form
from .forms import CustomUserCreationForm, CustomAuthenticationForm
# 현재 Project에서 사용 할 User 모델을 return 하는 함수

# from .models import User 말고! 이렇게 하지 말고 User는 따로 꺼내 쓰는 코드가 아래와 같다.
# settings.authuser 말고 authuser를 안전하게 끄내 쓰기 
from django.contrib.auth import get_user_model
User = get_user_model()
"""
In [1]: from django.contrib.auth import get_user_model

In [2]: get_user_model()
Out[2]: accounts.models.User

In [3]: get_user_model()()
Out[3]: <User: >
"""


@require_http_methods(['GET', 'POST'])
def signup(request):
    if request.user.is_authenticated:
        return redirect('/')

    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            return redirect('/')
    else:
        form = CustomUserCreationForm()
    return render(request, 'accounts/signup.html', {
        'form': form,
    })


@require_http_methods(['GET', 'POST'])
def login(request):
    if request.user.is_authenticated:
        return redirect('/')

    if request.method == 'POST':
        form = CustomAuthenticationForm(request, request.POST)
        if form.is_valid():
            auth_login(request, form.get_user())
            return redirect('/')
    else:
        form = CustomAuthenticationForm()
    return render(request, 'accounts/login.html', {
        'form': form,
    })


def logout(request):
    auth_logout(request)
    return redirect('/')


@require_GET
def user_page(request, user_id):
    user_info = get_object_or_404(User, id=user_id)
    # user가 겹쳐서
    return render(request, 'accounts/user_page.html', {
        'user_info': user_info,
    })


def follow(request, user_id):
    fan = request.user
    star = get_object_or_404(User, id=user_id)
    if fan != star:
        if star.fans.filter(id=fan.id).exists():
            star.fans.remove(fan)
        else:
            star.fans.add(fan)
    return redirect(star)
