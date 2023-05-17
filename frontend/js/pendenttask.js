const nome = document.getElementById('nome')
const storedData = localStorage.getItem('user')
const token = localStorage.getItem('token')
var user = JSON.parse(storedData)
nome.innerText = user.name


const newTaskBtn = document.querySelector('#new-task')
newTaskBtn.addEventListener('click', () => {
    window.location.href = 'createtask.html'
})