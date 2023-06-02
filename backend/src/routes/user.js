require('dotenv').config()
const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const secret = process.env.SECRET_KEY

router.post('/users/login', async (req, res) => {

    const { email, password } = req.body

    try {

        if (!email || !password) {
            return res.status(400).json({ msg: 'Por favor, preencha todos os campos.' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ msg: 'Email ou senha inválidos' })
        } else {
            const isCorrectPassword = await user.isCorrectPassword(password)
            if (!isCorrectPassword) {
                res.status(400).json({ msg: 'Email ou senha inválidos' })
            } else {
                const token = jwt.sign({ email }, secret, { expiresIn: '10d' })
                res.status(200).json({ token, user })
            }
        }
    } catch (error) {
        res.status(500).json({ msg: `Erro interno, por favor tente novamente. ${error}` })
    }
})

router.post('/users/signup', async (req, res) => {

    const { name, email, password, profile } = req.body

    try {

        if (!name || !email || !password || !profile) {
            return res.status(400).json({ error: 'Por favor, preencha todos os campos.' })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'Email já em uso' })
        }

        let user = new User({ name, email, password, profile })
        await user.save()

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: `Erro interno, por favor tente novamente. ${error}` })
    }
})

router.get('/users', async (req, res) => {

    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: `Erro interno, por favor tente novamente. ${error}` })
    }
})


module.exports = router