from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_GET, require_POST, require_http_methods
from django.contrib.auth.decorators import login_required

from .models import Posting, Comment
from .forms import PostingModelForm, CommentModelForm


@require_GET  # 했다면, get 요청인지 확인하고 아래를 진행
def posting_list(request):
    nickname = request.COOKIES.get('nickname')
    postings = Posting.objects.all()
    return render(request, 'sns/posting_list.html', {
        'postings': postings,
        'nickname': nickname,
    })


@login_required  # login 했는 지 확인 -> url 이 무조건 '/accounts/login/'으로 감
# 필요한 경우 인자를 지정해주면 되긴 하다. @login_required(login_url='/users/login/')
@require_GET
def posting_detail(request, posting_id):
    posting = get_object_or_404(Posting, id=posting_id)
    # comments = posting.comment_set.all() -> related_name 설정 하면 아래로
    comments = posting.comments.all()
    is_like = True if posting.like_users.filter(id=request.user.id).exists() else False
    return render(request, 'sns/posting_detail.html', {
        'posting': posting,
        'comments': comments,
        'is_like': is_like,
    })


@login_required
@require_POST
def create_posting(request):
    # posting = Posting()
    # posting.content = request.POST.get('content')
    # posting.icon = ''
    # posting.image = request.FILES.get('image')
    # posting.save()
    # return redirect(posting)
    form = PostingModelForm(request.POST, request.FILES)  # 검증 & 저장 준비
    if form.is_valid():  # 검증
        # posting = form.save()  # 저장 => Posting 객체를 return, return 값을 변수에 할당
        # 위는 사용자 정보 담기 전
        
        posting = form.save(commit=False)
        # 모든 request는 user가 담겨 있다, 없으면 anonymous라도 있음
        # posting.user_id = request.user.id
        posting.user = request.user  # 위에 login_required로 인해, anony는 걱정할 필요 X
        posting.save()
        return redirect(posting)
    else:
        return redirect('sns:posting_list')


@login_required
@require_POST
def delete_posting(request, posting_id):
    posting = get_object_or_404(Posting, id=posting_id)
    if request.user == posting.user:  # step2. url 뚫더라도 views로 막기
        posting.delete()
    return redirect('sns:posting_list')


@login_required
@require_POST
def create_comment(request, posting_id):
    posting = get_object_or_404(Posting, id=posting_id)
    form = CommentModelForm(request.POST)  # content만 값을 확인
    if form.is_valid():  # content만 값을 검증
        comment = form.save(commit=False)  # 아직 posting_id가 공란이기 때문에 저장하는 척 만하고 Comment 객체 리턴 
        comment.posting = posting  # comment.posting_id = posting.id 이것과 같은 말(ORM이 척척)
        # 이건 사용자가 입력할 값이 아니기 때문에 Meta에서 설정하는게 아닌 것
        comment.user = request.user
        comment.save()
    return redirect(posting)


@login_required
@require_POST
def delete_comment(request, posting_id, comment_id):
    comment = get_object_or_404(Comment, id=comment_id, posting_id=posting_id)
    if request.user == comment.user:
        comment.delete()
    return redirect(comment.posting)


@login_required
@require_POST
def toggle_like(request, posting_id):
    user = request.user
    posting = get_object_or_404(Posting, id=posting_id)
    # if user in posting.like_users.all():
    #     posting.like_users.remove(user)
    # else:
    #     posting.like_users.add(user)
    if posting.like_user.filter(id=user.id).exists():
        posting.like_users.remove(user)
    else:
        posting.like_users.add(user)
    return redirect(posting)


# @login_required
# @require_POST
# def dislike(request, posting_id):
#     user = request.user
#     posting = get_object_or_404(Posting, id=posting_id)
#     posting.like_users.remove(user)
#     return redirect(posting)
