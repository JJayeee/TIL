from django.shortcuts import render, HttpResponse
import random


# context 넘기는 방법 세 가지
# django 이기 때문에 html 안에서 프로그램이 돌아감


def cube(request, num):
    # 기본 자료형은 return 안 됨
    r = num ** 3
    # render의 세 번째, context는 반드시 dictionary!
    context = {'result': r}
    return render(request, 'cube.html', context)


# if문 출력하기
def check_int(request, num):
    is_even = num % 2 == 0
    return render(request, 'check_int.html', {
        'is_even': is_even,
        'num': num,
    })


# for문 출력하기
def pick_lotto(request):
    return render(request, 'pick_lotto.html', {
        'lucky_numbers': random.sample(range(1, 46), 6)
    })
