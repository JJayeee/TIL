## 01_basic

### 00_intro

![](.\images\01_basic_00_01.JPG)

![](.\images\01_basic_00_02.JPG)

![](.\images\01_basic_00_03.JPG)



* `querySelectorAll` : Nodelist 반환 

* `alert('blah')` : <script>
* `prompt('blah')`: <script>, 입력창을 띄움 

* `innerText`

```
document.querySelector('h1')
-> <h1>Hi</h1>
document.querySelector('h1').innerText
-> "Hi"
```



- `parseInt(number)`

```javascript
number = document.querySelector('p').innerText;
number = parseInt(number) + 1;
document.querySelector('p').innerText = number
```

```
string을 n진법일 때의 값으로 바꿉니다. n은 옵션으로 2부터 36까지 입력할 수 있습니다. 입력하지 않으면 10으로 처리합니다.
string의 처리는 parseFloat()와 거의 같습니다.
```





<hr>





### 01_variable & 16_scope

- var와 let, 그리고 const는 다음처럼 사용하는 것을 추천한다.

  - ES6를 사용한다면 var 키워드는 사용하지 않는다.
  - 재할당이 필요한 경우에 한정해 let 키워드를 사용한다. 이때 변수의 스코프는 최대한 좁게 만든다.
  - 변경이 발생하지 않는(재할당이 필요 없는 상수) 원시 값과 객체에는 const 키워드를 사용한다. const 키워드는 재할당을 금지하므로 var, let 보다 안전하다.

  변수를 선언하는 시점에는 재할당이 필요할지 잘 모르는 경우가 많다. 그리고 객체는 의외로 재할당을 하는 경우가 드물다. 따라서 변수를 선언할 때에는 일단 const 키워드를 사용하도록 하자. 반드시 재할당이 필요하다면(반드시 재할당이 필요한지 한번 생각해 볼 일이다.) 그때 const를 let 키워드로 변경해도 결코 늦지 않는다.



- 자바스크립트는 함수 레벨 스코프(Function-level scope)를 따른다.

  `함수 레벨 스코프(Function-level scope)`

  함수 내에서 선언된 변수는 함수 내에서만 유효하며 함수 외부에서는 참조할 수 없다. 즉, 함수 내부에서 선언한 변수는 지역 변수이며 함수 외부에서 선언한 변수는 모두 전역 변수이다. for 문의 변수 선언문에서 선언한 변수를 for 문의 코드 블록 외부에서 참조할 수 있다.

  `블록 레벨 스코프(Block-level scope)`

  모든 코드 블록(함수, if 문, for 문, while 문, try/catch 문 등) 내에서 선언된 변수는 코드 블록 내에서만 유효하며 코드 블록 외부에서는 참조할 수 없다. 즉, 코드 블록 내부에서 선언한 변수는 지역 변수이다.





- 변수 : var (ES5), let (ES6+)

  - ES6는 **블록 레벨 스코프**를 따르는 변수를 선언하기 위해 `let` 키워드를 제공한다.

  ```javascript
  var foo = 123; // 전역 변수
  
  console.log(foo); // 123
  
  {
    var foo = 456; // 전역 변수
  }
  
  console.log(foo); // 456
  ```

  ```javascript
  let foo = 123; // 전역 변수
  
  {
    let foo = 456; // 지역 변수
    let bar = 456; // 지역 변수
  }
  
  console.log(foo); // 123
  console.log(bar); // ReferenceError: bar is not defined
  ```

  - var 키워드로는 동일한 이름을 갖는 변수를 중복해서 선언할 수 있었다. 하지만, let 키워드로는 동일한 이름을 갖는 변수를 중복해서 선언할 수 없다. 변수를 중복 선언하면 문법 에러(SyntaxError)가 발생한다.

  ```javascript
  var foo = 123;
  var foo = 456;  // 중복 선언 허용
  
  let bar = 123;
  let bar = 456;  // Uncaught SyntaxError: Identifier 'bar' has already been declared
  ```

  	- 전역 객체(Global Object)는 모든 객체의 유일한 최상위 객체를 의미하며 일반적으로 Browser-side에서는 window 객체, Server-side(Node.js)에서는 global 객체를 의미한다. var 키워드로 선언된 변수를 전역 변수로 사용하면 전역 객체의 프로퍼티가 된다. / let 키워드로 선언된 변수를 전역 변수로 사용하는 경우, let 전역 변수는 전역 객체의 프로퍼티가 아니다. 즉, window.foo와 같이 접근할 수 없다. let 전역 변수는 보이지 않는 개념적인 블록 내에 존재하게 된다.

  ```javascript
  var foo = 123; // 전역변수
  console.log(window.foo); // 123
  
  let ff = 123; // 전역변수
  console.log(window.ff); // undefined
  ```

  



