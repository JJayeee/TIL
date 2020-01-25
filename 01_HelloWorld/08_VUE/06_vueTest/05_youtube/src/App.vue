<template>
    <div class="container">
        <SearchBar @inputChange="onInputChange"></SearchBar>

        <div class="row">
            <VideoDetail :video="selectedVideo">
            </VideoDetail>

            <VideoList :videos="videos" @videoSelect="onVideoSelect">
            </VideoList>
        </div>
    </div>
</template>

<script>
    import SearchBar from './components/SearchBar';
    import VideoList from './components/VideoList';
    import VideoDetail from './components/VideoDetail';
    import axios from 'axios';
    const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY;

    export default {
        name: 'App',
        components: {
            SearchBar,
            VideoList,
            VideoDetail,
        },
        data() {
            return {
                videos: [],
                selectedVideo: null,
            }
        },
        methods: {
            onInputChange(inputValue) {
                axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        key: API_KEY,
                        type: 'video',
                        part: 'snippet',
                        q: inputValue,
                    }
                })
                .then(res => this.videos = res.data.items)
            },
            onVideoSelect (video) {
                this.selectedVideo = video;
            }
        },
    }
</script>

<style>
    
</style>