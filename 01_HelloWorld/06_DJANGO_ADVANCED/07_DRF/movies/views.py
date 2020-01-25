from django.shortcuts import render, HttpResponse, get_object_or_404
import json
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Movie, Genre, Rating
from .serializers import MovieSerializer, GenreSerializer, RatingSerializer

from .functions import get_theater, make_users_top_movies, make_genre_movies

class AdminMovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAdminUser]


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def outside(request):
    user_id = request.user.pk
    theater = get_theater("0056")
    dataset = {"user_id": user_id, "theater": theater}
    dataset = json.dumps(dataset, ensure_ascii=False)
    return HttpResponse(dataset)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def inside(request):
    user_id = request.user.pk

    movies = {}
    movies[1] = None
    movies[2] = None
    movies[3] = make_users_top_movies(user_id)
    movies[4] = make_genre_movies(user_id)
    movies[5] = None

    res_data = json.dumps(movies, ensure_ascii=False)
    return HttpResponse(res_data)



