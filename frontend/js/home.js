const nome = document.getElementById('nome')
const author = document.getElementById('author')
const storedData = localStorage.getItem('user')
const user = JSON.parse(storedData)
const token = localStorage.getItem('token')
author.innerText = user.name

const baseURL = 'http://localhost:3000'

const newTaskBtn = document.querySelector('#new-task')
newTaskBtn.addEventListener('click', () => {
    window.location.href = 'createtask.html'
})

function fetchTasks() {
    fetch(`${baseURL}/tasks`, {
        headers: {
            'authorization': token
        }
    })
        .then(response => response.json())
        .then(tasks => {
            renderTasks(tasks)
        })
        .catch(error => {
            console.error('Erro ao buscar as tarefas:', error)
        })
}

// Função para renderizar a tabela de tarefas
function renderTasks(tasks) {
    const tableBody = document.querySelector('#task-table tbody')
    tableBody.innerHTML = ''

    const userTasks = tasks.filter(task => task.author === user._id)

    userTasks.forEach(task => {
        const row = document.createElement('tr')
        const date = task.dueDate.slice(0, 10)
        row.innerHTML = `
        <td class="task-name">${task.name}</td>
        <td class="task-description">${task.description}</td>
        <td class="task-category">${task.category}</td>
        <td class="task-due-date">${date}</td>
        <td class="task-status">
        ${task.completed ? 'Concluída' : `<button class="concluir-btn" data-task-id="${task._id}">Concluir</button>`}
      </td>
      `

        tableBody.appendChild(row)
    })

    // Adicionar um evento de clique para os botões "Concluir"
    const concluirBtns = document.querySelectorAll('.concluir-btn')
    concluirBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const taskId = btn.getAttribute('data-task-id')
            console.log(taskId)
            concluirTarefa(taskId)
        })
    })
}

// Função para marcar uma tarefa como concluída
function concluirTarefa(taskId) {
    fetch(`${baseURL}/tasks/${taskId}/complete`,
        {
            method: 'PUT'
        })
        .then(response => response.json())
        .then(updatedTask => {
            // Atualizar a tabela com a tarefa concluída
            fetchTasks()
        })
        .catch(error => {
            console.error('Erro ao concluir a tarefa:', error)
        })
}

fetchTasks()





































//Fill table

/*
function fillTaskTable() {
    const taskTable = document.getElementById('task-table');

    fetch(`${requestURL}`, {
        headers: {
            'authorization': token
        }
    })
        .then(response => response.json())
        .then(tasks => {
            const tbody = taskTable.querySelector('tbody');
            tbody.innerHTML = '';

            const userTasks = tasks.filter(task => task.author === user._id)

            userTasks.forEach(task => {
                const row = document.createElement('tr')
                const nameCell = document.createElement('td')
                nameCell.classList = "task-name"
                const descriptionCell = document.createElement('td')
                descriptionCell.classList = "task-description"
                const categoryCell = document.createElement('td')
                categoryCell.classList = "task-category"
                const dueDateCell = document.createElement('td')
                dueDateCell.classList = "task-due-date"

                nameCell.textContent = task.name
                descriptionCell.textContent = task.description
                categoryCell.textContent = task.category
                dueDateCell.textContent = task.dueDate

                row.appendChild(nameCell)
                row.appendChild(descriptionCell)
                row.appendChild(categoryCell)
                row.appendChild(dueDateCell)

                tbody.appendChild(row)
            })
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error)
        })
}
*/
//fillTaskTable()