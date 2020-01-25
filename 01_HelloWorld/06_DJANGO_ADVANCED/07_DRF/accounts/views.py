from django.shortcuts import get_object_or_404, HttpResponse

from movies.models import Movie, Genre, Rating
from django.contrib.auth import get_user_model
User = get_user_model()
import random
import json
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework import viewsets, permissions
from .serializers import UserCreationSerializer, UserSerializer
from movies.serializers import RatingSerializer

def get_movieset():
    genres = [1, 2, 5, 7, 11, 12, 18]
    dataset = []
    checks = []
    for g in genres:
        movies = Movie.objects.filter(genre=f'{g}').order_by('naverRating')[:7]
        for movie in movies:
            if movie.id not in checks:
                d = {
                    "id": movie.id,
                    "name": movie.movieName,
                    "posterUrl": movie.posterUrl,
                }
                dataset.append(d)
                checks.append(movie.id)

    genres = [15, 2, 16, 19, 17]
    for g in genres:
        movies = Movie.objects.filter(genre=f'{g}').order_by('naverRating')[:2]
        for movie in movies:
            if movie.id not in checks:
                d = {
                    "id": movie.id,
                    "name": movie.movieName,
                    "posterUrl": movie.posterUrl,
                }
                dataset.append(d)
                checks.append(movie.id)

    dataset = dataset[:50]
    random.shuffle(dataset)
    return dataset


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = UserCreationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(user.password)
        user.save()
        return Response(status=200, data={'message': '회원가입 성공'})
    return Response(status=400, data={'invalid user input'})


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def signup_rating(request):
    if request.method == 'GET':
        dataset = get_movieset()
        res_data = json.dumps(dataset, ensure_ascii=False)
        return HttpResponse(res_data)
    elif request.method == 'POST':
        dataset = request.data
        user_id = request.user.pk
        flag = False
        for k, v in dataset.items():
            single_data = {"score": v, "movie": k, "user": user_id}
            serializer = RatingSerializer(data=single_data)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(status=400, data=serializer.errors)
        else:
            flag = True
        if flag:
            return Response(status=200, data="일단은 아마 된 것 같은데... 지선이 화이팅")
        else:
            return Response(status=400, data={'invalid data'})

# test = {164173: "5", 167651: "3", 174903: "4", 181414: "2"}