from rest_framework import serializers
from .models import Movie, Rating, Genre


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'name')


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'


class RatingSerializer(serializers.ModelSerializer):
    score = serializers.IntegerField(max_value=5, min_value=0)

    class Meta:
        model = Rating
        fields = '__all__'


class RatingDetailSerializer(RatingSerializer):
    movie_set = MovieSerializer(many=True)

    class Meta:
        model = Rating
        fields = '__all__'
