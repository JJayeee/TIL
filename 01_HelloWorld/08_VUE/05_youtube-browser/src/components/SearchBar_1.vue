<template>
    <div>
        <!-- method 는 내가 인자를 넘긴다면 (ARG)를 붙이고 
             그게 아니라면 ()를 붙이지 않는다. -->
             <!-- ()는 커스텀 인자 없으면 안 붙임 -->
             <!-- v-on: 을 줄여서 @, v-on:input -->

        <!-- <input @input="onInput" type="text"> : 변하는 족족 event-->
        <input @keypress.enter="onInput" type="text">
    </div>
</template>


<script>
export default {
    name: 'SearchBar', // new component: 0. 이름적기  1. include? App
    methods: {
        onInput (e) {
            // console.log(e.target.value); 
        
            // data가 automatically parents||sibling끼리 공유가 되지 않기 때문에
            // this.$emit() : 자식 cmpnt => 부모 cmpnt에게 정보(값, 데이터)를 올려보낼때
            // $emit: $ method, 값이 바뀔 때 마다 이를 위로 올리겠다.
            // this.$emit('Event이름', 전송할 값)
            this.$emit('inputChange', e.target.value); // payload:Array[1] >> 0:"input_text"
        }
    }
}
</script>


<style>
    
</style>