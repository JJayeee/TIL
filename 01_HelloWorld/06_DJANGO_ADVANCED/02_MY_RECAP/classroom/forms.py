from django import forms
from .models import Student


class StudentModelForm(forms.ModelForm):
    name = forms.CharField(min_length=1)

    class Meta:
        model = Student
        fields = '__all__'
