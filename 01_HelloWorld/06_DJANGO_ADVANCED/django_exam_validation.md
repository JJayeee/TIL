* models.py

```python
# Built-in Validators
from django.core.validators import EmailValidator, MinValueValidator

# Custom Validators
from .validation import validate_even, validate_too_old, validate_too_young
# from django.core.exceptions import ValidationError

class Person(models.Model):
    Last_name = models.CharField(max_length=50)
    Email = models.CharField(max_length=100, validators=[])
    age = models.IntegerField(validators=[validate_even, validate_too_old, validate_too_young])
```



* forms.py

```python
from django import forms
from .models import Person
from .validation import validate_even, validate_too_old

# 모델에서 안 하고 forms에서 검증 가능
class PersonForm(forms.ModelForm):
    age = forms.IntegerField(validators=[validate_even, validate_too_old])

    class Meta:
        model = Person
        fields = '__all__'
```





* validation.py

```python
from django.core.exceptions import ValidationError


def validate_even(number):
    if number % 2:
        raise ValidationError(f'{number} is not even', params={'value': number})


def validate_too_old(number):
    if number > 200:
        raise ValidationError(f'{number} 까지 살기 어려워요', params={'value': number})


def validate_too_young(age):
    if age < 20:
        raise ValidationError(f'미성년자는 노노')
```

