document.addEventListener('DOMContentLoaded', () => {
    let tables = [
        {
            title: "Начало",
            tasks: [
                {
                    id: 1,
                    text: "Первая задача"
                }
            ]
        },
        {
            title: "В прогрессе",
            tasks: [
                {
                    id: 2,
                    text: "Первая задача"
                }
            ]
        },
        {
            title: "Готово",
            tasks: [
                {
                    id: 3,
                    text: "Первая задача"
                }
            ]
        }
    ]

    let updatedId;


    const onCreateTask = (form) => (ev) => {
        ev.preventDefault();

        const title = new FormData(form).get('title');
        if(!title) return; 

        if(updatedId) {
            tables = tables.map((table) => {
                table.tasks = table.tasks.map((task) => {
                    if(updatedId == task.id) {
                        task.text = title;
                    } 
                    return task;
                })
                return table;
            })
        } else {
            // if(title.length <= 0) return;

            tables[0].tasks.push({
                id: Date.now(),
                text: title,
            });
        }

        updatedId = null;
        render();

        
    }


    const onUpdateTask = (task) => (ev) => {
        updatedId = task.id;
        render();
    }  

    const onDeleteTask = () => {

    }

    const onNextTask = () => {

    }

    const Form = () => {
        const formInput = document.querySelector('#form-input');
        formInput.innerHTML = '';
        formInput.addEventListener('submit', onCreateTask(formInput))



        const task = tables.reduce((prevValue, value) => {
            if(prevValue) return prevValue;
            const task = value.tasks.find((element, index, arrays) => {
                console.log(element.id, updatedId);
                return element.id == updatedId;
            });
            return task;
        }, null);

        
        

        const inputElement = document.createElement('input');
        inputElement.setAttribute('name', 'title');
        inputElement.setAttribute('type', 'text');
        inputElement.className = 'form-control col';
        inputElement.setAttribute('placeholder', "Название задачи");
        if(task) {
            inputElement.setAttribute('value', task.text);
        }

        const buttonElement = document.createElement('input');
        buttonElement.setAttribute('type', 'submit');
        buttonElement.className = 'btn btn-primary  col mt-2';
        buttonElement.append(document.createTextNode('Добавить'))

        formInput.append(inputElement);
        formInput.append(buttonElement);
    }

    const Tables = (tables) => {
        const tablesElement = document.querySelector('#tables');
        tablesElement.innerHTML = '';

        tables.forEach(table => {
            tablesElement.append(Table(table));
        });
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
        deleteButton.append(document.createTextNode('Удалить'));

        const nextButton = document.createElement('button');
        nextButton.className = 'btn btn-primary';
        nextButton.append(document.createTextNode('Дальше'));

        taskBodyElement.append(headerElement);
        taskBodyElement.append(nextButton);
        taskBodyElement.append(deleteButton);
        taskBodyElement.append(updateButton);


        taskElement.append(taskBodyElement);

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
        console.log('render');
        Form();
        Tables(tables);



    }

    const init = () => {
        render();
    }

    init();
})
