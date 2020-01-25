from django.contrib import admin
from django.urls import path, include

from django.conf.urls.static import static
from django.conf import settings  # MASTER_APP/settings.py

urlpatterns = [
    path('admin/', admin.site.urls),
    path('newsfeed/', include('sns.urls')),
    path('accounts/', include('accounts.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# urlpatterns(list) 는 path 만 있을 수 있음
# static()은 []를 반환한다. (일부러) 그래서 + 하라고 설명 뜨기도 함
