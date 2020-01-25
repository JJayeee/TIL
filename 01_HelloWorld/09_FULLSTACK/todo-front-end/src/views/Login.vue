<template>
  <div class="login">
      <h1>Log in</h1>

      <LoginForm />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
// import router from '../router'

export default {
  name: 'Login',
  components: {
    LoginForm,
  },
  // methods: { // login 관련 같은 코드가 반복 됨 -> vuex 
  // isLoggedIn () {
  //     this.$session.start();
  //     if (!this.$session.has('jwt')) {
  //       router.push('/login');
  //     }
  //   }
  // },

  // created () {
  //   this.isLoggedIn() 
  // },

}
</script>

<style>

</style>