- 상수 : const (ES6+)

  - 블록 레벨 스코프, 재할당이 불가능하며 선언과 동시에 할당이 이루어져야 한다.

  ```javascript
  const FOO = 123;
  FOO = 456; // TypeError: Assignment to constant variable.
  ```

  ```javascript
  const FOO; // SyntaxError: Missing initializer in const declaration
  ```

  ```javascript
  {
    const FOO = 10;
    console.log(FOO); //10
  }
  console.log(FOO); // ReferenceError: FOO is not defined
  ```

  - const는 재할당이 금지된다. 이는 const 변수의 타입이 객체인 경우, 객체에 대한 참조를 변경하지 못한다는 것을 의미한다. 하지만 이때 **객체의 프로퍼티는 보호되지 않는다.** 다시 말하자면 재할당은 불가능하지만 할당된 객체의 내용(프로퍼티의 추가, 삭제, 프로퍼티 값의 변경)은 변경할 수 있다. 

    객체의 내용이 변경되더라도 객체 타입 변수에 할당된 주소값은 변경되지 않는다. 따라서 **객체 타입 변수 선언에는 const를 사용하는 것이 좋다.** 만약에 명시적으로 객체 타입 변수의 주소값을 변경(재할당)하여야 한다면 let을 사용한다.

  ```javascript
  const user = { name: 'Lee' };
  
  // const 변수는 재할당이 금지된다.
  // user = {}; // TypeError: Assignment to constant variable.
  
  // 객체의 내용은 변경할 수 있다.
  user.name = 'Kim';
  
  console.log(user); // { name: 'Kim' }
  ```





- var / let / const 비교

![01_basic_01_03](.\images\01_basic_01_03.JPG)





![01_basic_01_04](.\images\01_basic_01_04.JPG)

![01_basic_01_05](.\images\01_basic_01_05.JPG)



- var / let & const  scope 비교
  - 전역 

![01_basic_16_02](.\images\01_basic_16_02.JPG)



- - var

  ![01_basic_16_01](.\images\01_basic_16_01.JPG)

  

  - let/const

![01_basic_16_03](.\images\01_basic_16_03.JPG)





### Datatype 



```js
var str = "hello world";
```

-> str이라는 이름의 **변수**를 선언하고 문자열 **리터럴** ‘Hello World’를 **값**으로 할당. 이때 문자열 리터럴 ‘Hello World’는 문자열 타입의 값이다.

| 용어                   | 의미                                                         |
| ---------------------- | ------------------------------------------------------------ |
| 데이터 타입(Data Type) | 프로그래밍 언어에서 사용할 수 있는 값의 종류                 |
| 변수(Variable)         | 값이 저장된 메모리 공간의 주소를 가리키는 식별자(identifier) |
| 리터럴(literal)        | 소스코드 안에서 직접 만들어 낸 상수 값 자체, 값을 구성하는 최소 단위. |

```js
// 숫자 리터럴
10.50
1001

// 문자열 리터럴
'Hello'
"World"

// 불리언 리터럴
true
false

// null 리터럴
null

// undefined 리터럴
undefined

// 객체 리터럴
{ name: 'Lee', gender: 'male' }

// 배열 리터럴
[ 1, 2, 3 ]

// 정규표현식 리터럴
/ab+c/

// 함수 리터럴
function() {}
```



자바스크립트는 C나 Java외는 다르게 변수를 선언할 때 데이터 타입을 미리 지정하지 않는다. 다시 말해, 변수에 할당된 값의 타입에 의해 `동적으로 변수의 타입이 결정`된다. 이를 동적 타이핑이라 하며 자바스크립트가 다른 프로그래밍 언어와 구별되는 특징 중 하나이다.

