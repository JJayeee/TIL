from django.db import models

# python : code를 통해 table 생성 / CRUD (creat, read, update, delete) 가능 => 중개자(ORM)을 통해 SQL 조작, DB 생성

# table 생성(sheet, header)


class Student(models.Model):
    # 우리가 class만들 때는 이렇게 class 변수로 만들면 안 되는데 django는 얻어 걸리게 설계가 되어 있음
        # 그래서 models.의 Model 클래스를 상속 받음
    # 또한 각 속성에 어떤 자료형이 들어올 것인지 미리 생각해야 함. name 에는 str, email은 ~~식의 str
    """
    name = '이름'
    name => str
    """
    name = models.CharField(max_length=10)  # CharField(max_length=) 필수
    email = models.CharField(max_length=50)
    github_id = models.CharField(max_length=50)
    age = models.IntegerField()

# python manage.py makemigrations students
    # -> 이를 통해 migrations 에 파일 생성 (견적, error 확인 가능)
# python manage.py migrate students
    # -> ㄹㅇ 실행, db.sqlite3 얍

# class의 instance가 row가 되는 st

# python manage.py shell -> 장고 extension 확장팩 shell_plus
#  INSTALLED_APPS = ['django_extensions', 추가 해줘야 작동

# Student를 import하면 어디서든 영구저장이 가능한 것

# s = Student() -> <Student: Student object (None)> : 텅 빈 줄 하나를 만든 상태
# s.name = '조현동'
# 저장 되었나? N
# s.save() -> <Student: Student object (1)>

# $ python manage.py shell_plus --notebook


class Menu(models.Model):
    # name : 메뉴이름 string
    # price : 가격 int/float
    # category : 카테고리 string
    name = models.CharField(max_length=20)
    price = models.FloatField()
    category = models.CharField(max_length=20)
