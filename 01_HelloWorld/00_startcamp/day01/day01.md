# Startcamp 01

## 1. 컴퓨터 프로그래밍 언어

* 컴퓨터 : 컴퓨터란, 계산기다.

* 프로그래밍  : 명령어의 집합. 쉽게 일 시키는 것

* 언어 : 말, 약속



​	### 주의 ###

​		대/소문자

​		띄어쓰기 및 들여쓰기

​		스펠링

## 2. python 기초 문법 3형식

저장 / 조건 / 반복



### 1) 저장

* 변수 (variable)

```python
greeting = 'good afternoon'

print(greeting)
good afternoon		# 변수를 출력
print("greeting")
greeting			# ""를 출력
```



* 리스트 (list) 

```python
dusts = [58, 40, 70]
print(dusts[1])
40
```



* 딕셔너리 (dictionary)

```python
dusts = {'영등포구': 58, '강남구': 40}		# { key: value }
print(dusts['영등포구'])
58
```



### 2) 조건

```python
if dust > 50:			# if : <- : 전 부분에 대해 true/false 값을 저장
    print('50초과')
    elif 				# 탭 단위가 한 블럭
    else:
        print("50이하")
    
```



### 3) 반복

#### (1) while

* while 에 해당하는 조건이 True일 동안 계속 반복 -> 종료 조건을 반드시 작성해 주어야 함

```python
n = 0
while n < 3:
    print(n)
    n = n + 1
```

```bash
$ python test.py
0
1
2
```



* while 뒤의 값이 참이면 계속 출력하므로 무한 루프

```python
while True:
    print('계속해주세요.')
```



* 부분만 꺼내는 것이 가능

```python
dusts = [59, 24, 102, 45, 64]
n = 0
while n < 3:
    print(dust[n])
    n = n + 1
```

```bash
59
24
102
```



#### (2) for

* 정해진 범위 안에서 순서대로 반복 -> 종료 조건이 필요 없음

```python
dusts = [59, 24, 102]
for i in dusts:
    print(i)
```

```
59
24
102
```



* while과 비교

```python
greeting = '안녕'

n = 0
while n < 5:
    print(greeting)
    n = n + 1
print(n)

for n in [1,2,3,4,5]:		# for n in range(5)
    print(greeting)
print(n)
```

```bash
$ python test.py
안녕
...
안녕
5
안녕
...
안녕
5
```







## 3. python 함수

### 1) 내장/외장 함수

파이썬 함수에는 내장 함수와 외장 함수가 있다. 

* 내장 함수

  * `print()` : 출력하는 함수

  - `range()` : 리스트를 생성하는 함수

  - `list()` :  범위(range)를 생성하는 함수

* 외장 함수

  * `random` : 랜덤 관련 함수들의 묶음
  * `random.choice(p)` : 리스트에서 1개 무작위 선택
  * `random.sample(p, n개)` : 모집단에서 n 개의 요소를 무작위 비복원 선택



```python
import random

menus = ['감자', '고구마', '장어']

choice = random.choice(menus)
print(choice)
```



### 2) 로또 번호 추첨 하기

* list(range( ))

```python
import random		# 서랍에서 꺼낸다.

numbers = list(range(1,46)) # 공 바구니 numbers 만든다 (1 ~ 45)
lucky_numbers = random.sample(numbers,6) #랜덤하게 6개 뽑아서 lucky_numbers 에 저장
print(lucky_numbers) 

```

* for i in range

```python
numbers = [ ]		
for i in range(45):
    numbers.append(i+1)
    print(numbers[1])
2
    
numbers = list(range(1,46))
print(numbers[44])
45
```

range(45)         # 0 <= ? < 46  <- 범위. 1.11111 포함인 것. 실수+

range(1, 46)     # 1 <= ? < 46

-> random.sample(numbers, 6) 해도 경우의 수 상 정수로 처리

-> list( ) 도 정수 처리



