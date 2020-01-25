// single file component

<template>
    <!-- template 안에는 반드시 '단 1개'의 최상단 태그(노드)만 존재해야 한다. -->
    <div>
        <h1>나쁜말 filter</h1>
        <input type="text" v-model="input">
        <p>{{ filteredInput }}</p>
        <div class="static" v-bind:class="{ active: isActive, error: hasError }"></div>
        <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

    </div>
</template>

<script>
/* eslint-disable no-console */
// 완전동기화
export default {
    name: 'App',
    // data는 function(){return{}}으로 만들어야 한다.
    data: function () {
        return {
            input: '',
            isActive: true,
            hasError: false,
            activeColor: 'red',
            fontSize: 30,
        }
    },
    methods: {},
    computed: {
        filteredInput: function () {
            // js 정규표현식
            return this.input.replace(/바보|멍청이/g, '##');
            // g : 찾되, global하게 찾아라 (전체 다 찾아라)
            // i : insensitive, 대소문자 구분 없이 다 찾아라
        }
    },
}
</script>

<style></style>