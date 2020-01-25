import Vue from 'vue'; // node_modules 에서 찾는 것
import App from './App.vue'; // .vue는 안 써도 알아서 동작한다.


// const app = new Vue() 였던 것에서

/*
new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(App)
    },
})
*/

// [el: '#app'] === [.$mount('#app')]
/*
new Vue({
    render: function (createElement) {
        return createElement(App);
    },
}).$mount('#app')
*/

// method(함수 in 객체) 정의할 때, () => {} arrow function 여기서만 쓴다
new Vue({
    render: h => h(App),
}).$mount('#app')
