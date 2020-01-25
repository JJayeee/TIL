const inputArea = document.querySelector('#js-user-input');
const button = document.querySelector('#js-go');
const resultArea = document.querySelector('#js-result-area');

button.addEventListener('click', () => {
    const inputValue = inputArea.value;
    searchAndPush(inputValue);
});

button.addEventListener('keypress', (event) => {
    if (event.which === 13) {
        const inputValue = inputArea.value;
        searchAndPush(inputValue);
    }
});


const searchAndPush = (keyword) => {
    const API_KEY = 'R';
    const inputCount = document.querySelector('#js-image-count').value;
    // console.log(inputCount);
    const URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=${inputCount}&offset=0&rating=G&lang=en`
    const AJAX = new XMLHttpRequest();
    AJAX.open('GET', URL);
    AJAX.send();
    AJAX.addEventListener('load', (res) => {
        const giphyData = JSON.parse(res.target.response);
        const dataSet = giphyData.data;
        resultArea.innerHTML = null;
        inputArea.innerHTML = null;
        for (const data of dataSet) {
            pushToDOM(data.images.fixed_height.url);
        }
    });

    const pushToDOM = (imageURL) => {
        const imageTag = document.createElement('img');
        imageTag.src = imageURL;
        imageTag.alt = 'giphy-image';
        resultArea.appendChild(imageTag);
    }

}