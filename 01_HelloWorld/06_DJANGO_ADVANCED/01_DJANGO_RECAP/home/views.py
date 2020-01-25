from django.shortcuts import render, HttpResponse


def index(request):
    return render(request, 'home/index.html')


# request가 없으면 : hi() takes 0 positional arguments but 1 was given
# str:name에 대해 views를 조정 안 하면: hi() got an unexpected keyword argument 'name'
def hi(request, name):  # request라는 인자 명 자체는 사실 상관 없음, just convention
    # return HttpResponse(f'hi {name}')
    return render(request, 'home/hi.html', {'name': name}) 


def guess(request):
    return render(request, 'home/guess.html')


# <QueryDict: {'q1': ['1'], 'q2': ['1'], 'q3': ['1'], 'q4': ['1']}>
# request.GET.get('q1') <- 오류 나지 않도록 (q1이 없는 경우 방지) / 없으면 none
# request.GET['q1']은 오류 날 수가 있어서.
def answer(request):

    cnt = 0
    cc = request.POST.get('q1')  # GET-POST
    if cc == '1' or cc == '1월':
        cnt += 1
    bb = request.POST.get('q2')
    if bb == '노트8' or bb == '노트 8' or bb == '갤럭시 노트 8':
        cnt += 1
    aa = request.POST.get('q3')
    if aa == 'ASUS' or aa == '아수스':
        cnt += 1
    dd = request.POST.get('q4')
    return render(request, 'home/answer.html', {
        'cnt': cnt,
        'name': dd,
    })
