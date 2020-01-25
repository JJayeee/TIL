from django.shortcuts import render, redirect, get_object_or_404
from .models import Student
from django.views.decorators.http import require_GET, require_POST
from .forms import StudentModelForm


@require_GET
def List(request):
    students = Student.objects.all()
    return render(request, 'classroom/List.html', {
        'students': students,
    })


def new(request):
    if request.method == 'POST':
        form = StudentModelForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect(student)
    else:
        form = StudentModelForm()
    return render(request, 'classroom/new.html', {
        'form': form,
    })


@require_GET
def detail(request, id):
    student = get_object_or_404(Student, id=id)
    return render(request, 'classroom/detail.html', {
        'student': student,
    })


def edit(request, id):
    student = get_object_or_404(Student, id=id)
    if request.method == 'POST':
        student.name = request.POST.get('name')
        student.age = request.POST.get('age')
        student.major = request.POST.get('major')
        student.save()
        return redirect(student)
    else:
        return render(request, 'classroom/edit.html', {
            'student': student,
        })


@require_POST
def delete(request, id):
    student = get_object_or_404(Student, id=id)
    student.delete()
    return redirect('classroom:List')
