const todoEnter = document.querySelector('.input-form');
const todoVal = document.querySelector('.enter-todo');
const allTodos = document.querySelector('.todo-list');

let todos = [];

todoEnter.addEventListener('submit', function(event) {
  event.preventDefault();
  addTodo(todoVal.value);
});

function addTodo(item) {
  if (item !== '') {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };

    todos.push(todo);
    addToLocalStorage(todos);

    todoVal.value = '';
  }
}

function renderTodos(todos) {
  allTodos.innerHTML = '';

  todos.forEach(function(item) {
    const completed = item.completed ? 'completed': null;

    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);
    if (item.completed === true) {
      li.classList.add('completed');
    }

    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${completed}>
      ${item.name}
      <button class="remove-todo">X</button>
    `;
    allTodos.append(li);
  });

}

function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

function toggle(id) {
  todos.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

function deleteTodo(id) {
  todos = todos.filter(function(item) {
    return item.id != id;
  });
  addToLocalStorage(todos);
}

getFromLocalStorage();

allTodos.addEventListener('click', function(event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.classList.contains('remove-todo')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});