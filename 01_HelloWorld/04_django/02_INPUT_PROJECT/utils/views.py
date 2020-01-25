from django.shortcuts import render, HttpResponse, redirect
from art import *
import requests
from decouple import config

naver_client_id = config('NAVER_CLIENT_ID')
naver_client_secret = config('NABER_CLIENT_SECRET')


def index(request):
    return render(request, 'utils/index.html')


def art(request):
    fonts2 = ['3-d', '5lineoblique', 'larry3d', 'cards']
    fonts = ['alpha', 'acrobatic', 'avatar', 'cards', '3d_diagnoal']
    return render(request, 'utils/art.html', {
        'fonts': fonts,
        'fonts2': fonts2,
    })


def output(request):
    # request.GET : like dict, QuertyDict
    # POST 는 POST.get 하면 동일
    print(request.GET)
    print(request.GET.get('user-input'))

    # 입력창이 공백인 경우
    # 1) art.html 상에서 input tag에 required 추가
    # <input id="word" name="user-input" type="text" required>

    # 2) if
    user_input = request.GET.get('user-input')
    user_font = request.GET.get('user-font')

    if not user_input:
        user_input = 'NO EMPTY'
    result = text2art(user_input, font=user_font)

    # 3) redirect
    user_input2 = request.GET.get('user-input2')
    user_font2 = request.GET.get('user-font2')

    if user_input2:
        result2 = text2art(user_input2, font=user_font2)
        return render(request, 'utils/output.html', {
            'result': result,
            'result2': result2,
        })
    else:
        return redirect('/utils/art')


def catch(request):
    countries = {
        '영어': 'en', '중국어(간체)': 'zh-CN', '중국어(번체)': 'zh-TW',
        '독일어': 'de', '인도네시아어': 'id', '태국어': 'th',
        '러시아어': 'ru', '스페인어': 'es', '베트남어': 'vi',
        }
    return render(request, 'utils/catch.html', {
        'countries': countries,
    })


def throw(request):
    words = request.GET.get('user-words')
    country = request.GET.get('user-country')
    a = country.split('/')

    headers = {
        'X-Naver-Client-Id': naver_client_id,
        'X-Naver-Client-Secret': naver_client_secret,
        }

    data = {
        'source': 'ko',
        'target': a[0],
        'text': words,
        }

    res = requests.post(
        'https://openapi.naver.com/v1/papago/n2mt',
        data=data,
        headers=headers,
        )

    result = res.json()['message']['result']['translatedText']
    return render(request, 'utils/throw.html', {
        'country': a[1],
        'words': words,
        'result': result,
    })
