let taskArr = document.querySelectorAll('.task');

const modalWindow = document.querySelector('#modal');const modalWindowCloseBtn = document.querySelector('#close-modal');

const addTaskBtn = document.querySelector('#add-task');
const clearAllTaskBtn = document.querySelector('#clear-tasks');

const modalAddTaskBtn = document.querySelector('#modal__add_task');
const modalAddTaskInput = document.querySelector('#modal__add_task_input');

const taskContainer = document.querySelector('#task-container');


function styleDisplayToggler(item, style) {
    item.style.display = `${style}`;
}

function saveData() {
    localStorage.setItem('data', taskContainer.innerHTML);
}

function showData() {
    let data = localStorage.getItem('data');
    taskContainer.innerHTML = data;
}

function addTask() {
    let taskText = modalAddTaskInput.value;
    if (taskText !== null && taskText !== undefined && taskText.length !== 0) {
        let li = document.createElement('li');
        li.innerHTML = taskText;
        taskContainer.appendChild(li);

        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        saveData();
    } else {
        alert("Напишите что-нибудь");
    }
}

addTaskBtn.addEventListener('click', ()=>{
    styleDisplayToggler(modalWindow, 'flex');
    modalAddTaskInput.focus();
});

modalWindowCloseBtn.addEventListener('click', ()=> {
    styleDisplayToggler(modalWindow, 'none');
    modalAddTaskInput.removeEventListener;
});

modalAddTaskInput.addEventListener('keypress', (event)=>{
    if (event.keyCode === 13) {
        event.preventDefault();
        modalAddTaskBtn.click();
    }
});

modalAddTaskBtn.addEventListener('click', (el)=>{
    el.preventDefault();
    addTask();
    modalAddTaskInput.value = '';
    styleDisplayToggler(modalWindow, 'none');
});

clearAllTaskBtn.addEventListener('click', (el)=>{
    el.preventDefault();
    let sure = confirm('Вы уверены?');
    if (sure) {
        localStorage.clear();
        taskContainer.innerHTML = '';
    }
});

taskContainer.addEventListener('click', (el)=>{
    if (el.target.tagName === 'LI') {
        el.target.classList.toggle('checked');
        saveData();
    } else if (el.target.tagName === 'SPAN') {
        el.target.parentElement.remove();
        saveData();
    }
    
});

showData();