from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from rest_framework.permissions import AllowAny  
# 인증을 요구하지 않는 페이지를 만들기 위해 -> 회원가입은 인증이 불가능 (볼 필요가 없다.)

from .serializers import UserCreationSerializer, UserSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = UserCreationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(user.password)
        user.save()
        return Response(status=200, data={'massage': '회원가입 성공'})
    return Response(status=400)



@api_view(['GET'])
def my_todos(request, username):
    user = request.user  # JWT 를 통해서, 요청을 보낸 사용자를 찾아낸다.
    serializer = UserSerializer(user)
    return Response(serializer.data)
