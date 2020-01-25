<template>
  <div id="app">
    <div id="nav">
      <!-- a tag 대용 -->
      <router-link to="/">Home</router-link>
      <span v-if="!isLoggedIn">
        <router-link to="/login">Login</router-link>
      </span>
      <span v-else>
        <a href="">Logout</a>
      </span>
    </div>
    
    <div class="container col-6">
      <router-view/> <!-- 다른 url이 들어오면 component를 보여주는 곳 -->
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App', 
  methods: {
    ...mapGetters(['isLoggedIn']),
    ...mapActions(['logout']),
  }
}
</script>



<style>
/*
  1. 컴포넌트마다 비슷한/같은 함수들을 정의 해야 함 + 정리가 안 됨
  2. 사용자 auth 정보(token) & todos 목록을 컴포넌트끼리 공유하지 못함

  => Vuex(State Management System)
*/

</style>