자바스크립트의 모든 값은 데이터 타입을 갖는다. 자바스크립트는 7가지 데이터 타입을 제공한다.

- 원시 타입 (primitive data type)
  - `number`
  - `string`
  - `boolean`
  - `null`
  - `undefined`
  - `symbol` (New in ECMAScript 6)
- 객체 타입 (Object data type)
  - `object`

```js
// Number
var num1 = 1001;
var num2 = 10.50;

// String
var string1 = 'Hello';
var string2 = "World";

// Boolean
var bool = true;

// null
var foo = null;

// undefined
var bar;

// Object
var obj = { name: 'Lee', gender: 'male' };

// Array
var array = [ 1, 2, 3 ];

// function
var foo = function() {};
```



`typeof`: 타입 연산자. 함수(x)

```js

typeof true;  // boolean
typeof false;

// 확실히 없다 vs. 모르겠는데. 없는데. 의도하지 않음
typeof null;  // object
typeof undefined; // undefined 
// [1, 2, 3][100]
// b = {a:2}, b.c
// function a (x) {console.log(x)}, a() | a(2) -> 2

typeof 'asdf'; // string

typeof 1; // number
typeof 1.1; // number
typeof Infinity; // number
typeof NaN; // number

typeof [1, 2]; // object
typeof {a:1, b:2}; // object

typeof function(){}; // function
```



- undefined 

  - undefined 타입의 값은 `undefined`가 유일하다. 선언 이후 값을 할당하지 않은 변수는 `undefined` 값을 가진다. 즉, 선언은 되었지만 값을 할당하지 않은 변수에 접근하거나 존재하지 않는 객체 프로퍼티에 접근할 경우 undefined가 반환된다.

    이는 변수 선언에 의해 확보된 메모리 공간을 처음 할당이 이루어질 때까지 빈 상태(대부분 비어있지 않고 쓰레기 값(Garbage value)이 들어 있다)로 내버려두지 않고 자바스크립트 엔진이 undefined로 초기화하기 때문이다.

    undefined는 개발자가 의도적으로 할당한 값이 아니라 자바스크립트 엔진에 의해 초기화된 값이다. 변수를 참조했을 때 undefined가 반환된다면 참조한 변수가 선언 이후 값이 할당된 적인 없는 변수라는 것을 개발자는 간파할 수 있다. 



