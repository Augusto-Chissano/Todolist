const nome = document.getElementById('nome')
const storedData = localStorage.getItem('user')
const token = localStorage.getItem('token')
var user = JSON.parse(storedData)
nome.innerText = user.name

const baseURL = 'http://localhost:3000'
const requestURL = 'http://localhost:3000/tasks'
const taskForm = document.querySelector('.task-form')
const taskName = document.querySelector('#task-name')
const taskDescription = document.querySelector('#task-description')
const taskCategory = document.querySelector('#task-category')
const taskDueDate = document.querySelector('#task-due-date')
const btnAddTask = document.querySelector('.form-button')
const modalContent = document.getElementById('modalContent')
const okButton = document.getElementById('okButton')


const addTask = async (name, description, category, dueDate, author) => {

    try {
        const task = { name, description, category, dueDate, author }
        const response = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`
            },
            body: JSON.stringify(task)
        })

        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            throw new Error('Erro ao cadastrar')
        }

    } catch (error) {
        throw error
    }
}

const handleAddTask = async () => {
    const name = taskName.value
    const description = taskDescription.value
    const category = taskCategory.value
    const dueDate = taskDueDate.value
    const author = user._id

    try {
        const data = await addTask(name, description, category, dueDate, author)
        //Redirecionamento para a tela principal
        taskForm.reset()
        modalContent.classList.toggle('hide')

    } catch (error) {
        console.error('Erro durante o cadastro:', error)
    }
}

btnAddTask.addEventListener('click', async (event) => {
    event.preventDefault()
    await handleAddTask()
})

okButton.addEventListener('click', () => {
    return window.location.href = 'home.html'
});





//Validations
function validateTaskName() {
    const taskNameInput = document.getElementById('task-name');
    const taskNameError = document.getElementById('task-name-error');

    const taskName = taskNameInput.value

    fetch(`${baseURL}/validate-task-name`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ taskName })
    })
        .then(response => response.json())
        .then(data => {
            if (data.valid) {
                taskNameInput.classList.remove('input-error');
                taskNameError.textContent = '';
            } else {
                taskNameInput.classList.add('input-error');
                taskNameError.textContent = 'Nome de tarefa já existe'
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error)
        })
}

//const taskNameInput = document.getElementById('task-name')
//const taskNameError = document.getElementById('task-name-error')

//taskNameInput.addEventListener('blur', validateTaskName);
