from rest_framework import serializers
from .models import Artist, Music, Comment


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ('name', 'id', )


class MusicSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Music
        fields = ('id', 'title', 'artist_id', )


# 한 명의 아티스트 요청을 하면 데이터 보낼 때, 뮤직도 같이 보낼 것
# artist serializer 에서 수정이 일어나도 아래 코드를 수정할 필요가 없음. 상속 활용 하는 것
class ArtistDetailSerializer(ArtistSerializer):
    music_set = MusicSerializer(many=True)
    class Meta(ArtistSerializer.Meta):
        fields = ArtistSerializer.Meta.fields + ('music_set', )


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'content', 'music_id', )


# source -> related name과 동일한 역할
class MusicDetailSerializer(MusicSerializer):
    comments = CommentSerializer(source='comment_set', many=True)
    class Meta(MusicSerializer.Meta):
        fields = MusicSerializer.Meta.fields + ('comments', )