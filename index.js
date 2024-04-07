const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

let todos = [];

const addItem = (todo) => {
    if (todo.text !== ''){ //공란일때 등록안되게
    const li = document.createElement('li');
    const button = document.createElement('button');
    const buttonCheck = document.createElement('button'); // 체크 버튼
    const span = document.createElement('span');
    

    span.innerHTML = todo.text;
    buttonCheck.innerHTML = '체크'; // 체크 버튼 추가
    button.innerHTML = '삭제';
    button.addEventListener('click', delItem);//클릭했을때 삭제
    
    li.appendChild(span);//li라는 부모 안에 span이라는 자식 넣어줌
    li.appendChild(button);
    li.appendChild(buttonCheck); // 체크 버튼 추가
    ul.appendChild(li);
    li.id = todo.id; //삭제버튼이 어떤걸 삭제인지 몰라서 넣음

    if (todo.checked) {
        li.classList.add('complete');
    }

    li.addEventListener('click', () => {
        li.classList.toggle('complete');
        // 항목이 체크될 때 해당 상태를 todos 배열에 저장
        todo.checked = !todo.checked;
        save();
    });
    
};
};

const delItem =(event) => {
   const target = event.target.parentElement;

   todos = todos.filter((todo) => todo.id !== parseInt(target.id ));//todo 걸러서
   save();
   target.remove();
};

const save = () => {
    localStorage.setItem('todos',JSON.stringify(todos));//앞에가 키 뒤에가 벨류
};

const handler = (event) => {
    event.preventDefault(); //행위 막아줘서 f12에서 콘솔로그 볼수잇음
    
    const todo = {
        id: Date.now(), //유니크하게 만들려고
        text: input.value,  
    }

    todos.push(todo);
    addItem(todo);

    save();
    input.value = ''; //글자 치면 사라짐
};

const init = () => {
    const userTodos = JSON.parse(localStorage.getItem('todos'));
    if (userTodos) {
    userTodos.forEach((todo) => {
            addItem(todo);
        });
        todos = userTodos;
    }
};

init();
form.addEventListener('submit', handler);