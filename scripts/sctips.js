document.addEventListener('DOMContentLoaded', () => {
    console.log('data');
    const Form = () => {
        const formInput = document.querySelector('#form-input');
        console.log(formInput);

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
    

    const render = () => {
        Form();
    }

    const init = () => {
        render();
    }

    init();
})