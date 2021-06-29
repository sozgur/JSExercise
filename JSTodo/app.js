const todoList = document.querySelector("#todo-list");
const form = document.querySelector("#add-todo");
const input = document.querySelector("#new-todo");

let todoCache = JSON.parse(localStorage.getItem("todos")) || {};

/////// Check Local Storage ///////
for (const [key, value] of Object.entries(todoCache)) {
    console.log(key, value);
    const todo = createTodoList(key, value["task"]);
    toggleTodoList(todo, key);
}

/////////// Functions ////////////
function createTodoList(todoID, text) {
    const newTodo = document.createElement("dt");
    const newSpan = document.createElement("span");
    const newButton = document.createElement("button");
    newSpan.innerText = text;
    newButton.innerText = "Remove";
    newTodo.setAttribute("data-id", todoID);

    newTodo.appendChild(newSpan);
    newTodo.appendChild(newButton);
    todoList.appendChild(newTodo);
    return newTodo;
}

function toggleTodoList(element, todoID) {
    let isCompleted = todoCache[todoID]["isCompleted"];

    if (isCompleted) {
        element.classList.add("checked");
    } else {
        element.classList.remove("checked");
    }
}

function createOrUpdateTodoCache(todoCache) {
    localStorage.setItem("todos", JSON.stringify(todoCache));
}

//////////// Event Listeners ///////////
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const lastID = parseInt(localStorage.getItem("lastID")) || 0;
    const newTodoID = lastID + 1;
    console.log(lastID, newTodoID);
    createTodoList(newTodoID, input.value);

    const data = { isCompleted: false, task: input.value };
    todoCache[newTodoID] = data;
    localStorage.setItem("lastID", newTodoID);
    createOrUpdateTodoCache(todoCache);

    input.value = "";
});

todoList.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
        e.target.parentElement.classList.toggle("checked");
        //Updata Cache
        let isCompleted = todoCache[
            e.target.parentElement.getAttribute("data-id")
        ]["isCompleted"]
            ? false
            : true;

        todoCache[e.target.parentElement.getAttribute("data-id")][
            "isCompleted"
        ] = isCompleted;
        createOrUpdateTodoCache(todoCache);
    } else if (e.target.tagName === "BUTTON") {
        //Update Cache
        delete todoCache[e.target.parentElement.getAttribute("data-id")];
        createOrUpdateTodoCache(todoCache);
        const lastID = parseInt(localStorage.getItem("lastID")) - 1;
        localStorage.setItem("lastID", lastID);
        //Remove Todo
        e.target.parentElement.remove();
    }
});
