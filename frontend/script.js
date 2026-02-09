const API_URL = "http://localhost:3000/todos";

// ✅ Load todos when page opens
window.onload = loadTodos;

// ✅ Fetch all todos
function loadTodos() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => displayTodos(data));
}

// ✅ Add new todo
function addTodo() {
  const input = document.getElementById("todoInput");
  const todoText = input.value.trim();

  if (todoText === "") return;

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ task: todoText }) // ✅ Correct key
  })
    .then(res => res.json())
    .then(() => {
      input.value = "";
      loadTodos(); // ✅ Reload all todos
    });
}

// ✅ Display todos
function displayTodos(todos) {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.textContent = todo.task; // ✅ Show task text
    list.appendChild(li);
  });
}
