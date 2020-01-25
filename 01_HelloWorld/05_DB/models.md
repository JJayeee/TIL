```python
class User(models.Model):
    first_name = models.CharField(max_length=10)
    last_name = models.CharField(max_length=10)
    age = models.IntegerField()
    country = models.CharField(max_length=10)
    phone = models.CharField(max_length=15)
    balance = models.IntegerField()
```

1. 모든 댓글 출력

```

Comment.objects.all()
select * from users_comment

```

2. 1번 사람(u1) 작성한 모든 게시글

```
Article.objects.filter(user_id=1)
->  <QuerySet [<Article: Article object (1)>]>
select title from users_article where user_id=1;
-> 1글
```



2. 2번 댓글(c2)을 작성한 사람

```bash
In [6]: Comment.objects.filter(id=2).values('user_id')
Out[6]: <QuerySet [{'user_id': 2}]>

select user_id from users_comment where id=2;
2
```



2. 3번 글(a3)을 작성한 사람의 이름

```
sqlite> select user_id from users_article where id=2;
2
sqlite> select username from users_user where id=2;
Lee
```



2. 2번 글(a2)을 작성한 사람이 작성한 댓글들

```
sqlite> select content from users_comment where user_id=2;
1글1댓
1글2댓
3글1댓
```



2. 1번 글(a1)에 작성된 댓글 중에 첫번째를 작성한 사람의 이름

```
In [16]: Comment.objects.filter(article_id=1).values('user_id')[0]
Out[16]: {'user_id': 2}
select user_id from users_comment where article_id=1 limit 1;
2
```



2. 1번 사람(u1)이 작성한 첫번째 게시글의 1, 2번째 댓글

```
select content from users_comment where user_id=1 limit 2;
2글1댓
4글1댓
```

2. 1번 사람(u1)이 작성한 게시글을 제목 내림차순으로 정렬

```
In [9]: Article.objects.filter(user_id=2).values('title').order_by('-title')
Out[9]: <QuerySet [{'title': '4글'}, {'title': '3글'}, {'title': '2글'}]>

sqlite> select title from users_article where user_id=2 order by title DESC;
4글
3글
2글
```

