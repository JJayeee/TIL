const likeButtons = document.querySelectorAll('.js-like-button');

likeButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', function(event){        
        // console.log(event)
        // console.log(event.target.dataset.id)
        const URL = `/insta/${event.target.dataset.id}/like/`;
        // class="{% if is_like %}fas{% else %}far{% endif %} fa-heart js-like-button" 

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        axios.post(URL)
            // .then(res => console.log(res.data)) 
            // html 전체: url -> views -> redirect(html)이기 때문에
            .then((res) => {
                if (res.data.success) {
                    event.target.classList.remove('far');
                    event.target.classList.add('fas')
                }
                else {
                    event.target.classList.remove('fas');
                    event.target.classList.add('far')
                }
            })
    })
});


// for (likeButton of likeButtons) {
//     console.log(likeButton);
// }


/* 
[06/Nov/2019 09:46:02] "GET /insta/2/like/ HTTP/1.1" 302 0
[06/Nov/2019 09:46:02] "GET /insta/2/ HTTP/1.1" 200 3779
302 는 에러가 아니라 Redirect 입니다.
POST 로 요청했는데 서버가 "자원이 다른 곳으로 일시적으로 이동되었으니 그 곳으로 가라" 라고 응답한 것이고
클라이언트인 브라우저는 그것에 충실하게 "그 다른 곳을" GET 방식으로 이동한 것입니다.
고로 이건 서버쪽의 셋팅이나 다른 어떤 문제이지 버그나 예외가 발생한 것이 아닙니다.
*/