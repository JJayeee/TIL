import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter) // 같이 일 해보자 악수하기

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
]

const router = new VueRouter({
  mode: 'history',  // url에 # 붙는 것 때문에. mode 해주면 원래의 브라우저 라우팅 방식이 됨(# 없음)
  routes
})

export default router
