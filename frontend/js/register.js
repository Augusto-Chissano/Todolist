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
    await handleSignUp()
})


okButton.addEventListener('click', () => {
    return window.location.href = 'index.html'
});

// Mostrar o modal quando necessário

