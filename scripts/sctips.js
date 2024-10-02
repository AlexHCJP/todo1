const initialData = [
    {
        title: "Начало",
        tasks: []
    },
    {
        title: "В прогрессе",
        tasks: []
    },
    {
        title: "Готово",
        tasks: []
    }
]

document.addEventListener('DOMContentLoaded', () => {
    // Таблицы заданий
    let tables;
    // id задачи, которая будет изменяться
    let updatedId;

    // Изменение задание
    const putTaskAction = (text) => {
        tables = tables.map(table => {
            table.tasks = table.tasks.map(task => {
                if(task.id === updatedId) {
                    task.text = text;
                }
                return task;
            });
            return table;
        });
        updatedId = null;

        return tables;
    }

    // Создание задания
    const createTaskAction = (text) => {
        tables[0].tasks.push({
            id: Date.now(),
            text
        });
        return tables;
    }

    const onFormAction = (form) => (ev) => {
        // Убираем обычное поведение
        ev.preventDefault();

        // Получаем значение из формы
        const title = new FormData(form).get('title');
        if(!title) return; 

        if(updatedId) {
            putTaskAction(title);
        } else {
            createTaskAction(title);
        }

        updatedId = null;
        return render();    
    }

    const onUpdateTask = (task) => (ev) => {
        updatedId = task.id;
        return render();
    }  

    const onDeleteTask = (task) => (ev) => {
        tables = tables.map((table) => {    
            table.tasks = table.tasks.filter((value) => value.id != task.id);
            return table;
        })
        return render();
    }

    const onNextTask = (task) => (ev) => {
        const taskId = task.id;

        let currentIndex = tables.findIndex(table => table.tasks.find(task => task.id === taskId));
        let nextIndex = currentIndex + 1;
        tables = tables.map((table, index) => {
            if(currentIndex === tables.length - 1) return table;
            if(currentIndex === index) {
                table.tasks = table.tasks.filter(task => task.id !== taskId)
            }
            if(nextIndex === index) {
                table.tasks.push(task)
            };
            return table;
        });
        render();

        return tables;
    }

    const Form = () => {
        const formInput = document.querySelector('#form-input');
        formInput.innerHTML = '';
        formInput.addEventListener('submit', onFormAction(formInput))

        const inputElement = document.createElement('input');
        inputElement.setAttribute('name', 'title');
        inputElement.setAttribute('type', 'text');
        inputElement.className = 'form-control col';
        inputElement.setAttribute('placeholder', "Название задачи");

        let task = getTaskById(updatedId);
        if(task) {
            inputElement.setAttribute('value', task.text);
        }

        const buttonElement = document.createElement('input');
        buttonElement.setAttribute('type', 'submit');
        buttonElement.className = 'btn btn-primary  col mt-2';
        buttonElement.setAttribute('value', task? 'Update' : 'Create');

        formInput.append(inputElement);
        formInput.append(buttonElement);

        return formInput;
    }

    const Tables = (tables) => {
        const tablesElement = document.querySelector('#tables');
        tablesElement.innerHTML = '';

        tables.forEach(table => {
            tablesElement.append(Table(table));
        });

        return tablesElement;
    }

    const Task = (task) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'card';
        
        const taskBodyElement = document.createElement('div');
        taskBodyElement.className = 'card-body';

        const headerElement = document.createElement('p');
        headerElement.innerText = task.text;

        const updateButton = document.createElement('button');
        updateButton.className = 'btn btn-warning';
        updateButton.append(document.createTextNode('Изменить'));
        updateButton.addEventListener('click', onUpdateTask(task));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.addEventListener('click', onDeleteTask(task));

        const icon = document.createElement('img');
        icon.src = 'assets/x.svg';
        deleteButton.append(icon);

        taskBodyElement.append(headerElement);
        taskBodyElement.append(deleteButton);
        taskBodyElement.append(updateButton);
        taskElement.append(taskBodyElement);

        nextTitleTable = tables[tables.findIndex(table => table.tasks.find(el => el.id === task.id)) + 1]?.title ?? null;
        if(nextTitleTable) {
            let nextButton = document.createElement('button');
            nextButton.classList.add('btn', 'btn-primary');
            nextButton.appendChild(document.createTextNode(nextTitleTable));
            nextButton.addEventListener('click', onNextTask(task));
            taskBodyElement.appendChild(nextButton);
            taskBodyElement.append(nextButton);

        }
        

        

        return taskElement;
    }
    
    const Table = (table) => {

        const tableElement = document.createElement('div');
        tableElement.className = "list_item card mx-2";

        const tableHeaderElement = document.createElement('div');
        tableHeaderElement.className = 'card-header';
        tableHeaderElement.append(document.createTextNode(table.title));

        const tableBodyElement = document.createElement('div');
        tableBodyElement.className = 'card-body';

        table.tasks.forEach(task => {
            tableBodyElement.append(Task(task));
        })
        
        tableElement.append(tableHeaderElement);
        tableElement.append(tableBodyElement);
        
        return tableElement;

    }

    const render = () => {
        setStorageData();
        Form();
        Tables(tables);
        
        return true;
    }

    const init = () => {
        getStorageData();
        render();

        return true;
    }

    const getStorageData = () => tables = JSON.parse(localStorage.getItem('tables')) ?? initialData;

    const setStorageData = () => localStorage.setItem('tables', JSON.stringify(tables))

    // Получаем Задание по Id
    const getTaskById = (id) => tables.reduce((acc, table) => {
        const task = table.tasks.find(task => task.id === id);
        if(task) {
            acc = task;
        }
        return acc;
    }, null);

    init();
})
