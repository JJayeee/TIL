from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from drf_yasg import openapi
from drf_yasg.views import get_schema_view

schema_view = get_schema_view(
    openapi.Info(
        #
        title="User API",
        default_version="v1",
        #
        description='유저 정보를 제공하는 API 입니다.',
        contact=openapi.Contact(email='jay.hyundong@gmail.com'),
        license=openapi.License(name='SSAFY License'),
    )
)
router = DefaultRouter()
router.register(r'', views.UserViewSet)
router.register(r'admin', views.AdminUserViewSet)
app_name = 'accounts'

urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger'), name='api_swagger'),
    path('signup/', views.signup, name="signup"),
    path('signup/rating/', views.signup_rating, name="signup_rating"),
    path('', include(router.urls)),
]