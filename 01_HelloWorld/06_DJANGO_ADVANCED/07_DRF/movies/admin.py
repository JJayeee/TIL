from django.contrib import admin
from .models import Genre, Movie, Rating
# Register your models here.
from django.contrib.auth import get_user_model
User = get_user_model()

class UserModelAdmin(admin.ModelAdmin):
    list_display = 'id', 'username'

admin.site.register(User, UserModelAdmin)

class GenreModelAdmin(admin.ModelAdmin):
    list_display = 'id', 'name'

class RatingModelAdmin(admin.ModelAdmin):
    list_display = 'id', 'comment'

class MovieModelAdmin(admin.ModelAdmin):
    list_display = 'id', 'movieName'

admin.site.register(Genre, GenreModelAdmin)
admin.site.register(Movie, MovieModelAdmin)
admin.site.register(Rating, RatingModelAdmin)