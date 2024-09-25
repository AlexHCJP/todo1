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
                    id: 1,
                    text: "Первая задача"
                }
            ]
        },
        {
            title: "Готово",
            tasks: [
                {
                    id: 1,
                    text: "Первая задача"
                }
            ]
        }
    ]

    const Form = () => {
        const formInput = document.querySelector('#form-input');

        const inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'text');
        inputElement.className = 'form-control col';
        inputElement.setAttribute('placeholder', "Название задачи");

        const buttonElement = document.createElement('button');
        buttonElement.className = 'btn btn-primary  col mt-2';
        buttonElement.append(document.createTextNode('Добавить'))

        formInput.append(inputElement);
        formInput.append(buttonElement);
    }

    const Tables = (tables) => {
        const tablesElement = document.querySelector('#tables');

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
        Form();
        Tables(tables);

    }

    const init = () => {
        render();
    }

    init();
})
