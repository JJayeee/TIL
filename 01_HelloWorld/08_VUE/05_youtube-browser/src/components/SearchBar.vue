<template>
    <div>
        <input @keypress.enter="onInput" type="text">
    </div>
</template>


<script>
export default {
    name: 'SearchBar',
    methods: {
        onInput (e) {
            // console.log(e.target)
            this.$emit('inputChange', e.target.value);
        }
    }
}
</script>


<style scoped>
    /* 해당 컴포넌트의 태그들 만 영향을 받는다. */
    input {
        width: 75%;
    }

    /* 모든 div, videoListItem도 text-align이 됨 */
    /* component 만 독립적으로 하고 싶다면 style에 속성을 넣는다. */
    div {
        text-align: center;
        margin: 20px;
    }
</style>