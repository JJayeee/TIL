// 1. input tag 안의 값(value)을 잡는다. 


//(주석)
// 다음 아래는 필요가 없어 진다. 
// const input = document.querySelector('#js-userinput').value;
// // query값 확인해 볼 것. 이후에 value를 달았음.
// console.log(input);



// 2. button 에 'click'이 일어났을 때, input 에 Enter키를 쳤을 때, 1에서 잡은 값을 요청으로 보낸다.
// [무엇].addEventlistner([언제], [어떻게])
const button = document.querySelector('#js-go');
const inputArea = document.querySelector('#js-userinput');
const resultArea = document.querySelector('#js-result-area');

// (주석)
// const whenClicked = function () {
//     const inputValue = inputArea.value
//     console.log('클릭!')
// };
// // 변수에 함수를 담는 것이 항상 좋은 것은 아니다. 대부분이 좋긴 함.
// // ary = [1, 2, 3]
// // arr.reverse()
// // r_ary = ary
// // r_ary.pop()
// // ... 이처럼 다 변수에 담지 않듯, 로직이 변수를 차지해야 할 필요가 있는가에 따라서 담는 것
// button.addEventListener('click', whenClicked);



// 함수를 실행하는 시점에 어떠한 인자를 넘기고 있다. 
inputArea.addEventListener('keypress', function (event) {
    // console.log('꾸욱');
    // console.log(event);
    // console.log(event.key, event.which);
    if (event.which === 13) {
        const inputValue = inputArea.value;
        console.log(inputValue);
        // pushToDOM(inputValue);
        // inputValue 로 Giphy API 에 요청 보내서 받으면 끝!
        searchAndPush(inputValue);
    }
    // 입력하면 바로 갱신되는거 나중에 확인하기 (lab))
});


button.addEventListener('click', () => {
    const inputValue = inputArea.value;
    // resultArea.innerHTML += inputValue;
    // pushToDOM(inputValue);
    searchAndPush(inputValue);
});


const searchAndPush = (keyword) => {
    const API_KEY = 'R';
    const inputCount = document.querySelector('#js-image-count').value; // type은 str
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=${inputCount}&offset=0&rating=G&lang=en`
    
    const AJAX = new XMLHttpRequest(); 
    AJAX.open('GET', url); 
    AJAX.send(); 
    // call back 함수(인자로 들어가는 함수)
    AJAX.addEventListener('load', (answer) => {
        const res = answer.target.response;
        const giphyData = JSON.parse(res);
        const dataSet = giphyData.data;
        // 왜 [0] 안 해도 되지?
        resultArea.innerHTML = null;  // page 비우기
        inputArea.innerHTML = null;
        for (const data of dataSet) {
            pushToDOM(data.images.fixed_height.url);
        }
        // resultArea.innerHTML += giphyData.data[0].images.downsized.url;
    });

    const pushToDOM = (imageUrl) => {
        const imageTag = document.createElement('img');
        imageTag.src = imageUrl;
        imageTag.alt = 'giphy-image';
        imageTag.classList.add('container-image');

        resultArea.appendChild(imageTag);
        
        // 하드코딩 innerHTML -> appendChild
        // resultArea.innerHTML += `<img src="${imageUrl}" class="container-image">`;
    }
}




// 아래는 최종적으로 위의 const searchAndPush 에 합쳐짐

// 3. Giphy API 에서 넘겨준 Data 를 index.html 에서 보여준다.
const pushToDOM_ex = (data) => {
    // 2-2. 1에서 잡은 값을 요청으로 보내서 => 응답을 받아서 화면에 보내준다
    resultArea.innerHTML += data;   
}

const sendAjaxReq_ex = () => {
    console.log('시작');
    const AJAX = new XMLHttpRequest(); // 요청 준비
    AJAX.open('GET', url); // 요청 셋팅
    
    console.log('보낸다');
    AJAX.send(); // 요청 보내기 
    
    // const response = AJAX.response;
    // console.log('응답: ' + response)
    // 응답에 아무 것도 없음 => python처럼 기다려주지 않고 각 줄이 동시 실행 되어서 그렇다.
    // non blocking한 세상이라, 코드 수정해 주어야 함
    // const giphyData = JSON.parse(response);
    // console.log(giphyData);
    // 위에가 오류 난다. 코드 수정해 주어야 한다.

    AJAX.addEventListener('load', function (event) {
        // console.log(event);
        // console.log(event.target);
        const res = event.target.response;
        const giphyData = JSON.parse(res);
        console.log(giphyData);
    })
    console.log('끝');
    // 끝 하고 로딩 완료 하면 함수 실행해서 consol log가 나오고 있음.
}

const sendAjaxReq_refac = () => {
    const AJAX = new XMLHttpRequest(); 
    AJAX.open('GET', url); 
    AJAX.send(); 

    AJAX.addEventListener('load', (event) => {
        const res = event.target.response;
        const giphyData = JSON.parse(res);
        console.log(giphyData);
    })
}


