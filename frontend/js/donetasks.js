const baseURL = 'http://localhost:3000'

const nome = document.getElementById('nome')
const author = document.getElementById('author')
const storedData = localStorage.getItem('user')
const token = localStorage.getItem('token')
var user = JSON.parse(storedData)
author.innerText = user.name

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

function renderTasks(tasks) {
    const tableBody = document.querySelector('#task-table tbody')
    tableBody.innerHTML = ''

    const userTasks = tasks.filter(task => (task.author === user._id) && (task.completed === true))

    userTasks.forEach(task => {
        const row = document.createElement('tr')
        const date = task.createdAt.slice(0, 10)
        row.innerHTML = `
        <td class="task-name">${task.name}</td>
        <td class="task-description">${task.description}</td>
        <td class="task-category">${task.category}</td>
        <td class="task-due-date">${date}</td>
      `

        tableBody.appendChild(row)
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
    }).then(response =>  response.json())
        .then(function (data) {
            var filteredTasks = data.filter( function (task)  {
                return task.name.toLowerCase().includes(searchTerm.toLowerCase())
            })
            renderTasks(filteredTasks)
        })
        .catch(function (error) {
            console.error("Ocorreu um erro ao buscar as tarefas:", error)
        })
}

document.querySelector("#searchInput").addEventListener("input", searchTasks)