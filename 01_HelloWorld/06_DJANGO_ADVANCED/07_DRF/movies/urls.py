from django.urls import path, include
from rest_framework.routers import DefaultRouter
from movies import views

from drf_yasg import openapi
from drf_yasg.views import get_schema_view

schema_view = get_schema_view(
    openapi.Info(
        #
        title="Movie API",
        default_version="v1",
        #
        description='영화 정보를 제공하는 API 입니다.',
        contact=openapi.Contact(email='jay.hyundong@gmail.com'),
        license=openapi.License(name='SSAFY License'),
    )
)


# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'movies/admin', views.AdminMovieViewSet)
# router.register(r'movies', views.MovieViewSet)
# router.register(r'movies/ratings', views.RatingViewSet)

urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger')),

    # ADMIN MOVIE PAGE
    path('', include(router.urls)),

    path('', include(router.urls)),
    path('outside/', views.outside),
    path('inside/', views.inside),

    # # 영화 R
    # path('<int:movie_id>/', views.movie_detail),
    #
    # # 댓글 C/U/D
    # path('<int:movie_id>/ratings/<int:rating_id>/', views.update_delete_rating),
    # path('<int:movie_id>/ratings/', views.create_rating),
]





"""
from movies.views import MovieViewSet, api_root
from rest_framework import renderers

movie_list = MovieViewSet.as_view({
    'get': 'list',
    'post': 'create',
})

movie_detail = MovieViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
"""

