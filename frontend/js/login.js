const btnLogin = document.querySelector('#login')
const baseURL = 'http://localhost:3000'
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const form = document.querySelector('form')

const login = async (email, password) => {

    try {
        const user = { email, password }
        const response = await fetch(`${baseURL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        if (response.ok) {
            const data = await response.json();
            const { user, token } = data
            return { user, token }
        } else {
            const data = await response.json();
            return alert(data.msg)
            throw new Error('Erro ao fazer login.')
        }
    } catch (error) {
        console.error(`Ocorreu um erro: ${error}`)
        throw error
    }
}

const handleLogin = async () => {
    const email = emailInput.value
    const password = passwordInput.value

    try {
        const { user, token } = await login(email, password)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        //Redirecionamento para a tela principal
        return window.location.href = 'home.html'
        console.log('Login bem-sucedido!')
    } catch (error) {
        console.error('Erro durante o login:', error)
        emailInput.style.borderColor = 'red'
        passwordInput.style.borderColor = 'red'
    }
}

btnLogin.addEventListener('click', async (event) => {
    event.preventDefault()
    await handleLogin()
})

emailInput.addEventListener('click', () => {
    emailInput.style.borderColor = '#007bff'
})

passwordInput.addEventListener('click', () => {
    passwordInput.style.borderColor = '#007bff'
})

emailInput.addEventListener('blur', () => {
    if (!isEmail(emailInput.value)) {
        emailInput.style.borderColor = 'tomato'
    }      
})

function isEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}
