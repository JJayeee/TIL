<template>
  <div class="home">
    <h1>This is Home</h1>
    <TodoList />
  </div>
</template>

<script>
import router from '../router';
import TodoList from '../components/TodoList';

export default {
  name: 'home',
  components: {
    TodoList,
  },
  methods: {
    isLoggedIn () {
      this.$session.start();
      if (!this.$session.has('jwt')) {
        // jwt 문자열이 있냐 없냐 = django와 통신한 결과에 따른 login 여부 확인
        router.push('/login');  // redirect
      }
    }
  },

  // mounted || created 이후로는 접근이 되기 때문에
  created () { // veforeCreate: Error: create되어야 isLoggedIn에 접근이 가능해서
    this.isLoggedIn() 
  },
}
</script>
