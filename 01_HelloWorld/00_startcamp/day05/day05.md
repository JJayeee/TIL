# Startcamp 05

## 1. Check_lotto.py 풀이

### 1) 비교

```python
match_count = 0
for i in range(6):
    for l in range(6):
        if my[i] == real[l]:
            match_count = match_count + 1
```

```python
match_count = 0
for i in my:
    for j in real:
        if i == j:
            match_count += 1
```

### 2) ver.01

```python
my = [1, 2, 3, 4, 5, 6]
real = [1, 2, 3, 4, 5, 7]
bonus = 6

match_count = 0
is_bonus = False		## 우선 is_bonus를 담아 놓아야

for i in my:
    if i == bonus:		## bonus와 매치해야 하는 것은 i
    is_bonus = True

    for j in real:
        if i == j:
            match_count += 1
            
if match_count == 6:
    result = '1등'
elif match_count == 5:
    if is_bonus:			### if is_bonus == True: 
        result = '2등'
    else:
        result = '3등'
elif match_count == 4:
    result = '4등'
elif match_count == 3:
    result = '5등'
else:
    result = '꽝ㅠ'
```

### 3) ver.02 Bonus T/F 

```python
is_bonus = False
if bonus in my:
    is_bonus = True

for i in my:
    for j in real:
        if i == j:
            match_count += 1
```

bonus number가 늘 필요한 것이 아니므로

```python
if match_count == 6:
    result = '1등'
elif match_count == 5:		# 위의 is_bonus를 다 지우고 5개일 경우에만 bnus 확인
    if bonus in my:
        result = '2등'
    else:
        result = '3등'
else:
    result = '꽝ㅠ'
```



### 4) ver.03 집합

[1, 2, 3] : list

{1, 2, 3} : set

(1, 2, 3) : tuple

{ 'a': 'A' } : dict 

```python
set(my) set(real) 	# 리스트에서 순서가 없는 집합이 됨
```

```python
match = set(my).intersection(set(real))
match_count = len(match)	# for문이 아니므로 match_count=0도 필요x

if match_count == 6:
    result = '1등'
elif ...
```







## Chatbot Quest



```python
from flask import Flask, render_template, request
import requests

app = Flask(__name__)

api_url = 'https://api.telegram.org'
token = ''
chat_id = '715032298'


@app.route('/write')
def write():
    return render_template('write.html')


@app.route('/send')
def send():
    message = request.args.get('message')
    URL = f'{api_url}/bot{token}/sendMessage?chat_id={chat_id}&text={message}'
    requests.get(URL)
    return render_template('send.html')


if __name__ == '__main__':
    app.run(debug=True)
```













```python
{
    'update_id': 465837591, 
    'message': {
        'message_id': 20,
        'from': {
                'id': 715032298,
                'is_bot': False,
                'first_name': 'j',
                'last_name': 'J',
                'language_code': 'ko'
            },
        'chat': {
                'id': 715032298,
                'first_name': 'j',
                'last_name': 'J',
                'type': 'private'
            },
        'date': 1562911222,
        'text': '안녕'
        }
}
```







```python
    if message == 'admin':
        res = '안녕하세요 관리자님 :)'
    else:
        res = '안녕하세요 손님 :)'
    
    URL = f'{api_url}/bot{token}/sendMessage?chat_id={user}&text={res}'
```





https://www.pythonanywhere.com/user/JJayeee/



.env 주의

프로젝트 시작시 ignore 주의