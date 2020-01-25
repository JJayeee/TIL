from django.shortcuts import render, HttpResponse, get_object_or_404
from .models import Artist, Music, Comment

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ArtistSerializer, MusicSerializer, ArtistDetailSerializer, CommentSerializer, MusicDetailSerializer

from IPython import embed

# import json

# 달라  써라     수정     삭제
# Read  Create  Update  Delete
# GET   POST    PATCH   DELETE



# @api_view(['GET'])
# def artist_lists(request):
#     artists = Artist.objects.all()
#     res_data = []
#     for artist in artists:
#         d = {
#             "id": artist.id, 
#             "name": artist.name
#         }
#         res_data.append(d)
    
#     return HttpResponse(res_data)

# # res_data: {'id': 1, 'name': 'Coldplay'}{'id': 2, 'name': 'Maroon5'}
# # python 언어인 dict를 공용어 data로 만들어주어야 함
# # 공용어로 바꾸다(직렬화, Serialization)
# # 공용어 == string 으로 바꿔서 내보내는 것 => import json 

# @api_view(['GET'])
# def artist_list(request):
#     artists = Artist.objects.all()
#     dataset = []
#     for artist in artists:
#         d = {
#             "id": artist.id, 
#             "name": artist.name
#         }
#         dataset.append(d)
#     res_data = json.dumps(dataset)
#     return HttpResponse(res_data)

# # 근데 데이터 많고 넘겨줄거 많고 하면 답이 없음
# # model form과 유사하게 -> serializers.py

@api_view(['GET'])
def artist_list(request):
    artists = Artist.objects.all()
    serializer = ArtistSerializer(artists, many=True)
    # embed()
    return Response(serializer.data)

# In [1]: artists
# Out[1]: <QuerySet [<Artist: Artist object (1)>, <Artist: Artist object (2)>]>
# In [1]: serializer
# Out[1]:
# ArtistSerializer(<QuerySet [<Artist: Artist object (1)>, <Artist: Artist object (2)>]>):
#     name = CharField(style={'base_template': 'textarea.html'})


@api_view(['GET'])
def artist_detail(request, artist_id):
    artist = get_object_or_404(Artist, id=artist_id)
    serializer = ArtistDetailSerializer(artist)
    return Response(serializer.data)


@api_view(['GET'])
def music_list(request):
    musics = Music.objects.all()
    serializer = MusicSerializer(musics, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def music_detail(request, music_id):
    music = get_object_or_404(Music, id=music_id)
    serializer = MusicDetailSerializer(music)
    return Response(serializer.data)


@api_view(['POST'])
def create_comment(request, music_id):
    music = get_object_or_404(Music, id=music_id)
    ser = CommentSerializer(data=request.data)
    if ser.is_valid(raise_exception=True):
        ser.save(music_id=music.id) # 저장완료. form과 유사하지만 다름, commit 아님
    return Response(ser.data)  # 저장한 데이터를 보낸다


# Postman -> POST : http://127.0.0.1:8001/api/v1/musics/1/comments/
#  => body - form-data - key: comment, value: blah
# {
#     "id": 9,
#     "content": "hihi",
#     "music_id": 1
# }
# html은 사용자를 위한 것이지 서버에서는 사실 상관 없는 것.