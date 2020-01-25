from django.contrib import admin
from .models import Articles


class ArticleModelAdmin(admin.ModelAdmin):
    list_display = 'id', 'title'


admin.site.register(Articles, ArticleModelAdmin)
