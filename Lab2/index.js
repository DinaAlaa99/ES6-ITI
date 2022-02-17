class Todo {
    todoInput = document.getElementById("myInput");
    todoItems = document.getElementById("myUL");

    constructor() {
        this.todos = [];
    }

    
    addTodo(item) {
        if (item) {
            const todo = {
                id: Date.now(),
                name: item,
                done: false
            };

            this.todos.push(todo);

            Storage.addToLocalStorage(this.todos);
            this.todoInput.value = "";
        } else {
            alert("You must write something to add");
        }
    }

    displayTodos() {
        this.todoItems.innerText = "";

        this.todos.forEach(item => {

            let li = document.createElement('li');

            li.setAttribute('data-key', item.id);
            if (item.done) {
                li.classList.add('checked');
            }

            li.innerText = `${item.name}`; 
            this.todoItems.append(li);

        });
        Buttons.appendCheck();
        Buttons.appendDelete();
    }

}

let todo = new Todo();

class Storage {
    static addToLocalStorage(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
        todo.displayTodos();
    }

    static getFromLocalStorage() {
        const reference = localStorage.getItem('todos');
        if (reference) {
            todo.todos = JSON.parse(reference);
            todo.displayTodos();
        }
    }
}

class Buttons {
    static appendDelete() {
        let myNodelist = document.getElementsByTagName("LI");
        for (let i = 0; i < myNodelist.length; i++) {
            let span = this.makeDeleteButton();
            myNodelist[i].appendChild(span);
        }
    }

    static appendCheck() {
        let myNodelist = document.getElementsByTagName("LI");
        for (let i = 0; i < myNodelist.length; i++) {
            let span = this.makeCheckButton();
            myNodelist[i].appendChild(span);
        }
    }

    static makeDeleteButton() {
        let span = document.createElement("SPAN");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        return span;
    }

    static makeCheckButton() {
        let span = document.createElement("SPAN");
        let txt = document.createTextNode("\u2713");
        span.className = "check";
        span.appendChild(txt);
        return span;
    }
    static deleteItem(id) {
        todo.todos = todo.todos.filter(function (item) {
            return item.id != id;
        });
        Storage.addToLocalStorage(todo.todos);
    }

    static checkItem(id) {
        todo.todos.forEach(function (item) {
            if (item.id == id) {
                item.done = !item.done;
            }
        });
        Storage.addToLocalStorage(todo.todos);
    }
}

Storage.getFromLocalStorage();
newElement = () => todo.addTodo(todo.todoInput.value);


document.getElementById('myInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        newElement();
    }
});


todo.todoItems.addEventListener('click', function (event) {
    
    if (event.target.classList.contains('check')) {
        Buttons.checkItem(event.target.parentElement.getAttribute('data-key'));
    }
    if (event.target.classList.contains('close')) {
        Buttons.deleteItem(event.target.parentElement.getAttribute('data-key'));
    }
});