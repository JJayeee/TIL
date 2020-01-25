from django.contrib.auth.forms import UserCreationForm, UserChangeForm, AuthenticationForm
# from .models import User
from django.contrib.auth import get_user_model
User = get_user_model()  # 헬퍼함수, 헬퍼메서드



class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = User
        fields = ('username', 'email', )


class CustomAuthenticationForm(AuthenticationForm):

    class Meta:
        model = User
