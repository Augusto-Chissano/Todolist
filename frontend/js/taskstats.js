const baseURL = 'http://localhost:3000'

const newTaskBtn = document.querySelector('#new-task')
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'))
document.querySelector('#author').innerHTML = user.name

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
            fillTaskNumbers(tasks)
        })
        .catch(error => {
            console.error('Erro ao buscar as tarefas:', error)
        })
}

function fillTaskNumbers(tasks) {
    const totalTask = document.querySelector('#total-task')
    const completedTask = document.querySelector('#completed-task')
    const pendentTask = document.querySelector('#pendent-task')
    const deletedTask = document.querySelector('#deleted-task')

    if (user.profile === 'Pai') {
        deletedTasks = tasks.filter((task) => task.deleted)
        const completedTasks = tasks.filter(task => (task.completed === true))

        totalTask.innerHTML = tasks.length
        completedTask.innerHTML = completedTasks.length
        pendentTask.innerHTML = totalTasks.length - completedTasks.length
        deletedTask.innerHTML = deletedTasks.length
        
    } else {

        deletedTasks = tasks.filter((task) => task.deleted)
        const completedTasks = tasks.filter(task => (task.author === user._id) && (task.completed === true))
        const totalTasks = tasks.filter(task => (task.author === user._id))

        totalTask.innerHTML = totalTasks.length
        completedTask.innerHTML = completedTasks.length
        pendentTask.innerHTML = totalTasks.length - completedTasks.length
        deletedTask.innerHTML = deletedTasks.length
    }
}

fetchTasks()

// Graficos
var createdData = {
    labels: ['2023-05-01', '2023-05-02', '2023-05-03', '2023-05-04', '2023-05-05'],
    series: [
        {
            name: 'Tarefas Criadas',
            data: [15, 12, 8, 10, 14]
        }
    ]
};

var completedData = {
    labels: ['2023-05-01', '2023-05-02', '2023-05-03', '2023-05-04', '2023-05-05'],
    series: [
        {
            name: 'Tarefas Concluídas',
            data: [10, 8, 5, 6, 9]
        }
    ]
};

// Configuração dos gráficos
var createdOptions = {
    chart: {
        type: 'bar',
        height: '200px'
    },
    series: createdData.series,
    xaxis: {
        categories: createdData.labels
    }
};

var completedOptions = {
    chart: {
        type: 'bar',
        height: '200px'
    },
    series: completedData.series,
    xaxis: {
        categories: completedData.labels
    }
};

// Renderização dos gráficos
var createdChart = new ApexCharts(document.querySelector('#created-chart'), createdOptions);
createdChart.render();

var completedChart = new ApexCharts(document.querySelector('#completed-chart'), completedOptions);
completedChart.render();
