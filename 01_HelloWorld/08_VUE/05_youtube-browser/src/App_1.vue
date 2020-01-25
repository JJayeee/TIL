// memo 참고, 191111
// 각 파일당 _1 먼저 확인

<template>
<!-- HTML -->
    <div>
        <h1>hi</h1>
        <SearchBar @inputChange="onInputChange"></SearchBar> <!-- step3 -->
        <!-- eventListener의 event를 customizing 할 수 있게 된 것. -->
        <!-- v-on:[자식cpmnt에서 emit하는 이벤트의 이름]="do sth", [이벤트]가 발생하면 "do sth" 하겠다. -->

        <!-- v-bind: 는 줄여서 : -->
        <!-- "videos"가 아래 script의 videos -->
        <VideoList :videos="videos"></VideoList>
        <!-- props 쓰기: step0. bind로 데이터를 넘긴다. -->
            <!-- VideoList에 달았다는 것 자체로 던진 것, 받아보는 것은 VideoList.vue -->
    </div>
</template>


<script>
    import SearchBar from './components/SearchBar'; // << step1 >>
    import VideoList from './components/VideoList';
    import axios from 'axios';

    const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY;
    // console.log(API_KEY)

    // new Vue({}) 와 동일
    export default { // App.vue, 이  파일을 import 시, {}를 내보내겠다.
        // 컴포넌트 만들면 해야 할 일
            // 0. 이름 적기
        name: 'App',
            // 1. import 하기
            // 2. 등록: 부모들은 자식 컴포넌트를 알고 있어야 한다. 
        components: {
            SearchBar, // SearchBar: SearchBar, syntatic sugar
            VideoList,
            // 3. 화면에 보여주기 -> template
        },
        data() {  // component에서 data property는 return 함수로 만들어 주어야 한다.
            return {
                videos: [], // {} 에서 바꿔줌
            }
        },
        methods: {  // https://developers.google.com/youtube/v3/docs/search
            onInputChange (inputValue) {  // 보내준 e.target.value가 자동으로 넘어옴 
                // console.log(inputValue);
                axios.get('https://www.googleapis.com/youtube/v3/search', {  // 바뀔 때 마다 요청을 보내겠다.
                    params: {
                        key: API_KEY,
                        type: 'video',
                        part: 'snippet',
                        q: inputValue, // 실제로 검색할 값
                    }
                })
                .then(res => this.videos = res.data.items) // console.log(res.data.items)
            },
        },
    } 

</script>


<style>
    
</style>