<template>
    <div>
        <input type="text" v-model="input">
        <p>{{ filteredInput }}</p>
    </div>
</template>

<script>
export default {
    name: 'App',
    data: function() {
        return {
            input: '',
        }
    },
    methods: {},
    computed: {
        filteredInput: function () {
            return this.input.replace(/바보|멍청이/g, '##');
        }
    }
    
}
</script>


<style>
    
</style>