const baseURL = 'http://localhost:3000'
const createBtn = document.querySelector('#create-btn')
const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const profileInput = document.querySelector('#profile-type')
const confirmPasswordInput = document.querySelector('#confirm-password')
const form = document.querySelector('form')
const modalContent = document.getElementById('modalContent')
const okButton = document.getElementById('okButton')


const signUp = async (name, email, password, profile) => {

    try {
        const user = { name, email, password, profile }
        console.log(user)
        const response = await fetch(`${baseURL}/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            const data = await response.json()
            alert(data.error)
            throw new Error('Erro ao cadastrar')
        }

    } catch (error) {
        throw error
    }
}

const handleSignUp = async () => {
    const name = nameInput.value
    const email = emailInput.value
    const password = passwordInput.value
    const profile = profileInput.value

    try {
        const data = await signUp(name, email, password, profile)
        //Redirecionamento para a tela de login
        form.reset()
        modalContent.classList.toggle('hide')
    } catch (error) {
        console.error('Erro durante o cadastro:', error)
    }
}


createBtn.addEventListener('click', async (event) => {
    event.preventDefault()
    if (passwordInput.value !== confirmPasswordInput.value) {
        //alert('Por favor confirme a sua senha!')
        passwordInput.style.borderColor = 'tomato'
        confirmPasswordInput.style.borderColor = 'tomato'
    } else {
        event.preventDefault()
        await handleSignUp()
    }
})


okButton.addEventListener('click', () => {
    return window.location.href = 'index.html'
})



emailInput.addEventListener('blur', () => {
    if (!isEmail(emailInput.value)) {
        emailInput.style.borderColor = 'tomato'
    }
})

emailInput.addEventListener('click', () => {
   
    emailInput.style.borderColor = '#007bff'
})
confirmPasswordInput.addEventListener('click', () => {
    confirmPasswordInput.style.borderColor = '#007bff'
})

passwordInput.addEventListener('click', () => {
    passwordInput.style.borderColor = '#007bff'
})


function isEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}