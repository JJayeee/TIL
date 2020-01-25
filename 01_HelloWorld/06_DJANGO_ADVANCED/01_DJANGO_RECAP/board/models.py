from django.db import models
from django.urls import reverse


# $ python manage.py makemigrations board
# $ python manage.py sqlmigrate board 0001 (걍 출력해보기)
# $ python manage.py migrate board
class Articles(models.Model):
    # id = models.IntegerField(primary_key=True, auto_increment)
    # id 지정 안 해도 알아서 ORM이 만들어 준다.
    # migrations -> initial.py 보면 있는것을 확인 가능
    title = models.CharField(max_length=100, null=False)  # not null
    content = models.TextField()  # null=False가 사실 기본값임, 생성자함수가 여러가지로 이미 쌓여 있음
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def get_absolute_url(self):
        return reverse("board:article_detail", kwargs={"article_id": self.id})
    # redirect / {{% url %}}
    # detail page의 경우에 활용하는 것 (특정)

# model을 수정 할 경우
# 데이터 베이스에 col 하고 싶다면 makemigrations 해주어야 함, => 0002로 만들어진다
# 그 상태에서 migrate 하면 db에 col이 추가 됨

# method는 안 해도 됨 - db에 반영하는 개념이 아니기 때문에 migrate해도 no change detected


"""
< CREATE - SAVE >
In [1]: Articles
Out[1]: board.models.Articles

In [2]: article = Articles()

In [3]: article
Out[3]: <Articles: Articles object (None)>

In [4]: article.title = '안녕'
In [5]: article.content = '안녕하세요'
In [6]: article.save()

-> INSERT INTO board_article(title, content) VALUES('안녕', '안녕하세요')
-> 이게 실행 된 것과 같음

< READ / SELECT >
-> 마찬가지로 SELECT * FROM blah blah
In [7]: Articles.objects.all()
Out[7]: <QuerySet [<Articles: Articles object (1)>]>

In [8]: Articles.objects
Out[8]: <django.db.models.manager.Manager at 0x289f0a273c8>

In [9]: Articles.objects.get(id=1)
Out[9]: <Articles: Articles object (1)>

////
In [10]: article = Articles.objects.get(id=2)
SELECT "board_articles"."id",
       "board_articles"."title",
       "board_articles"."content"
  FROM "board_articles"
 WHERE "board_articles"."id" = 2
In [12]: article
Out[12]: <Articles: Articles object (2)>

In [13]: article.title
Out[13]: '하이'

In [14]: article.content
Out[14]: '하이하이'
////

< DELETE >
-> DELETE FROM board_articles WHERE id=1
In [4]: article = Articles.objects.get(id=1)
In [5]: article.delete()
Out[5]: (1, {'board.Articles': 1})



< UPDATE >
In [10]: article = Articles.objects.get(id=2)
In [13]: article.title
Out[13]: '하이'

In [14]: article.content
Out[14]: '하이하이'

In [15]: article.title = 'bye'

In [16]: article.content = 'lunch time'
In [17]: article.save()
"""


class Comment(models.Model):
    content = models.CharField(max_length=200)
    # CharField는 max_length가 필수, 만약 3이라면 5가 들어와도 에러가 아니라 잘라버림
    # 저장을 안 하도록 하는 max_length는 model class
    article = models.ForeignKey(Articles, on_delete=models.CASCADE)
    # ForeignKey 라는 field로 인해, article_id 화 / 외부에서 키를 가져오는 것
    #   article 이라 만들어도 -> 알아서 article_id 라고 만들어진다
    # 인자 1: Articles 을 참조하겠다
    # 인자 2: 글 삭제할 경우 -> 소속 된 관련 date를 모두 삭제하겠다. (살릴 수는 있음)
    # Articles 을 참조하기 때문에 def 순서 유의미함

"""
In [19]: Articles.objects.get(id=c3.article_id)
Out[19]: <Articles: Articles object (1)>

In [20]: c3.article
Out[20]: <Articles: Articles object (1)>


a = c3.article
In [25]: a.comment_set
Out[25]: <django.db.models.fields.related_descriptors.create_reverse_many_to_one_manager.<locals>.RelatedManager at 0x1aeb922dac8>
TypeError: 'RelatedManager' object is not iterable

Comment.objects.filter(article_id=a.id)
In [27]: a.comment_set.all()
Out[27]: <QuerySet [<Comment: Comment object (1)>, <Comment: Comment object (2)>, <Comment: Comment object (3)>]>
"""
