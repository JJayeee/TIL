# Startcamp 03

## 1. 사용자의 입력받기 (1) : Input



### input.py

(1) input( )

```python
name = input('what is your name?: ')		# what\'s your name?
print('hi, ' + name)

```

```bash
$ python quiz.py
						# 1:bash -> 2:python 

$ python quiz.py
what is your name? : jay
hi, jay
```



(2) 리스트의 마지막 값 불러오기

```python
import random

length = random.choice(range(1, 100))
unknown = list(range(length))

print(unknown[0], unknown[-1])	# unknow[-1] = uknown[length -1]

```



(3) 저장한 값의 class가 무엇인가 : type( )

```python
words = input('입력 고고: ')
print(type(words))
print(words[0], words[-1])  #'문자열' = 리스트처럼 index 접근이 가능하다. 

```

```bash
$ python quiz.py
입력 고고: 안녕하세요
<class 'str'>
안 요
```













(4) 자연수 n 을 입력받고, 1부터 n 까지 출력하라

``` python
n = int(input('자연수를 입력하세요: '))

numbers = []
for i in range(n):
    numbers.append(i + 1)

print(numbers)

```

```python
n = int(input('자연수를 입력하세요: '))

for i in range(n):
    print(i + 1)			# 기본적으로 end='\n'
    
for i in range(n):
    print(i + 1, end='')
    
```

```bash
$ python quiz.py
[1, 2, 3]

1
2
3

123
1/2/3			# print(i + 1, end='/')
```



(5) 짝수/홀수 구분하기

```python
n = int(input('자연수를 입력하세요: '))

if n % 2 == 0:
    print('짝!')
else:
    print('홀!')
    
```



(6) 3의 배수에서 fizz / 5의 배수에서 buzz / 15의 배수에서 fizzbuzz

* 출력

```python
number = int(input('숫자를 입력하세요: '))

for i in range(1, number+1):
    if i % 15 == 0:
        print('fizzbuzz', end=' ')
    elif i % 5 == 0:
        print('buzz', end=' ')
    elif i % 3 == 0:
        print('fizz', end=' ')
    else:
        print(i, end=' ')

```

```bash
$ python answer.py
숫자를 입력하세요: 15
1 2 fizz 4 buzz fizz 7 8 fizz buzz 11 fizz 13 14 fizzbuzz
```

* list 

```python
number = int(input('숫자를 입력하세요: '))

numbers = []
for i in range(1, number+1):
    if i % 15 == 0:
        numbers.append('fizzbuzz')
    elif i % 5 == 0:
        numbers.append('buzz')
    elif i % 3 == 0:
        numbers.append('fizz')
    else:
        numbers.append(i)

print(numbers)

```

```bash
$ python quiztest.py
숫자를 입력하세요: 15
[1, 2, 'fizz', 4, 'buzz', 'fizz', 7, 8, 'fizz', 'buzz', 11, 'fizz', 13, 14, 'fizzbuzz']
```





## 2. Scraping v.s API 

### 1) pick_lotto.py

```python
import random

numbers = range(1, 46)
lucky_numbers = random.sample(numbers, 6)
```



### 2) get_lotto.py

(1) no

```python
import requests

url = 'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=866'

response = requests.get(url).text

print(response)
print(response["bnusNo"])

```

```bash
    print(response["bnusNo"])
TypeError: string indices must be integers
```

-> type 확인

```python
print(type(response))
```

```bash
<class 'str'>
```



(2)  import json

```python
import requests
import json

url = 'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=866'

response = requests.get(url).text

data = json.loads(response)
print(data)
print(type(data))
```

```bash
$ python get_lotto.py
{'totSellamnt': 81961886000, 'firstWinamnt': 2240409000, 'drwtNo6': 39, 'drwtNo4': 34, 'firstPrzwnerCo': 9, 'drwtNo5': 37, 'bnusNo': 12, 'firstAccumamnt': 20163681000, 'drwNo': 866, 'drwtNo2': 15, 'drwtNo3': 29, 'drwtNo1': 9}
<class 'dict'>
```



(3) real_numbers = []

* f { i } 

```python
real_numbers = []
for i in range(6):								#  but, range를 모른다면?
    real_numbers.append(data[f'drwtNo{i+1}'])  # ['drawNo'+str(i+1)] 
```







* drwtNo 가 들어간 것을 검색

```python
real_numbers = []
for key, value in data.items():
    if 'drwtNo' in key:
        real_numbers.append(value)
```



(4) 최종. get_lotto.py

```python
import requests
import json

url = 'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=866'

response = requests.get(url).text

data = json.loads(response)
print(data)

real_numbers = []
for key, value in data.items():
    if 'drwtNo' in key:
        real_numbers.append(value)

real_numbers.append(data['bnusNo'])

print(real_numbers)

```

```bash
$ python get_lotto.py
[39, 34, 37, 15, 29, 9, 12]
```





### 3) v.s module(package)

- API : for programmer 
- Service 제공자가 제공하는 module, package. pip install iexfinance

```python
from iexfinance.stocks import Stock

company = Stock('AAPL', token='pk')

print(company.get_price())
print(company.get_quote())

```

```bash
$ python stock.py
201.24
{'symbol': 'AAPL', 'companyName': 'Apple, Inc.', 'calculationPrice': 'close'....}
```









## 3. 사용자의 입력받기 (2) : var routing

### HTML 기본



#### 1) url 주소창에 받기

* F12 - nothing

```python
from flask import Flask
import random

app = Flask(__name__)


@app.route('/')
def index():
    return 'Hello World!'


@app.route('/pick_lunch/<int:count>')
def pick_lunch(count):
    menus = [
        '짜장면',
        '탕수육',
        '짬뽕',
        '볶음밥',
        '새우볶음밥',
        '사천탕면'
    ]
    picks = random.sample(menus, count)
    return str(picks)


@app.route('/cube/<int:count>')
def cube(count):
    number = count ** 3			-> return str(count ** 3)
    return str(number)


if __name__ == '__main__':
    app.run(debug=True)
```

http://127.0.0.1:5000/pick_lunch/3

['사천탕면', '탕수육', '볶음밥']

http://127.0.0.1:5000/cube/143

2924207



#### 2) html 기본
  * practice.html

```python
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>Today I learned</h1>
        <h2>Learn Flask</h2>
        <ol>
            <li>pip install flask</li>
            <li>touch app.py</li>
            <li>python app.py</li>
        </ol>

        <h2>Learn HTML</h2>
        <ul>
            <li>doctype html</li>
            <li>head, body</li>
            <li>h1, h2, ol, ul, li</li>
        </ul>
    </body>
</html>
```

Ctrl+/ : 주석 

head : 뇌(정보) / body : 외관(내용)

html m : markup - markdown과 유사!

ol ordered list  /  ul unordered list





#### 3) 연결하기

````python
from flask import Flask, render_template
import random

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')
````



















## cf.

$ : 프롬프트

bash -> python : ctrl+c = 취소

ctrl+d = exit. 터미널 종료



string = '나는 {} 을 먹는다' .format(meal)

string = f'나는 {meal}을 먹는다'



```python
import random
random.choice([1, 2, 3, 4, 5])

from random import choice
choice([1, 2, 3, 4, 5])
```



```python
my = [1, 2, 3, 4, 5, 6]
real = [1, 2, 3, 4, 5, 7]
bonus = 6

check = []
for i in my:
    if my[i-1] == real[i-1]:
        check.append('o')

print(check)
print(check.count('o'))
```

