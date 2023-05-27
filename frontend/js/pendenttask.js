const baseURL = 'http://localhost:3000'
const nome = document.getElementById('nome')
const storedData = localStorage.getItem('user')
const token = localStorage.getItem('token')
var user = JSON.parse(storedData)
nome.innerText = user.name


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

    const userTasks = tasks.filter(task => (task.author === user._id) && (task.completed === false))

    userTasks.forEach(task => {
        const date = task.dueDate.slice(0, 10)
        const row = document.createElement('tr')
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
            fetchTasks()
        })
    })
}

function concluirTarefa(taskId) {
    fetch(`${baseURL}/tasks/${taskId}/complete`,
        {
            method: 'PUT'
        })
        .then(response => response.json())
        .then(updatedTask => {
            // Atualizar a tabela com a tarefa concluída
            fetchTasks();
        })
        .catch(error => {
            console.error('Erro ao concluir a tarefa:', error)
        });
}

fetchTasks()



