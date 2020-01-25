import Vue from 'vue'; // node_modules
import App from './App'; // `./`: package를 찾음 & App.vue 를 알아서 확장자를 버리고 읽음


// //  const app = 
//  new Vue({
//      el: '#app',  // mount될 대상, 부착 될 대상
//      render: function (createElement) {
//          return createElement(App); 
//      }
//      // route component에서만 render & ender 에서만 arrow function & createElement >> h
//  })

// Module Error (from ./node_modules/eslint-loader/index.js):
// error: 'app' is assigned a value but never used (no-unused-vars) at src\main.js:5:8:

new Vue({
    render: h => h(App),
}).$mount('#app')