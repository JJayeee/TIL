<template>
  <div class="todo-list">
        <!-- <button @click="getTodos">Load Todos</button> -->
    
        <div v-for="todo in todos" :key="todo.id" class="card">
            <div class="card-body d-flex justify-content-between">
                <span>{{ todo.title }}</span>
            </div>
        </div>

  </div>
</template>

<script>
const axios = require('axios');
// postman 에서 todolist 다 받았던 것
/*
    1. REQ 보내기
        1. GET
        2. http://localhost:8000/api/v1/users/my_todos/
        3. REQ.Header => Authorization: JWT [YOUR TOKEN HERE]
        4. (POST, PATCH) Body 에 내용 추가

*/

export default {
    name: 'TodoList',
    data () {
        return {
            todos: [],
        }
    },
    methods: {
        getTodos() {
            this.$session.start();
            const token = this.$session.get('jwt');
            const options = {
                headers: {
                    Authorization: `JWT ${token}`,
                }
            }
            axios.get('http://localhost:8000/api/v1/users/my_todos/', options)
                .then(res => {
                    // console.log(res.data.todo_set);
                    this.todos = res.data.todo_set
                })
                .catch(err => console.log(err.response))
        },
    },
    created () {
    this.getTodos();
    },
}
</script>

<style>

</style>