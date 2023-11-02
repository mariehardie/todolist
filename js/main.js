//get input && button

let addMessage = document.querySelector('.message');
let addButton = document.querySelector('.add');
let todo = document.querySelector('.todo');
let todoList = [];


//есть ли у нас данные с ключом todo и подтягивать их на страницу(если обновляем страницу, то данные на странице исчезают, а в локалсторедж остаются, мы их будем оттуда подтягивать)
if (localStorage.getItem('todo')) {
  todoList = JSON.parse(localStorage.getItem('todo'));
  displayMessages();
}

addButton.addEventListener('click', function() {
 if(!addMessage.value) return; 
  let newTodo = {
    todo: addMessage.value,
    checked: false,
    important:false
  } //every new task
  
  todoList.push(newTodo);
  displayMessages();
  localStorage.setItem('todo', JSON.stringify(todoList));//для хранения данных, массив преобразовываем в строку JSON
  addMessage.value = '';
});

function displayMessages() {
  let displayMessage = '';
  if (todoList.length === 0) todo.innerHTML = '';
  todoList.forEach((item,i) => {
    //не присваивать дела необходимо, а прибавлять
    //во время перебора будем проверять checked:true или false и, тогда //добавлять input параметр checked
    displayMessage += `
   <li>
   <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
   <label for='item_${i}' class='${item.important ? 'important' : ''}'>${item.todo}</label> 
   </li>
    `;
    todo.innerHTML = displayMessage;
  });
}

todo.addEventListener('change', function(event){
  let idInput = event.target.getAttribute('id');
  let forLabel = todo.querySelector('[for='+idInput+']');
  let valueLabel = forLabel.innerHTML;

  todoList.forEach(function(item) {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  });
});

todo.addEventListener('contextmenu', event => {
  event.preventDefault();
  todoList.forEach((item, i) => {
    if (item.todo === event.target.innerHTML) {
      if (event.ctrlKey || event.metaKey) {
       todoList.splice(i, 1); 
      } else {
      item.important = !item.important;
      }
      displayMessages();
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  });  
});



