```html
<!-- <li><a href="/home/">Index</a></li>  절대경로/상대경로 -->
<li><a href="{% url 'home:index' %}">Index</a></li>
<li><a href="/home/hi/asdf">Hi</a></li> <!--""하면 그 페이지라서-->
<li><a href="{% url 'home:guess' %}">Guess</a></li>
```

```django
<p>{{ article.like_users.count }}명이 좋아합니다.</p>
```



```html
<div>
    {% for comment in comments %}
        <h5>{{ forloop.counter }}: {{ comment.content }}</h5>

        {% if comment.user == request.user %}
            <form action="{% url 'articles:comment_delete' article.id comment.id %}" method="POST">
                {% csrf_token %}
                <input type="submit" value="삭제">
            </form>
        {% endif %}
    {% empty %}
    	'댓글이 없습니다.'
    {% endfor %}
</div>
```



```django
INSTALLED_APPS = [
    'bootstrap4',
]

{% load bootstrap4 %}

<form method="POST">
    {% csrf_token %}
    {% comment %} {{ form.as_p }} {% endcomment %}
    {% bootstrap_form form %}
    {% buttons %} <!-- div class form 안에 들어가짐 -->
        <button type="submit" class="btn btn-primary">submit</button>
    {% endbuttons %}
</form>
```



* posting detail

```html
{% if posting.image %}
    {% comment %} 
		{{ posting.image }} 
    	이러면 그 col에 있는 -> str이 출력 
    	{{ posting.image.url }} 
	{% endcomment %}
    <img src="{{ posting.image.url }}" alt="{{ posting.image }}" class="card-img-top image-fluid">
    {% comment %} 사용자가 업로드한 사진이라 alt를 입력할 수 없어서 {% endcomment %}
{% else %}
    <img src="https://picsum.photos/200/250" alt="random image"  class="card-img-top image-fluid">
{% endif %}


<a href="{{ posting.get_absolute_url }}">
    {% if posting.image %}
    <img src="{{ posting.image.url }}" alt="{{ posting.image }}" class="card-img-top image-fluid">
    {% else %}
    <img src="https://picsum.photos/200/300" alt="random image-{{ forloop.counter }}" class="card-img-top image-fluid">
    {% comment %} random image의 alt값에 대해 for 문의 idx 값을 달아주어 구분 할 수 있게 함 {% endcomment %}
    {% endif %}
</a>
```





* upload

```html
    <form action="{% url 'sns:create_posting' %}" enctype="multipart/form-data" method="POST">
        {% csrf_token %}
```

- 

  - 파일을 업로드 할때 <form>태그에서 ENCTYPE="multipart/form-data"라는 애트리뷰트를 반드시 써야 한다. 그렇게 하지 않으면 웹 서버로 데이터를 넘길때 파일의 경로명만 전송되고 파일 내용이 전송되지 않기 때문이다. 그리고 이때 METHOD 애트리뷰트에는 'POST' 값을 지정해야 한다.

     enctype : imag가 str로 안 가도록 (str이 default)

    ** <form>태그의 속성인 method, action, enctype 등은 입력받은 데이터를 어떻게 처리할 것인지 세부적으로 설정하는 데 사용된다.

      method는 전송 방식,

      action은 전송 목적지,

      enctype은 전송되는 데이터 형식을 설정한다.

    

* insta

  ```html
  {% block body %}
      <form method="POST" enctype="multipart/form-data">
      {% comment %} 여러개 들어갈 수 있도록 enctype {% endcomment %}
          {% csrf_token %}
          {% bootstrap_form posting_form %}
          {% if image_form %}  <!-- create과 update가 form 을 공유하고 있어서 -->
              {% bootstrap_form image_form show_label=False %}
          {% endif %}
          {% buttons %}
          <button class="btn btn-primary">submit</button>
          {% endbuttons %}
      </form>
  
  {% endblock %}
  ```

  