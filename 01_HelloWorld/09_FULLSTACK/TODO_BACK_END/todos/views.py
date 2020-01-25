from django.shortcuts import get_object_or_404

from rest_framework.response import Response  # JSON 응답 생성기
from rest_framework.decorators import api_view  # require_methods

# settings.py에 rest framework default 설정을 해 두어서 따로 import 할 필요 X
# from rest_framework.permissions import IsAdminUser  # login_required
# from rest_framework_jwt.authentication import JSONWebTokenAuthentication  # is_authenticatd

from .serializers import TodoSerializer
from .models import Todo


# @api_view(['GET'])
# def todo_list(request):
#     pass


@api_view(['POST'])
def create_todo(request):  # request.POST ==> form-data : FORM(TAG) 내부의 DATA만 잡는다. 
    serializer = TodoSerializer(data=request.data) # (None, request.POST) <- 첫 번째 인자가 instance라서
    if serializer.is_valid():
        serializer.save(user=request.user)
        # serializer.data => {'id': 1, 'user_id': 1, 'title': '밥먹기', 'completed': false)
        return Response(serializer.data)
    
    error = {
        'message': 'Invalid Todo',
    }
    return Responser(status=400, data=error)  # 유효하지 않은 경우



@api_view(['PATCH', 'DELETE'])
def update_delete_todo(request, todo_id):
    todo = get_object_or_404(Todo, id=todo_id)
    if request.method == 'PATCH':
        serializer = TodoSerializer(instance=todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=400, data=serializer.errors)
    elif request.method == 'DELETE':
        todo.delete()
        return Response(status=204)
        # 코드 확인 필요ㅠ