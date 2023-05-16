
var hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function () {
    document.querySelector("body").classList.toggle("active");
})

const nome = document.getElementById('nome')

const storedData = localStorage.getItem('user')
const user = JSON.parse(storedData)

nome.innerText = user.name
