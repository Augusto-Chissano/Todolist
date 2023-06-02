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
        const author = req.user._id
        const tasks = await Task.find()

        res.status(200).json(tasks)

    } catch (error) {
        res.status(500).json({ error: `Ocorreu um erro interno, por favor tente novamente ${error}` })
    }
})


// Rota para concluir uma tarefa
router.put('/tasks/:taskId/complete', async (req, res) => {
    const taskId = req.params.taskId;
    
    try {
        const task = await Task.findOne({ _id: taskId })

        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        
        task.completed = true;

        await task.save();

        res.json({ message: 'Tarefa concluída com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Ocorreu um erro ao concluir a tarefa' });
    }
})

router.put('/tasks/:taskId/delete', async (req, res) => {
    const taskId = req.params.taskId
    
    try {
        const task = await Task.findOne({ _id: taskId })

        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' })
        }

        task.deleted = true

        await task.save()

        res.json({ message: 'Tarefa eliminada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Ocorreu um erro ao eliminar a tarefa' })
    }
})

router.post('/validate-task-name', (req, res) => {
    const { taskName } = req.body;

    // Verifica se já existe uma tarefa com o mesmo nome
    const existingTask = Task.find({ name: taskName });

    if (existingTask) {
        res.json({ valid: false });
    } else {
        res.json({ valid: true });
    }
});

module.exports = router