<template>
    <div v-if="video" class="col-lg-8">
        <div class="embed-responsive embed-responsive-16by9">
            <iframe :src="videoUrl" frameborder="0" class="embed-responsive-item"></iframe>
        </div>
        <div class="details">
            <h4 v-html="video.snippet.title"></h4>
            <p>{{ video.snippet.description }}</p>
        </div>
    </div>
</template>


<script>
export default {
    name: 'VideoDetail',
    props: {
        video: Object,
        // [Vue warn]: Error in render: "TypeError: Cannot read property 'snippet' of null"
        // typeOf null == object라 여기는 통과했으나 error
    },
    computed: {
        videoUrl () {
            return `https://www.youtube.com/embed/${this.video.id.videoId}`
        }
    },
}
</script>


<style scoped>
    /* template은 수정해도 자동 반영, CSS는 새로고침을 해야 한다. */
    .details {
        /* background-color: #FF0000; */
        margin-top: 10px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    /* 
    h4 {
        color: #FFFFFF;
    } */
</style>