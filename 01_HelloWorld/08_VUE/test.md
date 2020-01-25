### Vue.js

-  사용자 인터페이스를 만들기 위한 **프로그레시브 프레임워크**

- Vue.js의 핵심에는 간단한 템플릿 구문을 사용하여 DOM에서 데이터를 선언적으로 렌더링 할 수있는 시스템이 있습니다.

  ```vue
  <div id="app">
    {{ message }}
  </div>
  
  <script>
      var app = new Vue({
        el: '#app',
        data: {
          message: '안녕하세요 Vue!'
        }
      })
  </script>
  ```

  - 데이터와 DOM이 연결되었으며 모든 것이 **반응형**이 되었습니다. 브라우저의 JavaScript 콘솔을 열고 `app.message`를 다른 값으로 설정해 보십시오. 위 예제가 업데이트 변경된 값에 따라 업데이트되는 것을 볼 수 있습니다.
  - 이외에도 다음과 같은 엘리먼트 속성을 바인딩할 수 있습니다.

  ```vue
   <span v-bind:title="message">
  ```

  ​	 `v-bind` 속성은 **디렉티브** 이라고 합니다. 디렉티브는 Vue에서 제공하는 특수 속성임을 나타내는 `v-` 접두어가 붙어있으며 사용자가 짐작할 수 있듯 렌더링 된 DOM에 특수한 반응형 동작을 합니다. 기본적으로 “이 요소의 `title` 속성을 Vue 인스턴스의 `message` 속성으로 최신 상태를 유지 합니다.”



- **싱글 파일 컴포넌트** : 많은 Vue 프로젝트에서, 전역 컴포넌트는 `Vue.component`를 사용해 정의되고, 다음에 모든 페이지의 container 엘리먼트를 대상으로 하는 `new Vue({el: '#container'})`가 정의됩니다.







/ **npm** (노드 패키지 매니저/Node Package Manager)은 [자바스크립트](https://ko.wikipedia.org/wiki/자바스크립트) 프로그래밍 언어를 위한 [패키지 관리자](https://ko.wikipedia.org/wiki/패키지_관리자)이다.



public - favicon.icon

​			L index.html

src - App.vue

​	  L main.js

​	  L assets/

​	  L components/	





<!-- Add "scoped" attribute to limit CSS to this component only -->