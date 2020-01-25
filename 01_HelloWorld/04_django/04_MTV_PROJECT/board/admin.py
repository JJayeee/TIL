from django.contrib import admin
from .models import Articles

# $ python manage.py createsuperuser
# /admin
admin.site.register(Articles)
