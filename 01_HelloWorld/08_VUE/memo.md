#### vue과목평가

-  수업내용 + vue 공식문서 읽어보기- vue 인스턴스의 속성
  \- 템플릿 문법
  \- 디렉티브
  \- computed와 watch
  \- 조건부 렌더링
  \- 리스트 렌더링
  \- 이벤트 핸들링
  \- 폼 입력 바인딩
  \- 컴포넌트 구조, props, emit
-  프로젝트- pjt09, youtube browser 프로젝트에서 props와 emit 이해하기



### 191105

`storage`
Application -> storage | 브라우저에 저장, 중앙 서버에 저장 X
Local Storage : 컴터 켜도 남아 있음
Session Storage : 껏다 켜면 사라짐


localStorage.setItem(key, value)

localStorage.setItem('test','aaa')
localStorage.getItem('test')
"aaa"

str은 들어가는데 (??, {a:1}) 같이 하면 [object Object]로 들어감
=> 저장할 데이터를 json으로 str 화
=> 꺼낼때도 마찬가지로 파싱



### 191106
#### 04_serverClient
$ npm -v
6.12.0

$ npm install -g @vue/cli

$ vue create first-vue-cli
    default
-> 어떤 위치에서든 실행할 수 있게 한다

🎉  Successfully created project first-vue-cli.
👉  Get started with the following commands:

 $ cd first-vue-cli
 $ npm run serve


 package.json -> 23; 
     "rules": {
      "no-console": "off"
    },


### 191111
* https://console.developers.google.com/

* npm i axios

main.js


Main.js- App - SearchBar
             L VideoList --- VideoListItem
             L VideoDetail

sibling끼리는 data 전달이 안 되기 때문에 App을 경유한다.
App <- SearchBar
L-> VideoList

SearchBar: input tag의 변화를 감지 
    -> emit, inputChange event를 위로 올려 보냄
App: if inputChange >> onInputChange, YOUTUBE_API로 요청을 보내고 응답을 받음(res: Array)
    -> props, res를 내려보냄
VideoList: props를 받고 for문을 돌려서
    -> props, 각각의 video를 props
VideoListItem: click을 기다리고 있다가
    => emit, VideoList
    => emit, App
    => props, VideoDetail