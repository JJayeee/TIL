<template>
    <div>
        <p>VideoList</p>
        <ul>
            <VideoListItem 
                v-for="video in videos" 
                :key="video.etag"
                :video="video"
            > <!-- v-for의 video. for문이 최우선이므로 각각의 videolistitem 에 접근-->

            </VideoListItem>
        </ul>

        <!-- {{ videos.length }} --> <!-- etag 인터넷 소스에서 지문 같은 것 -->
        <!-- <li v-for="video in videos" :key="video.etag">
            {{ video.snippet.title }}
        </li> -->
    </div>
</template>


<script>
import VideoListItem from './VideoListItem';  // 위치 주의!

export default {
    name: "VideoList",
    // <!-- props 쓰기: step1. props 가 넘어온다고 명시한다. -->
    // props 는 data와 똑같이 쓸 수 있다. props === 물려받은 data
    // data() { return videos: this.videos }와 같은 setting 할 것이 X!!, props 그 자체로 쓰면 됨
    
    // props: ['videos'],  
    // 여러개 넘어올 수 있기 때문에 []

    // 데이터가 넘어오거나 할 때에는 데이터의 유효성 검사가 요구된다. 값이 변하거나, 다른 것이 올 수도 있으므로
    props: { // 배열로 써도 되지만, 객체를 매우 권장한다.
        videos: Array, // Validation. videos 가 Array 인지 먼저 확인.
        // [Vue warn]: Invalid prop: type check failed for prop "videos". Expected Array, got Object 
    },
    components: {
        VideoListItem,
    },
}
</script>


<style>
    
</style>