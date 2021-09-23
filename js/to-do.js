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
      checked: false
    };

    todos.push(todo);
    addToLocalStorage(todos);

    todoVal.value = '';
  }
}

function renderTodos(todos) {
  allTodos.innerHTML = '';

  todos.forEach(function(item) {
    const checked = item.checked ? 'checked': null;

    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);
    if (item.checked === true) {
      li.classList.add('checked');
    }

    li.innerHTML = `
      <input class="checkbox" type="checkbox" ${checked}>
      ${item.name}
      <button type="button" class="btn btn-danger remove-todo"><i class="fas fa-times"></i></button>
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
      item.checked = !item.checked;
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