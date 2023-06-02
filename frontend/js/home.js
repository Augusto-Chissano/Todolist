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

    if (user.profile === 'Pai') {
       // const userTasks = tasks.filter(task =>(task.deleted === false))
        tasks.forEach(task => {
            const row = document.createElement('tr')
            const date = task.dueDate.slice(0, 10)
            row.innerHTML = `
        <td class="task-name">${task.name}</td>
        <td class="task-description">${task.description}</td>
        <td class="task-category">${task.category}</td>
        <td class="task-due-date">${date}</td>
        <td class="task-status">
        ${task.completed ? 'Concluída' : 'Pendente'}
      </td>
        <td class="task-status">
        ${task.deleted ?'Eliminada' :`<button class="excluir-btn" data-task-id="${task._id}">Excluir</button>`}
      </td>

        <td class="task-status">
        ${`<button class="editar-btn" data-task-id="${task._id}">Editar</button>`}
      </td>
      `
            tableBody.appendChild(row)
        })
    } else {
        const userTasks = tasks.filter(task => (task.author === user._id) && (task.deleted === false))

        userTasks.forEach(task => {
            console.log(task.deleted)
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
        <td class="task-status">
        ${`<button class="excluir-btn" data-task-id="${task._id}">Excluir</button>`}
      </td>
        <td class="task-status">
        ${`<button class="editar-btn" data-task-id="${task._id}">Editar</button>`}
      </td>
      `
            tableBody.appendChild(row)
        })
    }

    // Adicionar um evento de clique para os botões "Concluir"
    const concluirBtns = document.querySelectorAll('.concluir-btn')
    concluirBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const taskId = btn.getAttribute('data-task-id')
            console.log(taskId)
            concluirTarefa(taskId)
        })
    })

    const excluirBtns = document.querySelectorAll('.excluir-btn')
    excluirBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const taskId = btn.getAttribute('data-task-id')
            console.log(1234)
            excluirTarefa(taskId)
        })
    })

    const editarBtns = document.querySelectorAll('.editar-btn')
    editarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const taskId = btn.getAttribute('data-task-id')
            localStorage.setItem('taskid', JSON.stringify(taskId))
            return window.location.href = 'editTask.html'
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
function excluirTarefa(taskId) {
    fetch(`${baseURL}/tasks/${taskId}/delete`,
        {
            method: 'PUT'
        })
        .then(response => response.json())
        .then(updatedTask => {
            // Atualizar a tabela com a tarefa concluída
            fetchTasks()
        })
        .catch(error => {
            console.error('Erro ao excluir a tarefa:', error)
        })
}

fetchTasks()









// Função para realizar a pesquisa
function searchTasks() {
    var searchTerm = document.querySelector("#searchInput").value

    fetch(`${baseURL}/tasks`, {
        headers: {
            'authorization': token
        }
    }).then(response => response.json())
        .then(function (data) {
            var filteredTasks = data.filter(function (task) {
                return task.name.toLowerCase().includes(searchTerm.toLowerCase())
            })
            renderTasks(filteredTasks)
        })
        .catch(function (error) {
            console.error("Ocorreu um erro ao buscar as tarefas:", error)
        })
}

document.querySelector("#searchInput").addEventListener("input", searchTasks)

