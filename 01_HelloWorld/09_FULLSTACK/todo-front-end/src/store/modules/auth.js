// auth.js 에서는 인증관련된 모든 state(데이터)를 작성
// state 에 접근/변경 하는 모든 로직은 여기로.
const state = {
    token: null,
};
// Vuex 에서는 Arrow Function
// getters는 state가져와서 사용하기 위함
const getters = {
    isLoggendIn: (state) => {
        if (state.token) {
            return true;
        } else {
            return false;
        }
    },  
    // 특정 값을 true/false 로 바꾸는 구문
    isLoggedIn: state => !!state.token,
};
const mutations = {
    setToken: (state, token) => state.token = token,
};
const actions = {
    logoutt: (options) => {
        // 아래는 매우 나쁜 방법
        // mutations.setToken(state, null),
        options.commit('setToken', null) // mutation 은 오직 commit 으로만 실행한다.
    },
    // const { model, year, inch } = laptop
    // laptop.model, laptop.year
    logout: ({ commit }) => commit('setToken', null),

    login: ({ commit }, token ) => commit('setToken', token),
};

export default {
    state, getters, mutations, actions,
}