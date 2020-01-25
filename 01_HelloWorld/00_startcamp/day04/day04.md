# Startcamp 04

## 1. html 연결하기

### 1) py와 html 연결하기

#### flask template, {{ }}, {% %}

* app.py

```python
from flask import Flask, render_template
import datetime

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/dday')
def dday():
    today = datetime.datetime.now()
    end_date = datetime.datetime(2019, 11, 29)
    left = end_date - today
    return render_template('dday.html', left_days=left.days)


@app.route('/boxoffice')
def boxoffice():
    top_5 = [
        '알라딘',
        '스파이더맨 파 프롬 홈',
        '토이스토리4',
        '라이온킹',
        '존윅3',
    ]
    return render_template('boxoffice.html', movies=top_5)


if __name__ == '__main__':
    app.run(debug=True)

```













* dday.html

```html
<!DOCTYPE html>					## !
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>D-day</title>
</head>
<body>
    <h1>SSAFY 1학기 종료까지</h1>
    <h2>{{ left_days }}일 남았습니다. 화이팅 화이팅</h2>
</body>
</html>
```

* boxoffice.html

```html
<body>							## nav>ul>(li>a)*3
    <h1>Box office</h1>
    <h3>
        <ol>
            {% for movie in movies %}
                <li>{{ movie }}</li>
            {% endfor %}
        </ol>
    </h3>
</body>
```

* index.html

```html
<body>
    <nav>
        <ul>
            <li><a href="/dday">D-day</a></li>
            <li><a href="/boxoffice">Box Office</a></li>
            <li><a href="#">??</a></li>
        </ul>
    </nav>
</body>
```























### 2) html간 연결하기

* app.py

```python
from flask import Flask, render_template, request

@app.route('/send')
def send():
    return render_template('send.html')


@app.route('/receive', methods=['POST'])
def receive():
    data = request.form.get('msg')   # request.args.get('msg')
    return render_template('receive.html', data=data)
```



* send.html

```html
<body>
    <h1>Send message here</h1>
    <form action="/receive" method="POST">
        <input type="text" placeholder="message here" name="msg">
        <input type="submit" value="보내기">
    </form>
</body>
```



- receive.html

```html
<body>
    <h1>{{ data }}</h1>
</body>
```

 



#### (1) type

input : type을 정하지 않으면 기본이 text

  type = "email" / "submit" / "color" / "date" 

value : 미리 작성 된 값 -> <input type="submit"> -> 기본 : 제출



#### (2) form 과 key/value

form action> <- action : form의 값을 보내기

"/receive"

플라스크에서 request -> 주소로부터 들어온 정보를 갖고 있는 상태. str 아님.

print(request)

<request 'http://127.0.0.1:5000/send' [GET]>

print(request.headers)

Host: , Connection, User-Agent..... 



print(request.args)   arg : 넘어온 데이터만 보여줘 

ImmutableMultiDict([])

-> 이름 없이 value만 와서 -> 그래서 name(key) 을 정해주는 것

​        <input type="text" placeholder="message here" name="msg">

ImmutableMultiDict([('msg', 'hihi')])



value 값 : art 참고



#### (3) method

'http method' 내놔 or 받아라

method 기본 : get - 주소창 url에 정보값이 다 표시되어 나옴.

method post : 보내다 (중요한 경우)

method="POST" & methods=['POST']

request.args.get / request.form.get

args : 주소 뒤에 붙은 것 / form : 박스에서 





### 3) example

#### (1) stock : dollar to won

```python
import json
import requests

from flask import Flask, render_template, request
from iexfinance.stocks import Stock

@app.route('/stock')
def stock():
    return render_template('stock.html')


@app.route('/won')
def won():
    url = 'https://free.currconv.com/api/v7/convert'
    response = requests.get(url).text
    data = json.loads(response)
    conv = int(data['USD_KRW'])
    token = 'pk
    code = request.args.get('code')
    stock = Stock(code, token=token).get_quote()
    c_name = stock['companyName']
    l_price = int(stock['iexRealtimePrice'])
    kwr = conv * l_price
    return render_template('won.html', c_name=c_name, l_price=l_price, kwr=kwr)

```



#### (2) art

```python
from art import *

@app.route('/art')
def art():
    return render_template('art.html')


@app.route('/result')
def result():
    input_text = request.args.get('input_text')
    font = request.args.get('font')
    result = text2art(input_text, font=font)
    return render_template('result.html', result=result)

```

art.html

```html
    <form action="/result">
        <input type="text" name="input_text">
        <select name="font">
            <option value="random">랜덤</option>
            <option value="block">블록</option>
            <option value="white_bubble">동그라미</option>
        </select>
        <p></p>
        <input type="submit" value="제출">
    </form>
```



