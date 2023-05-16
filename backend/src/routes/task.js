const Task = require('../models/Task')
const withAuth = require('../middlewares/auth')
const router = require('express').Router()


router.post('/tasks', withAuth, async (req, res) => {

    const { name, description, category, dueDate } = req.body

    try {

        if (!name || !description || !category) {
            return res.status(400).json({ error: 'Preencha todos os campos' })
        }

        const existingTask = await Task.findOne({ name: name })
        if (existingTask) {
            return res.status(400).json({ error: 'Escolha um nome diferente para a tarefa' })
        }

        const author = req.user._id
        const task = new Task({ name, description, category, dueDate, author })
        await task.save()

        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ error: `Ocorreu um erro interno, por favor tente novamente ${error}` })
    }
})

router.get('/tasks', withAuth, async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ error: `Ocorreu um erro interno, por favor tente novamente ${error}` })
    }
})

module.exports = router