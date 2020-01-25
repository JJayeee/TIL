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
                // e.target: <input data-v-3214 type="text">
                this.$emit('inputChange', e.target.value);
            }
        }
    }
</script>


<style scoped>
    input {
        width: 75%;
    }
    
    div {
        text-align: center;
        margin: 20px;
    }
</style>