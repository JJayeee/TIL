// JS 답게_초기화
function init() {
    // data 받기
    const button = document.querySelector('#js-todo-button');
    const inputArea = document.querySelector('#js-todo-input');
    const reverseBtn = document.querySelector('#js-reverse-button'); // id 기반 뽑기

    reverseBtn.addEventListener('click', () => {
        const todoArea = document.querySelector('#js-todo-area');
        const todos = Array.from(document.querySelectorAll('.js-card')); // class 기반 뽑기
        // 배열로 바꿔줘야 reverse 가 가능
        // while (todoArea.firstChild) {
        //     todoArea.removeChild(todoArea.firstChild);
        // }
        todoArea.innerHTML = null;
        todos.reverse().forEach((todo) => {
            todoArea.appendChild(todo);
        })
    });

    // const inputText = document.querySelector('#js-todo-input').value;
    // 위와 같이 위치하게 되면 스크립트가 최초 실행 될 때 잡힌 값으로 고정이 되어 버린다. 
    button.addEventListener('click', () => {
        // const inputText = document.querySelector('#js-todo-input').value;
        // createTodoCard(inputText);
        const inputArea = document.querySelector('#js-todo-input'); // area scope라서 ㄱㅊ
        createTodoCard(inputArea.value);
        inputArea.value = null; // 카드 생성 후 input란을 비우기 위해서.
    });

    inputArea.addEventListener('keydown', (e) => {
        if (e.which === 13) {
            const inputArea = document.querySelector('#js-todo-input');
            createTodoCard(inputArea.value);
            inputArea.value = null;
        }
    });


    // Card 만들기
    // completed => default argument 
    const createTodoCard = (content, completed = false) => {
        const cardArea = document.querySelector('#js-todo-area');

        const todo = document.createElement('div');
        todo.className = 'ui segment js-card'; // class 지정

        const wrapper = document.createElement('div');
        wrapper.className = 'ui checkbox'

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox'; // type 지정 될까 ?? -> 된다.
        checkbox.addEventListener('click', () => {

            if (checkbox.checked) {
                label.classList.add('done');
                todo.classList.add('secondary');
            } else {
                label.classList.remove('done');
                todo.classList.remove('secondary');
            }
            // todo.classList.add('secondary');
            // label.classList.add('done'); // 실행되는 시점은 label이 이미 등장한 시점이기 때문에 문제 X
        })

        const label = document.createElement('label');
        label.innerHTML = content;

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'icon close custom-icon';
        deleteIcon.addEventListener('click', () => {
            cardArea.removeChild(todo); // 그 순간 말하고 있는 그 todo만 의미한다는 것
        })

        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);
        todo.appendChild(wrapper);
        todo.appendChild(deleteIcon);
        cardArea.appendChild(todo);
    }
}

init();