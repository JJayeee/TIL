from django.shortcuts import render, HttpResponse
import json


# Create your views here.
def index(request):
    return HttpResponse('Hi django :)')


def about(request):
    me = {
        'name': 'jj',
        'role': 'student',
        'email': 'jay@gmail.com',
    }
    return HttpResponse(json.dumps(me))


# HTML을 내보내고 싶다~
def portfolio(request):
    return render(request, 'portfolio.html')
# views 함수 1 단위


def help(request):
    return render(request, 'help.html')
