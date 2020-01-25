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