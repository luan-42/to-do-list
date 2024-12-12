import db from './database.js';

function createCard(task) {
    const card = document.createElement("div");
    card.className = "flex gap-2"
    card.innerHTML = `
    <input type="checkbox" class="w-[28px] accent-slate-400">
    <input type="text" class="bg-slate-400 w-full text-white p-2 rounded-md text-left focus:outline-none">
    <button class="bg-slate-400 p-2 rounded-md text-white"><img src="./delete.svg"></button>
    `;

    const checkbox = card.querySelector("input[type=checkbox]");
    checkbox.checked = task.isCompleted;

    const title = card.querySelector("input[type=text]");
    title.value = task.title;

    if (task.isCompleted) {
        title.classList.add("line-through");
    }

    const removeButton = card.querySelector("button");
    const updateTask = () => {
        db.update(task.id, {title: title.value, isCompleted: checkbox.checked});
    } 

    checkbox.addEventListener("click", () => {
        updateTask();
        loadTasks();
    });
    title.addEventListener("change", () => {
        if (!title.value.trim()) {
            alert("Preencha o nome da tarefa.");
            loadTasks();
        } else {
            updateTask();
        }
    });
    removeButton.addEventListener("click", () => {
        db.remove(task.id);
        loadTasks();
    });

    return card;
}

function loadTasks(tasksList = db.load()) {
    const tasks = document.querySelector("#tasks");
    tasks.innerHTML = "";

    tasksList.forEach((task) => {
        const cardTask = createCard(task);
        tasks.appendChild(cardTask);
    });
}

const inputTask = document.querySelector("#addTask > input");
const AddButton = document.querySelector("#addTask > button");

function addTask() {
    if (!inputTask.value.trim()) {
        inputTask.value = "";
        return alert("Preencha o nome da tarefa.");
    }

    db.add({title: inputTask.value, isCompleted:false});
    inputTask.value = "";
    loadTasks();
}

inputTask.addEventListener("keydown", (e) => {
    if (e.code === "Enter") addTask();
})

AddButton.addEventListener("click", addTask);
loadTasks();