- null

  - null 타입의 값은 `null`이 유일하다. 자바스크립트는 대소문자를 구별(case-sensitive)하므로 `null`은 Null, NULL등과 다르다.

    프로그래밍 언어에서 `null`은 의도적으로 변수에 값이 없다는 것을 명시할 때 사용한다. 이는 변수가 기억하는 메모리 어드레스의 참조 정보를 제거하는 것을 의미하며 자바스크립트 엔진은 누구도 참조하지 않는 메모리 영역에 대해 [가비지 콜렉션](https://developer.mozilla.org/ko/docs/Web/JavaScript/Memory_Management)을 수행할 것이다.

    ```javascript
    var foo = 'Lee';
    foo = null;  // 참조 정보가 제거됨
    ```

    또는 함수가 호출되었으나 유효한 값을 반환할 수 없는 경우, 명시적으로 null을 반환하기도 한다. 예를 들어, 조건에 부합하는 HTML 요소를 검색해 반환하는 Document.querySelector()는 조건에 부합하는 HTML 요소를 검색할 수 없는 경우, null을 반환한다.

    ```javascript
    var element = document.querySelector('.myElem');
    // HTML 문서에 myElem 클래스를 갖는 요소가 없다면 null을 반환한다.
    console.log(element); // null
    ```

    타입을 나타내는 문자열을 반환하는 `typeof` 연산자로 null 값을 연산해 보면 null이 아닌 object가 나온다. 이는 자바스크립트의 설계상의 오류이다.

    ```javascript
    var foo = null;
    console.log(typeof foo); // object
    ```

    따라서 null 타입을 확인할 때 typeof 연산자를 사용하면 안되고 일치 연산자(===)를 사용하여야 한다.

    ```javascript
    var foo = null;
    console.log(typeof foo === null); // false
    console.log(foo === null);        // true
    ```





* string

```html
<body>
    <script>
        const firstName = 'Hyundong';
        const lastName = 'JO';
        const fullName = firstName + ' ' + lastName
        // string concatenation
        document.write('<h1>' + fullName + '!!' + '</h1>')
        // Template Literal(ES6+): backtick(``) 으로 감싸고, ${} 안에 변수를 넣는다.
        document.write(`<h2>${fullName}이(가) JS 를 마스터 한다!</h2>`)
    </script>
</body>
```



* number

```js
typeof(1) // number
typeof(Infinity) // number
typeof(NaN) // number

// number 연산이 이상할 경우 에러가 아니라 NaN 이라는 값을 return

Infinity - Infinity // NaN
Infinity - 1 // Infinity

'asdf' + 1 // 덧셈이 아니라 string concat으로 자동 형변환, 'asdf1'
'1' + 1 // "11"
'1' - 2 // -1

'asdf' - 1 // 그 외의 연산은 NaN
'asdf' * 1 // NaN
```





![01_basic_04_01](.\images\01_basic_04_01.JPG)





![01_basic_04_02](.\images\01_basic_04_02.JPG)





![01_basic_05_03](.\images\01_basic_05_03.JPG)





* array method : ()로 실행, return 이 있다. 07_array.js

  * reverse 

  * push - pop

  * unshift - shift

    & 

  * includes

  * indexOf

  * join






<hr>

### 08_object

```js
// js의 근간, 자료형 object

const me = { // object - 객체 (key-value로 이루어짐. class와 무관)
    name: 'jay',  // key 가 string 한 단어일 때에는 따옴표 생략 가능
    'phone number': '01012345678',  // 여러 단어일 때에는 써야 한다.
    electronicDivece: {     // 그래서 띄어쓰기 잘 안 씀. 
        phone: 'samsung',  // object의 object
        laptop: 'asus',
    }, // ,
};  // ;

// value 호출할 때에도 [key] 말고 .key 로 가능, 띄어쓰기 단어는 안 됨
// 되도록 변수명을 띄어쓰기를 쓰지 않는다.

// window.document <- 이것도 사실 object 였던 것.
// 이러한 형식이 json으로 표현되어 있는 것.

/* 
    KEY - VALUE 를 나타내는 형식 중 json
    JavaScript Object Notation : JS 의 Object 처럼 표기하는 방법
*/

/*
자바스크립트는 객체(object) 기반의 스크립트 언어이며 자바스크립트를 이루고 있는 거의 “모든 것”이 객체이다. 
원시 타입(Primitives)을 제외한 나머지 값들(함수, 배열, 정규표현식 등)은 모두 객체이다.

자바스크립트 객체는 키(이름)와 값으로 구성된 프로퍼티(property)의 집합이다. 
프로퍼티의 값으로 자바스크립트에서 사용할 수 있는 모든 값을 사용할 수 있다. 
자바스크립트의 함수는 일급 객체이므로 값으로 취급할 수 있다. 
따라서 프로퍼티 값으로 함수를 사용할 수도 있으며 프로퍼티 값이 함수일 경우, 일반 함수와 구분하기 위해 메소드라 부른다.

이와 같이 객체는 데이터를 의미하는 프로퍼티(property)와 
데이터를 참조하고 조작할 수 있는 동작(behavior)을 의미하는 메소드(method)로 구성된 집합이다. 
객체는 데이터(프로퍼티)와 그 데이터에 관련되는 동작(메소드)을 모두 포함할 수 있기 때문에 
데이터와 동작을 하나의 단위로 구조화할 수 있어 유용하다.
*/
var person = {
    name: 'Lee',
    gender: 'male',
    sayHello: function () {
      console.log('Hi! My name is ' + this.name);
    }
  };
  
  console.log(typeof person); // object
  console.log(person); // { name: 'Lee', gender: 'male', sayHello: [Function: sayHello] }
  
  person.sayHello(); // Hi! My name is Lee
```



![](.\images\01_basic_08_01.JPG)

* JSON

  ```js
  /* 
      KEY - VALUE 를 나타내는 형식 중 json
      JavaScript Object Notation : JS 의 Object 처럼 표기하는 방법
  */
  
  // JSON 으로 표현 된(전달 된) 데이터의 타입은 무조건 string이다.
  const rawJson = `
      {
          "name": "Jay", 
          "job": "None"
      }
  `;
  // 컴퓨터는 이를 key-value로 읽는 것이 아니라, string 덩어리로 본다.
  // 해석하기 위해 다음의 과정이 있어야 한다.
  
  // parsing: 구문 분석
  const parseData = JSON.parse(rawJson);
  // parseData >> {name: "Jay", job: "None"}
  
  // serializing: 직렬화, 공용어로 번역
  const backToJSON = JSON.stringify(parseData);
  // bactToJSON >> "{"name":"Jay","job":"None"}"
  
  ```





#### function / eventlistener

* [무엇].addEventListener([언제], [어떻게])



```js
// 1. 선언형 (; X)
function a (x, y) {
    return x + y
}

// 2. 할당형 (= ;)
const b = function (x, y) {
    return x + y
};

// 3. errow function (할당형)
const c = (x, y) => {
    return x + y
};

// 3-1. 짧게: 함수 block에 코드가 return 문 한 줄 일 경우에 {} + return 함께 생략 가능
const d = (x, y) => x + y; 

// 3-2. 짧게: 함수의 인자가 단 하나 일 때 () 생략 가능
const e = x => {
    return x ** 2;
};

// 3-3. 인자가 1개이고, return 포함 한 줄 일때.
function squere(x) {
    return x ** 2;
}

const square = x => x ** 2;


// 3+. 인자가 하나도 없는 경우
const e = () => {  // ()
    return false
}
const e = _ => {  // _
    return false
}


```





* callbackFunction

```js
function a(x, y) {
    console.log('a');
    console.log(x+y);
    return x + y;
}

function b(n) {
    console.log('b');
    // console.log(n++);
    // const a = n ++ 
    return n ++; // return 하고 나서 n += 1
    // return ++n; // n += 1 하고 return 
}

// const a = n ++ ; return a; => 119
// const a = n ++ ; return n; => 120
// const a = n ++ ; return n ++; => 120
// console.log(n++); return n++; => 99, 120

function c(f1, f2) {
    console.log('c');
    // console.log(f2(99));
    return f1(10, 10) + f2(99);
} 


console.log(
    c(a, b)
)
```





<hr>

* querySelecter



![01_basic_18_01](.\images\01_basic_18_01.JPG)







<hr>



  - condition

      - ```html
        <body>
            <script>
                const userName = prompt('Who are you?');
                let message = '';
        
                if (userName === 'Admin') {
                    message = 'This is secret admin page';
                }
                else if (userName === 'Jay') {
                    message = 'Good afternoon, Jay :)';
                }
                else {
                    message = `Hello, ${userName}`;
                }
        
                document.write(`<h1>${message}</h1>`);
            </script>
        </body>
        ```

      - 삼항연산자 ternary expression

    ```html
    document.write(userName === 'Admin' ? ':)' : ':(');
    ```



![01_basic_02_02](.\images\01_basic_02_02.JPG)

* iteration

  ```js
  /* while */ 
  let i = 0;
  while (i < 10) {
      console.log(i);
      i++;
  }
  
  
  /* 
      for (초기화식; 조건식; 증감식) {
          조건식이 참인 경우 반복 실행될 문;
      }
      
      for 문은 조건식이 거짓으로 판별될 때까지 코드 블록을 반복 실행한다. 
  */
  
  let sum = 0;
  // for j in range(5):
  for (let j=1; j < 6; j++) {
      sum += j;
      console.log(sum);
  }
  console.log(sum);
  
  // for k in range(1, 6):
  for (let k=1; k < 6; k++) {}
  
  
  // for num in [1, 2, 3, 4, 5] + const로 선언!
  for (const number of [1, 2, 3, 4, 5]) {}
  
  ```

  







<hr>

* `AJAX` Asynchronous Javascript And XML
  * 비동기요청, HTML 전환 없이 요청(GET, POST)를 보낸다.







```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="./main.css">
</head>
<body>
    


    <script src="./main.js"></script>
</body>
</html>
```



appendChild

removeChild

document.createElement

.className

.classList

