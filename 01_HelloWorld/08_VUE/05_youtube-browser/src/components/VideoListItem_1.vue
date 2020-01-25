<template>
    <!-- <div>
        Video List Item
    </div> -->
    <li>
        {{ video.snippet.title }}
    </li>
</template>


<script>
export default {
    name: 'VideoListItem',
    props: {  // object로 선언
        video: Object,
    },
}
</script>


<style>
    
</style>