let taskArr = document.querySelectorAll('.task');

const modalWindow = document.querySelector('#modal');const modalWindowCloseBtn = document.querySelector('#close-modal');

const addTaskBtn = document.querySelector('#add-task');
const clearAllTaskBtn = document.querySelector('#clear-tasks');

const modalAddTaskBtn = document.querySelector('#modal__add_task');
const modalAddTaskInput = document.querySelector('#modal__add_task_input');

const taskContainer = document.querySelector('#task-container');


function taskDivGenerator() {
    taskContainer.innerHTML = '';
    let counter = 1;
    for(let i=0; i<=localStorage.length; i++) {
        if (localStorage.getItem(`task${i}`) !== null) {
            let taskDiv = document.createElement('div');
            taskContainer.appendChild(taskDiv);
            taskDiv.classList.add('task');
            taskDiv.innerHTML = `<div class="task-condition">
                                    <span class="material-symbols-outlined">
                                        radio_button_unchecked
                                        </span>
                                </div>
                                <div class="task-text">
                                    <p>${counter}. ${localStorage.getItem(`task${i}`)}</p>
                                </div>
                                <div class="task-favorite">
                                    <span class="material-symbols-outlined">
                                        star
                                        </span>
                                </div>

                                <div class="task-delete">
                                    <span class="material-symbols-outlined">
                                        delete
                                        </span>
                                </div>`;
            ++counter;
        }
    }
    let deleteBtnArr = document.querySelectorAll('.task-delete');
    deleteBtnArr.forEach((el)=>{
        el.addEventListener('click', ()=>{
            let index = [...deleteBtnArr].indexOf(el);
            localStorage.removeItem(`task${index}`);
            taskDivGenerator();
        });
    })
}

function styleDisplayToggler(item, style) {
    item.style.display = `${style}`;
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
    let taskText = modalAddTaskInput.value;
    if (taskText !== null || taskText !== undefined || taskText.length !== 0) {
        let taskCounter = localStorage.length;
        localStorage.setItem(`task${taskCounter}`, taskText);
        taskDivGenerator();
        modalAddTaskInput.value = '';
        styleDisplayToggler(modalWindow, 'none');
    }
});

clearAllTaskBtn.addEventListener('click', (el)=>{
    el.preventDefault();
    let sure = confirm('Вы уверены?');
    if (sure) {
        localStorage.clear();
        taskDivGenerator();
    }
});

taskDivGenerator();