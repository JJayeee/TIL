<template>
    <div class="login-form">
        <div v-if="isLoading" class="spinner-border" role="status">
            <span class="sr-only">Loading</span>
        </div>

        <!-- div였는데 form으로 바꿈. 근데 form은 redirect(새로고침)이 일어난다. -->
        <!-- form tag의 기본은 redirect, 이를 막기 위해서 @submit.prevent=""-->
        <!-- 원래는 div -> 각 input에 @keyup.enter="login" @click="login" 이런 식이었음 -->
        <form v-else class="login-input" @submit.prevent="login">
            <div v-if="errors.length" class="error-list alert alert-danger">
                <h4>아래의 오류를 해결해 주세요.</h4>
                <ul>
                    <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
                </ul>
            </div>

            <div class="form-group">
                <label for="username">ID</label>
                <!-- credentials가 중요하지 key는 알아서 찾아 간다. 없으면 만든다. -->
                <input v-model="credentials.username" type="text" class="form-control" id="username"
                    placeholder="아이디를 입력해주세요">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="credentials.password" type="password" class="form-control" id="password"
                    placeholder="비밀번호를 입력해주세요">
            </div>
            <button class="btn btn-primary">로그인</button>
        </form>

    </div>


</template>

<script>
    import router from '../router'
    const axios = require('axios');
    
    export default {
        name: 'LoginForm',
        data() {
            return {
                credentials: {
                    username: '',
                    password: '',
                }, // id/password 에 해당하는 data
                isAuthenticated: false, // 인증 여부
                isLoading: false, // 사용자 측에서 검토 하고 보내는 편이 django에 이득
                errors: [],
            }
        },
        methods: {
            login() {
                this.isLoading = true;
                
                // if 부분이 true일 때에만
                if (this.checkUserInput()) {
                    // console.log('django 서버로 데이터를 보냅니다.')
                    axios.post('http://localhost:8000/api-token-auth/', this.credentials)
                        .then(res => {
                            this.isLoading = false;
                            // console.log(res.data.token);
                            this.$session.start(); // sessionStorage.session-id 에 sess: + Date.now() 형성
                            this.$session.set('jwt', res.data.token); // (key, value) 를 위에 추가
                            this.$store.dispatch('login', res.data.token);
                            router.push('/');
                            // 새로고침이 일어나는 것은 아니지만 router forder에 밀어넣음으로써 주소창을 바꾼 결과가 보여진다.
                            // render redirect('/') 와 같다
                        })
                        .catch(err => {
                            if (!err.response) {  // no response
                                this.errors.push('Network Error')
                            } else if (err.response.status === 400) {  // bad request
                                this.errors.push('Invalid user name or password')
                            } else if (err.response.status === 500) {  // server error
                                this.errors.push('Internal Server error. Please try again.')
                            } else {
                                this.errors.push('Some error occured')
                            }
                            this.isLoading = false;
                        });
                }
                else {
                    // console.log('검증 실패. 다시 작성하세요.')
                    this.isLoading = false;
                }
            },
            checkUserInput() {
                // 한 줄이면 {} 생략 가능
                this.errors = [];
                if (!this.credentials.username) this.errors.push("username 을 입력하세요.")
                if (this.credentials.password.length < 7) this.errors.push("password 는 8자 이상 이어야 합니다.")
                if (!this.errors.length) return true; // 0일 때 true
            },
        }
    }
</script>

<style>

</style>