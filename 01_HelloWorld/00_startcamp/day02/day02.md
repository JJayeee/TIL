

# Startcamp 02

## 1. What is Git

Git : SCM (source code manager) / VCS (version control system)

​		-> 버전 관리를 해주는 감시카메라 역할 (파일 및 폴더 모두 프로젝트 취급, 버전 관리 가능)



### 1)  Git bash

`git init ` => initialized. git 으로 관리하겠다. master 등록

`git add  <filename>` => 관리 하겠다고 등록, 변경사항 저장 <file>/  < - 폴더 all

`git commit -m '<message>'` => 메시지 남기기

`git status` => 상태를 물어보는 명령어

`git log` => 사진(commit) 의 로그를 보여줌

`git add -A` = `git add .`  => (all)

```bash
$ git init		# ~/practice_git (master)
$ touch final.txt
$ git status	# Untracted files present (final.txt) <- 붉은 색
$ git add final.txt   
$ git status    # new file : final.txt
$ git commit -m '처음 만들었음'
$ git status    # nothing to commit, working tree clean
				# txt파일 수정, 저장 후
$ git status	# (modified: final.txt) <- 붉은 색 : commit 할 수 없다는 의미
$ git add final.txt
$ git status	# modified: final.txt 
$ git commit -m '첫줄을 작성함'
$ git log
	첫줄을 작성함
	처음 만들었음	#역순으로 
				# 자주 변경, 적게 변경하고 status 하면 changes to be / changes no staged for
					=> add / commit 선택
						add : 변경 된 세 줄 txt
						commit : 변경 전 두 줄 txt
```



git add . 

git commit -m 'message'

git push github master







## 2. Web browser



### 1) 브라우저 열기



```python
import webbrowser

urls = [
    'www.github.com',
    'www.google.com',
    'www.evernote.com'
]

for url in urls:
    webbrowser.open(url)

```

```bash
$ python web_browser.py
```



+

```python
for url in range(1, 30):
    url = f'http://edu.ssafy.com/edu/board/{i}/'
    webbrowser.open(url)
```





### 2) 정보 수집하기

브라우저 화면에서 특정 데이터만 가져오는 작업 하기

웹(web)에서의 커뮤니케이션 방식

요청(request, 주소-Url로 보냄)과 응답(문서를 받음)

















#### (1) scraping.py

```python
import requests
import bs4	# 파이썬이 보기 좋게 변형해주는 역할

url = 'https://finance.naver.com/sise/'
response = requests.get(url)		# 모두 가져옴 -> 터미널 [200] (Ok)
response = requests.get(url).text	# request.get을 가져오고 text만 담겠다
text = bs4.BeautifulSoup(response, 'html.parser')	#''형태로 바꾸겠다
kospi = text.select_one('#KOSPI_now')	# 'text'에서 하나만 select한다 .select_one

print(kospi.text)		# kospi를 가져오는데 그 중에 text만

```

```bash
$ pip install request
$ pip install bs4
$ python scraping.py
<span class="num num2" id="KOSPI_now">2,052.03</span>  # print(kospi)의 경우
2,052.03
```



#### (2) melon50.py

```python
import requests
import bs4

url = 'https://www.melon.com/chart/index.htm'

headers = {'User-Agent': ':)'} #User-Agent(브라우저) Key는 중요하지 않고 Value값만 중요함

response = requests.get(url, headers=headers).text #멜론은 406이라서 User-Agent를 함께 보냄

text = bs4.BeautifulSoup(response, 'html.parser')
rows = text.select('.lst50')	#'text'에서 row(가로)에 리스트 모두 가져오고자 .select

print(rows)		# rows는 리스트인 상황

for row in rows:		# rows에서 for문 하나로 내려왔을 때 각각(row)의 랭크, 제목, 가수 설정
    rank = row.select_one('td:nth-child(2) > div > span.rank').text
    title = row.select_one('td:nth-child(6) > div > div.ellipsis.rank01 > span > a').text
    artist = row.select_one('td:nth-child(6) > div > div > div.ellipsis.rank02 > a').text
    print(rank, title, artist)
    
```

````bash
$ python melon50.py
1 헤어져줘서 고마워 벤
...
````





#### (3) file_W/R + CSV

자료를 엑셀 형태로 저장하고 불러오기 

* file_write.py

```python
lunches = {	
    '양자강': '02-557-4211',
    '김밥카페': '02-553-3181',
    '순남시래기': '02-508-0887'
}													
													# .csv 액셀 파일을 w(write)
with open('lunch.csv', 'w', encoding='utf-8') as f: # ()라고 연 것을 f(file)라고 부르겠다
    f.write('식당이름, 전화번호\n')				      # utf-8(한글 유니코드), \n(뉴라인 엔터)
    for name, phone in lunches.items():
        f.write(f'{name}, {phone}\n')

```

```python
for lunch in lunches:
    print(lunch)	# key 값 나열
    print(lunches[lunch])	# value 값 나열
    
for name, phone in lunches.items():
    print(name, phone)		# 양자강, 02-557-4211
```



* file_read.py

```python
import csv

with open('lunch.csv', 'r', encoding='utf-8') as f:
    items = csv.reader(f)
    print(items)
    for item in items:
        print(item)

```

```bash
$ python file_read.py
<_csv.reader object at 0x000001BA17D0CCE0>		#print(items) 값
['식당이름', ' 전화번호']
['양자강', ' 02-557-4211']
['김밥카페', ' 02-553-3181']
['순남시래기', ' 02-508-0887']
```















#### (4) TIL.final : melon50.py

* melon50.py - writer

```python
import bs4
import requests
import csv

url = 'https://www.melon.com/chart/index.htm'

headers = {'User-Agent': ':)'}

response = requests.get(url, headers=headers).text

text = bs4.BeautifulSoup(response, 'html.parser')
rows = text.select('.lst50')
																			# writerow는 +enter라서
writer = csv.writer(open('melon50.csv', 'w', encoding='utf-8', newline='')) # ''=없다 처리 추가
writer.writerow(['순위', '제목', '가수'])

for row in rows:
    rank = row.select_one('td:nth-child(2) > div > span.rank').text
    title = row.select_one('td:nth-child(6) > div > div.ellipsis.rank01 > span > a').text
    artist = row.select_one('td:nth-child(6) > div > div > div.ellipsis.rank02 > a').text
    writer.writerow([rank, title, artist])

```



#. melon50.csv 

1 순위, 제목, 가수

2 1, 헤어져줘서 고마워, 벤

...

#. Preview 'melon50.csv' : 엑셀화



- melon50.py - write

```python
with open('melon50.csv', 'w', encoding='utf-8') as f:	
    f.write('순위, 제목, 가수\n')		
    for row in rows:
        rank = row.select_one('td:nth-child(2) > div > span.rank').text
        title = row.select_one('td:nth-child(6) > div > div > div.ellipsis.rank01 > span > a').text
        artist = row.select_one('td:nth-child(6) > div > div > div.ellipsis.rank02 > a').text
        f.write(f'{rank},{title},{artist}\n')
```







---------

## cf.

cd .. : (change directory) 위로가기

cd <name> : 특정 폴더로 들어가기

touch : 생성 touch aaa.txt

mkdir : 폴더 생성

rm : 삭제 

첫글자 탭 : 자동완성

방향키 : 아까 쓴 코드

~ : (상징) home 폴더

.. : (상징) 상위 폴더

ls : (list) 현 폴더에 무엇이 있는가



.gitignore

.vscode/
