# 191028 JS

- 브라우저 조작용 JS === Vanila JS : ES로 DOM과 BOM을 조작하는 것

| 무엇 (What)            | 어떻게 (How)           |
| ---------------------- | ---------------------- |
| 브라우저 - DOM         | 프로그래밍 언어로 (ES) |
| 문서viewer, document를 |                        |
|                        |                        |



```javascript
window.document.write('<h1>369</h1>')
	undefined

clap = '<p>짝</p>'
	"<p>짝</p>"

for (let i = 1; i <= 10; i ++) {
    if (i % 3 == '0') {
        window.document.write(clap);
    }
    else {
        window.document.write('<p>' + i + '</p>');
    }
}
	undefined
```



# 369

1

2

짝

4

5

짝

7

8

짝

10



* === !

```javascript
for (let i = 1; i <= 10; i ++) {
    if (i % 3 === 0) {
        window.document.write(clap);
    }
    else {
        window.document.write('<p>' + i + '</p>');
    }
}
```


$ cp template.html 01_variable.html
quokka.js
node.js



<hr>



# 191029 JS

새로고침 할 필요 없다, Data만 주고 받으면 된다
서버가 없다

django:
client <=> django 
           views 등을 server computer가 실행


client <=>  JavaScript  
        |   index.html
사용자가 <= <script code>
  실행   |   data 관리만 서버가 한다


=> 따라서 최근에 server == data
    서버가 할 일은 
        * modeling
        * validation
        * data out
    - 돈 덜 나감
    - script part가 heavy 하더라도 일은 사용자가 할 뿐, 결과적으로 html 파일 하나!
    - SPA (single-page application)


    - 사용자가 할 일을 덜어주기 위해 (최적화 문제, 안정적인 서버, 속도 문제 등)
    - 로직적으로 잘못 될 경우 느려지거나 하여
    => react, vue 등 등장
    => 코드를 덜 짜고, 성능은 더 좋음


* 서버도 -> serverless 화
    - firebase 등



# 191030
04_nodejs
## REPL 환경
> Read Evaluate Print Loop

```js
>(x, y) => { return x + y; }   // x = lambda x, y: x + y

>((x, y) => { return x + y; })(1, 2)  // (lambda x, y: x + y)(1, 2)
> 3
```

```py
# class 하지 않는다면 계산기를 만들 때
calculator = {
    'add': lambda x, y: x+y,
    'sub': lambda x, y: x-y,
}

print(calculator['add'](1, 2))
```

* 객체지향 프로그램의 객체
    - 1급 객체: 인자로 넘어갈 수 있고, return 으로 나올 수 있다.

    ```py
    def a(x): return y
    ```

    x, y에 들어갈 수 있는 것은 다 1급 객체: int, string, arr/list, obj/dict, Function!
     => 함수도 들어갈 수 있음 => 함수도 객체

    ```py
    def a():
        def add(x, y):
            return x + y
        return add

    print(a()(1, 2)) # 3

    new_map = map(lambda x: '-'+str(x)+'-', [1, 2, 3])
    print(new_map)
    ```

    -> path('asdf/', views.index)
    -> addEventListener('click', 콜백함수)
        - CallBack Function: 인자로 넘기는 함수
        - 지금 당장 호출 되는 것은 아니지만, 'url/click'이라는 일이 일어났을 때 호출 된다.



# 191031 04_node
$ npm install axios express
=> python venv와 달리 폴더 기준으로 만든다.
.gitignore node_modules/

node js project
    1. npm init
        package.json 생성 (version: (1.0.0) major.minor.bugfix)
    2. npm install 
        axios
        express
        -> 이제는 rm이 된다 (pjt 기반이라서)







191106

#### insta-like구현 (js)



+

https://kr.vuejs.org/v2/guide/components.html



+



Article.objects.get(title='hi)
Article.objects.filter(title='hi')



변수: 1, 2, 16
자료형: 4, 5, 17
typeof: 17
조건/반복: 3, 6
Object: 7, 8, 9
method 를 정의할 때는 arrow function ()=>{} 사용하지 않는다
JSON: 10
함수: 11, 13
syntactic sugar: 13
Arrayhelpermethods: 14DOM selector
queryselector; 하나의 객체만 가져온다
queryselectorall; 전체를 배열(queryset) 형태로 가져온다eventlistener: 12
axios: vue> catdog
싱글쓰레드, 콜백 어쩌구: 03_syncAsyncaxios + django: django INSTAGRAM