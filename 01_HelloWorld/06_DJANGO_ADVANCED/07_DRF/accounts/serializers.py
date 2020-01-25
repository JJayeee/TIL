from rest_framework import serializers

from movies.serializers import RatingSerializer

# from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
User = get_user_model()


# 회원가입
class UserCreationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')


# 접속 유지중인지 확인할 시리얼라이저
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username')
