import Vue from 'vue'
import App from './App.vue'
import router from './router' // from './router/index.js'  index는 special하다
import VueSession from 'vue-session' // 발급받은 Token을 SessionStorage에 저장하는 일을 도와줌


Vue.config.productionTip = false;
Vue.use(VueSession); // Vue에게 VueSession 이라는 middleware 등록

new Vue({
  router,  // router/index.js 에서 악수하고, 본격적으로 일을 시작. 진짜 일 시작.
  render: h => h(App)
}).$mount('#app')
