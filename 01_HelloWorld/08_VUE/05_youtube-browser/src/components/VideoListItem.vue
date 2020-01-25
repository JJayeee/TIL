<template>
    <li @click="onVideoClick" class="list-group-item">
        <img :src="thumbnailUrl" class="mr-3" :art="video.snippet.title">
        <!-- art="video.snippet.title" 이라 하면 -->
        <!-- <img data-v-f5f64728="" art="video.title"> 라고 나온다. binding 필요! -->
        <div id="media-body">
            <span v-html="video.snippet.title"></span>
            <!-- 인코딩 안 되던 문자들이 인코딩 된다. parsing 해주는 것! -->
            <!-- {{}}: innerText | v-html: innerHTML -->
        </div>
    </li>
</template>


<script>
export default {
    name: 'VideoListItem',
    props: {
        video: Object,
    },
    methods: {
        onVideoClick () {
            this.$emit('videoSelect', this.video) // 객체 자체를 올려 보냄
        }
    },
    // <img :src="video.snippet.thumbnails.default.url"> : 좋은 선택이 아님.
    computed: {  // props는 고정되어 있음. data를 정제하기 위해서 computed를 활용
        thumbnailUrl () {
            return this.video.snippet.thumbnails.default.url
        }
    },
}
</script>


<style scoped>
    li {
        display: flex;
        cursor: pointer;
    }

    /* 마우스가 올라갔을 때 */
    li:hover {
        background-color: whitesmoke;
    }
    
</style>