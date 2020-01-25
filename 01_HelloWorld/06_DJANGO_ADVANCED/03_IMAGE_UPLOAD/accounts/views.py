from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_http_methods, require_POST, require_GET

from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login as auth_login, logout as auth_logout
# Persist a user id and blah blah 
# 창이 바뀔 때 마다 매번 로그인 할 필요 없이 짜여 있는 함수
# 우리가 가진 login과 곂치므로 재귀되지 않도록, 이름을 바꿈


@require_http_methods(['GET', 'POST'])
def signup(request):  # new_article과 동일한 로직
    if request.user.is_authenticated:
        return redirect('sns:posting_list')

    if request.method == 'POST':  # 사용자가 회원가입 데이터를 보냈다는 뜻
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            return redirect('sns:posting_list')
    else:  # 사용자가 회원가입 HTML 을 달라는 뜻
        form = UserCreationForm()

    return render(request, 'accounts/signup.html', {
        'form': form,
    })


@require_http_methods(['GET', 'POST'])
def login(request):
    # 사용자가 login한 상태라면 다시 login창으로 가는게 아니라 무시해야 함
    if request.user.is_authenticated:
        return redirect('sns:posting_list')

    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        # AuthenticationForm만 유일하게 첫 번째 인자가 requset=None (다른 것은 늘 Data)
        if form.is_valid():
            # 인증 성공한 form에서 해당 user를 꺼냄
            auth_login(request, form.get_user())  # 사용자의 브라우저에 쿠키와 세션을 한 번에 보내는 함수
            # 쿠키 담아 보내는 법
            response = redirect('sns:posting_list')
            response.set_cookie(key='nickname', value='idiot')
            # max_age=5 하면 5초간 이라서 5초 지나면 사라짐, 없으면 영구 저장
            # 쿠키 꺼내는 법 -> sns.views.posting_list
            return response

            # return redirect('sns:posting_list').set_cookie(asdf)
            # 위는 return None 이므로 위와 같이 구분해서 작성하는 것!

    else:
        form = AuthenticationForm()
    return render(request, 'accounts/login.html', {
        'form': form,
    })


def logout(request):  # request에 따라서 ->
    auth_logout(request)
    return redirect('sns:posting_list')  # -> HTTP response 라는 class의 객체 return 

