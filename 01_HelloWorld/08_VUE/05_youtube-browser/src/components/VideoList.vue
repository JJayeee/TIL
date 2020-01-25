<template>
    <ul class="col-lg-4 list-group"> 
        <VideoListItem 
            v-for="video in videos" 
            :key="video.etag"
            :video="video"
            @videoSelect="onVideoSelect"
        > <!-- @videoSelect="" >> videoSelect를 듣고 있을 거야, 그러면 "" 실행 -->
        </VideoListItem>
    </ul>
</template>


<script>
import VideoListItem from './VideoListItem'; 

export default {
    name: "VideoList",
    props: { 
        videos: Array, 
    },
    components: {
        VideoListItem,
    },
    methods: {
        onVideoSelect (video) {
            this.$emit('videoSelect', video) 
            // 컴포넌트 간 전혀 영향을 주지 않음
            // 각자 독립영역이므로, 똑같은 이름으로 signal을 보내도 된다.
            // 밑에서 올라온 event + value를 그대로 위로 올려 보내는 것.
        }
    }
}
</script>


<style>
    
</style>