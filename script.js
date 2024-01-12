//Элементы модального окна
const modalWindow = document.querySelector('#modal');
const modalWindowCloseBtn = document.querySelector('#close-modal');
const modalAddTaskBtn = document.querySelector('#modal__add_task');
const modalAddTaskInput = document.querySelector('#modal__add_task_input');

//Кнопки добавления и удаления задач
const addTaskBtn = document.querySelector('#add-task');
const clearAllTaskBtn = document.querySelector('#clear-tasks');

//Контейнер задач
const taskContainer = document.querySelector('#task-container');


//Включение и выключение модального окна
function styleDisplayToggler(item, style) {
    item.style.display = `${style}`;
}

//Сохранение данных в Локальном хранилище
function saveData() {
    localStorage.setItem('data', taskContainer.innerHTML);
}

//Отображение данных из Локального хранилища
function showData() {
    let data = localStorage.getItem('data');
    taskContainer.innerHTML = data;
}

//Функция добавления элемента в список
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

//Всплывающее окно по нажатию на кнопку "Создать задачу"
addTaskBtn.addEventListener('click', ()=>{
    styleDisplayToggler(modalWindow, 'flex');
    //Фокус сразу на ввод текста
    modalAddTaskInput.focus();
});

//Закрытие всплывающего окна
modalWindowCloseBtn.addEventListener('click', ()=> {
    styleDisplayToggler(modalWindow, 'none');
    modalAddTaskInput.removeEventListener;
});

//Добавление задачи по нажатию кнопки Enter
modalAddTaskInput.addEventListener('keypress', (event)=>{
    if (event.keyCode === 13) {
        event.preventDefault();
        modalAddTaskBtn.click();
    }
});

//Кнопка "Создать задачу" во всплывающем окне
modalAddTaskBtn.addEventListener('click', (el)=>{
    el.preventDefault();
    addTask();
    modalAddTaskInput.value = '';
    styleDisplayToggler(modalWindow, 'none');
});

//Кнопка "Очистить задачи"
clearAllTaskBtn.addEventListener('click', (el)=>{
    el.preventDefault();
    let sure = confirm('Вы уверены?');
    if (sure) {
        localStorage.clear();
        taskContainer.innerHTML = '';
    }
});

//Изменение состояния задачи и удаление её из списка
taskContainer.addEventListener('click', (el)=>{
    if (el.target.tagName === 'LI') {
        el.target.classList.toggle('checked');
        saveData();
    } else if (el.target.tagName === 'SPAN') {
        el.target.parentElement.remove();
        saveData();
    }
    
});

//Отображение данных из локального хранилища
showData();