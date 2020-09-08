// TODO: add local storage
// TODO: api to get and set items

// Init items
let inputElement = document.getElementById("input");
let ulElem = document.getElementById("list");
let actionPanel1 = document.getElementById("actionPanel1");
let actionPanel2 = document.getElementById("actionPanel2");
let todoList = [];

actionPanel2.style.display = "none";

// Listen for entering new todo
inputElement.addEventListener("keydown", (event) => {
  if (
    (event.key == "Enter" || event.keyCode == 13) &&
    inputElement.value !== ""
  ) {
    todoList.unshift({
      content: inputElement.value,
      done: false,
    });
    console.log(todoList);
    inputElement.value = "";

    upgradeView();
  }
});

// Update function
function upgradeView() {
  for (let i = 0; i < todoList.length; i++) {
    localStorage.getItem(todoList[i].content, todoList[i].done);
  }

  ulElem.innerHTML = "";

  for (let i = 0; i < todoList.length; i++) {
    const todoItem = todoList[i];

    let liElem = document.createElement("li");
    let divElem = document.createElement("div");
    let checkboxElem = document.createElement("input");
    let labelElem = document.createElement("label");
    let buttonDoneElem = document.createElement("button");
    let buttonRemElem = document.createElement("button");

    liElem.className = "list-group-item";
    ulElem.append(liElem);

    divElem.className = "form-group form-check item";
    liElem.append(divElem);

    divElem.append(checkboxElem);
    checkboxElem.type = "checkbox";
    checkboxElem.className = "form-check-input";
    checkboxElem.id = "todoItem" + i;
    checkboxElem.checked = todoItem.selected;
    checkboxElem.addEventListener("change", () => {
      todoItem.selected = checkboxElem.checked;
      upgradeView();
    });

    divElem.append(labelElem);
    labelElem.className = "form-check-label";
    if (todoItem.done) {
      labelElem.className += " todoDone";
    }
    labelElem.setAttribute("for", "todoItem" + i);
    labelElem.innerText = todoItem.content;

    if (todoItem.done == false) {
      divElem.append(buttonDoneElem);
      buttonDoneElem.className = "btn btn-outline-primary";
      buttonDoneElem.type = "button";
      buttonDoneElem.innerText = "Done";
      buttonDoneElem.style = "float: right";

      buttonDoneElem.addEventListener("click", () => {
        todoItem.done = !todoItem.done;
        upgradeView();
      });
    } else {
      divElem.append(buttonRemElem);
      buttonRemElem.className = "btn btn-outline-danger";
      buttonRemElem.type = "button";
      buttonRemElem.innerText = "Remove";
      buttonRemElem.style = "float: right";

      buttonRemElem.addEventListener("click", () => {
        todoList = todoList.filter(
          (currentTodoItem) => currentTodoItem !== todoItem
        );
        upgradeView();
      });
    }
  }
  let someSelected = todoList.some((todoItem) => todoItem.selected);
  if (someSelected) {
    actionPanel2.style.display = "block";
  } else {
    actionPanel2.style.display = "none";
  }
}

// Done function
document.getElementById("doneAction").addEventListener("click", () => {
  for (let todoItem of todoList) {
    if (todoItem.selected) {
      todoItem.done = true;
      todoItem.selected = false;
    }
  }
  upgradeView();
});

// Restore todo function
document.getElementById("restoreAction").addEventListener("click", () => {
  for (let todoItem of todoList) {
    if (todoItem.selected) {
      todoItem.done = false;
      todoItem.selected = false;
    }
  }
  upgradeView();
});

// Remove todo function
document.getElementById("removeAction").addEventListener("click", () => {
  todoList = todoList.filter((todoItem) => !todoItem.selected);
  upgradeView();
});

// Select all todos function
document.getElementById("selectAll").addEventListener("click", () => {
  for (let todoItem of todoList) {
    todoItem.selected = true;
  }
  upgradeView();
});
